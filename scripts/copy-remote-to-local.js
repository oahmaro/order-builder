// Script to copy data from Digital Ocean to local database and sync images
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
} = require('@aws-sdk/client-s3');

// Create Prisma clients for remote and local databases
const remotePrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.REMOTE_DATABASE_URL,
    },
  },
});

const localPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.LOCAL_DATABASE_URL,
    },
  },
});

// Configure S3 clients for DO Spaces
const s3Config = {
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: 'fra1', // Assuming the bucket is in Frankfurt based on endpoint
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
};

const s3Client = new S3Client(s3Config);

// Source and destination bucket names
const PROD_BUCKET = 'omanut-production';
const DEV_BUCKET = process.env.DO_SPACES_BUCKET; // 'omanut-dev' based on .env

// Function to test remote database connection
async function testRemoteConnection() {
  console.log('Testing connection to remote database...');
  try {
    // Try a simple database query that won't take long
    await remotePrisma.$queryRaw`SELECT 1`;
    console.log('✅ Remote database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Remote database connection failed');

    // Check if error message contains information about trusted sources
    const errorMessage = error.message || '';
    if (
      errorMessage.includes("Can't reach database server") ||
      errorMessage.includes('connection') ||
      errorMessage.includes('permission denied')
    ) {
      console.error('\n===============================================');
      console.error('TRUSTED SOURCES RESTRICTION LIKELY ENABLED');
      console.error('===============================================');
      console.error('Your Digital Ocean database has trusted sources protection enabled.');
      console.error('To fix this, you need to either:');
      console.error(
        '1. Add your current IP address to the trusted sources in your Digital Ocean database settings'
      );
      console.error('   - Go to Digital Ocean dashboard');
      console.error('   - Select your database cluster');
      console.error('   - Go to "Settings" > "Trusted Sources"');
      console.error('   - Add your IP address to the list');
      console.error('');
      console.error('2. Or temporarily disable trusted sources (less secure)');
      console.error('   - Go to Digital Ocean dashboard');
      console.error('   - Select your database cluster');
      console.error('   - Go to "Settings" > "Trusted Sources"');
      console.error('   - Toggle off "Enable Trusted Sources"');
      console.error('   - Remember to enable it again after you finish');
      console.error('===============================================');
    }
    return false;
  }
}

// Function to test local database connection
async function testLocalConnection() {
  console.log('Testing connection to local database...');
  try {
    await localPrisma.$queryRaw`SELECT 1`;
    console.log('✅ Local database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Local database connection failed');
    console.error(error.message);

    // Check if Docker might not be running
    if (
      error.message.includes("Can't reach database server") &&
      process.env.LOCAL_DATABASE_URL.includes('localhost')
    ) {
      console.error('\nIs your local Docker container running? Try:');
      console.error('yarn docker:up');
    }
    return false;
  }
}

// Function to test S3 bucket access
async function testS3Access() {
  console.log('Testing S3/Spaces access...');
  try {
    // Try to list objects in the dev bucket (just one to check credentials)
    const listParams = {
      Bucket: DEV_BUCKET,
      MaxKeys: 1,
    };
    await s3Client.send(new ListObjectsV2Command(listParams));
    console.log('✅ S3/Spaces access successful');
    return true;
  } catch (error) {
    console.error('❌ S3/Spaces access failed');
    console.error(error.message);

    if (error.name === 'AccessDenied' || error.name === 'NoSuchBucket') {
      console.error('\nCheck your Digital Ocean Spaces credentials and bucket name in .env file');
    }
    return false;
  }
}

// Function to clear all data from local database
async function clearLocalDatabase() {
  console.log('Clearing local database...');
  try {
    // Delete in reverse order of dependencies
    await localPrisma.orderItem.deleteMany({});
    console.log('✓ Cleared order items');

    await localPrisma.order.deleteMany({});
    console.log('✓ Cleared orders');

    await localPrisma.phone.deleteMany({});
    console.log('✓ Cleared phones');

    await localPrisma.customer.deleteMany({});
    console.log('✓ Cleared customers');

    await localPrisma.address.deleteMany({});
    console.log('✓ Cleared addresses');

    // Add any other models that need to be cleared

    console.log('Local database cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing local database:', error);
    return false;
  }
}

