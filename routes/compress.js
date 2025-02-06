// require packages, dependencies and libraries
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const { FileCRUD } = require('./../models/file');
const { SharpClass } = require('./../classes/shape');
const { qualityValidationChain } = require('./../validations/compress');

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
    const uploadDir = process.env.UPLOAD_PATH || '/app/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${uuidv4()}${extname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = Router();

router.post('/', upload.single('image'), qualityValidationChain(), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(412).send({ errors: result.array() });

  if (req.file) {
    let { quality } = req.body;

    const newFile = await FileCRUD.create(req.file);
    const compressedImage = await SharpClass.compress(req.file, quality);
    const newCompressFile = await FileCRUD.create(compressedImage);

    return res.send({
      message: 'File stored and uploaded',
      file_id: newFile.id,
      compress_file_id: newCompressFile.id,
    });
  } else {
    return res.status(400).send('No file uploaded or invalid file type.');
  }
});

module.exports = router;
