/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { adhesions, descriptions, prints, users, company } = require('./data.js');

const prisma = new PrismaClient();

async function load() {
  try {
    // Delete records
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

    // Create phone record
    const phone = await prisma.phone.create({
      data: company.phone,
    });

    // Create company with address and phone references
    await prisma.company.create({
      data: {
        name: company.name,
        email: company.email,
        addressId: address.id,
        phoneId: phone.id,
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