// Function to clear all objects from dev bucket
async function clearDevBucket() {
  console.log(`Clearing objects from ${DEV_BUCKET} bucket...`);

  try {
    // List all objects in the bucket
    const listParams = {
      Bucket: DEV_BUCKET,
    };

    let isTruncated = true;
    let continuationToken = undefined;
    let totalDeleted = 0;

    while (isTruncated) {
      if (continuationToken) {
        listParams.ContinuationToken = continuationToken;
      }

      const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));

      if (listedObjects.Contents && listedObjects.Contents.length > 0) {
        console.log(`Found ${listedObjects.Contents.length} objects to delete...`);

        // Delete objects one by one using DeleteObject (not DeleteObjects)
        for (const { Key } of listedObjects.Contents) {
          try {
            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: DEV_BUCKET,
                Key,
              })
            );

            totalDeleted++;

            if (totalDeleted % 50 === 0) {
              console.log(`Deleted ${totalDeleted} objects so far...`);
            }
          } catch (deleteError) {
            console.warn(`Warning: Failed to delete object ${Key}: ${deleteError.message}`);
          }
        }
      } else {
        console.log('No objects found to delete');
      }

      isTruncated = listedObjects.IsTruncated;
      continuationToken = listedObjects.NextContinuationToken;
    }

    console.log(`${DEV_BUCKET} bucket cleared successfully (deleted ${totalDeleted} objects)`);
    return true;
  } catch (error) {
    console.error('Error clearing dev bucket:', error);
    return false;
  }
}

// Function to copy images from prod to dev bucket
async function copyProductionImagesToDev() {
  console.log(`Copying images from ${PROD_BUCKET} to ${DEV_BUCKET}...`);

  try {
    // First, get all order items with images to make sure we know what paths to look for
    const orderItemsWithImages = await remotePrisma.orderItem.findMany({
      where: {
        image: {
          not: null,
        },
      },
      select: {
        id: true,
        image: true,
      },
    });

    console.log(`Found ${orderItemsWithImages.length} order items with images in the database`);

    // Extract image paths to ensure they're copied
    const orderItemImagePaths = new Set();
    orderItemsWithImages.forEach((item) => {
      if (item.image) {
        // Get the path part from the URL if it's a full URL
        let imagePath = item.image;
        try {
          // If it's a URL, extract the path
          if (item.image.startsWith('http')) {
            const url = new URL(item.image);
            imagePath = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
          }
          // If it still has a leading slash, remove it
          if (imagePath.startsWith('/')) {
            imagePath = imagePath.substring(1);
          }
          orderItemImagePaths.add(imagePath);
        } catch (e) {
          console.log(`Could not parse image path for item #${item.id}: ${item.image}`);
        }
      }
    });

    console.log(`Extracted ${orderItemImagePaths.size} unique image paths from order items`);

    // List all objects in the production bucket
    const listParams = {
      Bucket: PROD_BUCKET,
    };

    let isTruncated = true;
    let continuationToken = undefined;
    let copiedCount = 0;
    let orderItemImagesCopied = 0;

    while (isTruncated) {
      if (continuationToken) {
        listParams.ContinuationToken = continuationToken;
      }

      const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));

      if (listedObjects.Contents && listedObjects.Contents.length > 0) {
        console.log(`Found ${listedObjects.Contents.length} objects to copy...`);

        // Copy each object from prod to dev
        for (const { Key } of listedObjects.Contents) {
          const copyParams = {
            Bucket: DEV_BUCKET,
            CopySource: `${PROD_BUCKET}/${Key}`,
            Key: Key,
            // Set ACL to public-read to ensure objects are publicly accessible
            ACL: 'public-read',
            // Preserve the metadata from the source object
            MetadataDirective: 'COPY',
          };

          await s3Client.send(new CopyObjectCommand(copyParams));
          copiedCount++;

          // Check if this was an order item image
          if (orderItemImagePaths.has(Key)) {
            orderItemImagesCopied++;
          }

          if (copiedCount % 100 === 0) {
            console.log(
              `Progress: Copied ${copiedCount} files so far (${orderItemImagesCopied} order item images)`
            );
          }
        }
      }

      isTruncated = listedObjects.IsTruncated;
      continuationToken = listedObjects.NextContinuationToken;
    }

    console.log(
      `Successfully copied ${copiedCount} images from production to dev bucket with public-read access`
    );
    console.log(`Of these, ${orderItemImagesCopied} were identified as order item images`);

    // Check if we missed any order item images
    if (orderItemImagesCopied < orderItemImagePaths.size) {
      console.warn(
        `⚠️ Warning: Only copied ${orderItemImagesCopied} order item images out of ${orderItemImagePaths.size} referenced in the database`
      );
      console.log(
        'This may be because some images use different naming conventions or are stored outside the bucket'
      );
    }
    return true;
  } catch (error) {
    console.error('Error copying production images to dev:', error);
    return false;
  }
}

