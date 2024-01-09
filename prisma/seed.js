/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const { adhesions, descriptions, prints, users } = require('./data.js');

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

    // Reset autoincrement
    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log('reset user auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Print AUTO_INCREMENT = 1`;
    console.log('reset print auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Description AUTO_INCREMENT = 1`;
    console.log('reset description auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Adhesion AUTO_INCREMENT = 1`;
    console.log('reset adhesion auto increment to 1');

    // Create Records
    await prisma.user.createMany({
      data: users,
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
