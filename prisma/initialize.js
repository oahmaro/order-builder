/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { S3Client, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { adhesions, descriptions, prints, users, company } = require('./data.js');

const prisma = new PrismaClient();

// Configure S3 client for Digital Ocean Spaces
const s3Client = new S3Client({
  region: process.env.DO_SPACES_REGION || 'us-east-1',
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

// Function to delete all objects in a bucket
async function emptyBucket() {
  const bucketName = process.env.DO_SPACES_BUCKET;

  if (!bucketName) {
    console.log('No bucket name provided, skipping bucket cleanup');
    return;
  }

  try {
    console.log(`Emptying bucket: ${bucketName}`);

    // List all objects in the bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const listedObjects = await s3Client.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log('Bucket is already empty');
      return;
    }

    // Prepare objects for deletion
    const objectsToDelete = listedObjects.Contents.map(({ Key }) => ({ Key }));

    // Delete objects
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: { Objects: objectsToDelete },
    });

    await s3Client.send(deleteCommand);
    console.log(`Successfully deleted ${objectsToDelete.length} objects from bucket`);

    // If there are more objects (pagination), recursively delete them
    if (listedObjects.IsTruncated) {
      await emptyBucket();
    }
  } catch (error) {
    console.error('Error emptying bucket:', error);
  }
}

async function load() {
  try {
    // Empty Digital Ocean Spaces bucket
    await emptyBucket();
    console.log('Cleaned up Digital Ocean bucket images');

    // Delete Audit records first
    await prisma.audit.deleteMany();
    console.log('Deleted records in audit table');

    // Then delete User records
    await prisma.user.deleteMany();
    console.log('Deleted records in user table');

    await prisma.print.deleteMany();
    console.log('Deleted records in print table');

    await prisma.description.deleteMany();
    console.log('Deleted records in description table');

    await prisma.adhesion.deleteMany();
    console.log('Deleted records in adhesion table');

    await prisma.company.deleteMany();
    console.log('Deleted records in company table');

    // Reset autoincrement
    await prisma.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
    console.log('reset user auto increment to 1');

    await prisma.$queryRaw`ALTER SEQUENCE "Print_id_seq" RESTART WITH 1`;
    console.log('reset print auto increment to 1');

    await prisma.$queryRaw`ALTER SEQUENCE "Description_id_seq" RESTART WITH 1`;
    console.log('reset description auto increment to 1');

    await prisma.$queryRaw`ALTER SEQUENCE "Adhesion_id_seq" RESTART WITH 1`;
    console.log('reset adhesion auto increment to 1');

    await prisma.$queryRaw`ALTER SEQUENCE "Company_id_seq" RESTART WITH 1`;
    console.log('reset company auto increment to 1');

    // Set Order sequence to start from 11260
    await prisma.$queryRaw`ALTER SEQUENCE "Order_id_seq" RESTART WITH 11260`;
    console.log('set order auto increment to 11260');

    const usersWithHashedPassword = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Create address first for company
    const address = await prisma.address.create({
      data: company.address,
    });

    // Create company with address and phones
    await prisma.company.create({
      data: {
        name: company.name,
        email: company.email,
        address: {
          connect: {
            id: address.id,
          },
        },
        phones: {
          create: company.phones.map((phone) => ({
            number: phone.number,
            type: phone.type,
            isPrimary: phone.isPrimary,
          })),
        },
      },
    });
    console.log('Added company data');

    await prisma.user.createMany({
      data: await usersWithHashedPassword,
    });
    console.log('Added user data');

    await prisma.print.createMany({
      data: prints,
    });
    console.log('Added print data');

    await prisma.description.createMany({
      data: descriptions,
    });
    console.log('Added description data');

    await prisma.adhesion.createMany({
      data: adhesions,
    });
    console.log('Added adhesion data');
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

load();