// Function to update image URLs in order items to point to the dev CDN
async function updateOrderItemImageUrls() {
  console.log('\nUpdating order item image URLs to point to dev environment...');

  try {
    const orderItemsWithImages = await localPrisma.orderItem.findMany({
      where: {
        image: {
          not: null,
        },
      },
      select: {
        id: true,
        image: true,
      },
    });

    console.log(`Found ${orderItemsWithImages.length} order items with images to update`);

    const prodCdnUrl = 'https://omanut-production.fra1.cdn.digitaloceanspaces.com';
    const devCdnUrl = process.env.DO_SPACES_CDN_ENDPOINT;

    let updatedCount = 0;

    for (const item of orderItemsWithImages) {
      if (item.image && item.image.includes(prodCdnUrl)) {
        const newImageUrl = item.image.replace(prodCdnUrl, devCdnUrl);

        await localPrisma.orderItem.update({
          where: { id: item.id },
          data: { image: newImageUrl },
        });

        updatedCount++;
      }
    }

    console.log(`Updated image URLs for ${updatedCount} order items`);
    return true;
  } catch (error) {
    console.error('Error updating image URLs:', error);
    return false;
  }
}

async function copyDataFromRemoteToLocal() {
  try {
    console.log('=== ORDER BUILDER: PRODUCTION TO LOCAL MIGRATION TOOL ===\n');
    console.log('Starting migration process...\n');

    // First test all connections before doing anything
    const remoteDbOk = await testRemoteConnection();
    if (!remoteDbOk) {
      console.error('\n❌ Cannot proceed: Remote database connection failed');
      return;
    }

    const localDbOk = await testLocalConnection();
    if (!localDbOk) {
      console.error('\n❌ Cannot proceed: Local database connection failed');
      return;
    }

    const s3Ok = await testS3Access();
    if (!s3Ok) {
      console.error('\n⚠️ Warning: S3/Spaces access failed - will skip image operations');
    }

    console.log('\n=== All connection tests passed. Starting migration... ===\n');

    // Now that we know connections work, start the process
    console.log('Starting full data migration from production to local environment...');

    // Step 1: Clear local database
    const localDbCleared = await clearLocalDatabase();
    if (!localDbCleared) {
      console.error('\n❌ Failed to clear local database');
      return;
    }

    // Step 2 & 3: Handle bucket operations with separate error handling
    if (s3Ok) {
      // Step 2: Clear dev bucket
      const bucketCleared = await clearDevBucket();
      if (!bucketCleared) {
        console.warn('\n⚠️ Warning: Failed to clear dev bucket - continuing without images');
      } else {
        // Step 3: Copy production images to dev bucket
        const imagesCopied = await copyProductionImagesToDev();
        if (!imagesCopied) {
          console.warn('\n⚠️ Warning: Failed to copy images - continuing with database only');
        }
      }
    } else {
      console.log('Skipping bucket operations due to connection issues');
    }

    // Step 4: Copy database data
    console.log('\nStarting database data copy from remote to local...');

    // 4.1 Copy customers and their related data
    console.log('Fetching customers from remote database...');
    const customers = await remotePrisma.customer.findMany({
      include: {
        phones: true,
        address: true,
      },
    });
    console.log(`Found ${customers.length} customers to copy`);

    // 4.2 Copy addresses first (needed for customers)
    console.log('Copying addresses...');
    for (const customer of customers) {
      if (customer.address) {
        const addressData = {
          id: customer.address.id,
          streetAddress: customer.address.streetAddress,
          aptSuite: customer.address.aptSuite,
          city: customer.address.city,
          stateProvince: customer.address.stateProvince,
          postalCode: customer.address.postalCode,
          country: customer.address.country,
          latitude: customer.address.latitude,
          longitude: customer.address.longitude,
          createdAt: customer.address.createdAt,
          updatedAt: customer.address.updatedAt,
        };

        // Create address or update if exists
        await localPrisma.address.upsert({
          where: { id: addressData.id },
          update: addressData,
          create: addressData,
        });
      }
    }

    // 4.3 Copy customers
    console.log('Copying customers...');
    for (const customer of customers) {
      const customerData = {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        dateOfBirth: customer.dateOfBirth,
        addressId: customer.addressId,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      };

      // Create customer or update if exists
      await localPrisma.customer.upsert({
        where: { id: customerData.id },
        update: customerData,
        create: customerData,
      });

      // Copy phones for this customer
      if (customer.phones && customer.phones.length > 0) {
        for (const phone of customer.phones) {
          const phoneData = {
            id: phone.id,
            number: phone.number,
            type: phone.type,
            isPrimary: phone.isPrimary,
            customerId: customer.id,
            companyId: phone.companyId,
          };

          await localPrisma.phone.upsert({
            where: { id: phoneData.id },
            update: phoneData,
            create: phoneData,
          });
        }
      }
    }

    // 4.4 Copy orders and order items
    console.log('Fetching orders from remote database...');
    const orders = await remotePrisma.order.findMany({
      include: {
        orderItems: true,
      },
    });
    console.log(`Found ${orders.length} orders to copy`);

    console.log('Copying orders and order items...');
    for (const order of orders) {
      const orderData = {
        id: order.id,
        customerId: order.customerId,
        amountPaid: order.amountPaid,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };

      // Create order or update if exists
      await localPrisma.order.upsert({
        where: { id: orderData.id },
        update: orderData,
        create: orderData,
      });

      // Copy order items for this order
      if (order.orderItems && order.orderItems.length > 0) {
        for (const item of order.orderItems) {
          // Create a copy of the item's data without relations
          const itemData = {
            id: item.id,
            orderId: order.id,
            frameId: item.frameId,
            passepartoutId: item.passepartoutId,
            height: item.height,
            width: item.width,
            passepartoutWidth: item.passepartoutWidth,
            glassTypes: item.glassTypes,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price || item.unitPrice * item.quantity,
            notes: item.notes,
            image: item.image,
            orderIndex: item.orderIndex || 0,
          };

          await localPrisma.orderItem.upsert({
            where: { id: itemData.id },
            update: itemData,
            create: itemData,
          });
        }
      }
    }

    // Check and log image paths for debugging
    console.log('\nChecking order item images...');
    const orderItemsWithImages = await remotePrisma.orderItem.findMany({
      where: {
        image: {
          not: null,
        },
      },
      select: {
        id: true,
        image: true,
      },
    });
    console.log(`Found ${orderItemsWithImages.length} order items with images`);

    if (orderItemsWithImages.length > 0) {
      console.log('Sample image paths:');
      orderItemsWithImages.slice(0, 5).forEach((item) => {
        console.log(`- Order Item #${item.id}: ${item.image}`);
      });
    }

    // Step 5: Update image URLs to point to dev bucket
    if (s3Ok) {
      await updateOrderItemImageUrls();
    }

    console.log('\n✅ Data migration completed successfully! Your local environment now contains:');
    console.log(`- ${customers.length} customers from production`);
    console.log(`- ${orders.length} orders from production`);

    if (s3Ok) {
      console.log('- All production images copied to your dev bucket with public access');
    } else {
      console.log('- Note: Images were not copied due to S3/Spaces connection issues');
    }
  } catch (error) {
    console.error('Error during data migration:', error);
  } finally {
    // Close both database connections
    await remotePrisma.$disconnect();
    await localPrisma.$disconnect();
  }
}

// Execute the copy function
copyDataFromRemoteToLocal();
