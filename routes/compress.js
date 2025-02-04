// require packages, dependencies and libraries
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');

// create instance of prisma client
const prisma = new PrismaClient();

// file filter settings
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/; // regix type
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, JPG, and PNG are allowed!'), false);
  }
};

// configuration storage for upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${uuidv4()}${extname}`;
    cb(null, uniqueSuffix);
  },
});

// configuration multer package
const upload = multer({ storage: storage, fileFilter: fileFilter });

// create instance of Routing class
const router = Router();

// compression route
// image (png) -> compress 50%, static data -> reposne (end process)
router.post('/', upload.single('image'), async (req, res) => {
  // validation file and data
  // upload image
  if (req.file) {
    const newFile = await prisma.file.create({
      data: {
        name: req.file.filename,
        extension: path.extname(req.file.originalname),
        location: req.file.destination,
      },
    });
    const orginalImagePath = path.join(
      process.env.MAIN_PATH,
      req.file.destination,
      req.file.filename
    );
    const compressImagePath = path.join(
      process.env.MAIN_PATH,
      req.file.destination,
      `compress${req.file.filename}`
    );
    const compressedImage = await sharp(orginalImagePath)
      .jpeg({ quality: 50 })
      .toFile(compressImagePath);
    return res.send({
      message: 'File stored and uploaded',
      file_id: newFile.id,
    });
  } else {
    return res.status(400).send('No file uploaded or invalid file type.');
  }
  // store to database file information
  // process to compress image
  // send output to client
});

module.exports = router;
