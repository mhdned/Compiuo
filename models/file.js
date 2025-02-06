const path = require('path');
const { PrismaClient } = require('@prisma/client');

// create instance of prisma
const prisma = new PrismaClient();

class FileCRUD {
  static async create(file_data) {
    const createdFile = await prisma.file.create({
      data: {
        name: file_data.filename,
        extension: path.extname(file_data.originalname),
        location: file_data.destination,
      },
    });
    return createdFile;
  }
}

module.exports = { FileCRUD };
