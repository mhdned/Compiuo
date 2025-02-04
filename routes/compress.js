// require packages, dependencies and libraries
const path = require('path');
const multer = require('multer');
const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');

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
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${uuidv4()}.${extname}`;
    cb(null, uniqueSuffix);
  },
});

// configuration multer package
const upload = multer({ storage: storage, fileFilter: fileFilter });

// create instance of Routing class
const router = Router();

// compression route
// image (png) -> compress 50%, static data -> reposne (end process)
router.post('/', upload.single('image'), (req, res) => {
  // validation file and data
  // upload image
  if (req.file) {
    res.send(`File uploaded successfully: ${req.file.filename}`);
  } else {
    res.status(400).send('No file uploaded or invalid file type.');
  }
  // store to database file information
  // process to compress image
  // send output to client
});

module.exports = router;
