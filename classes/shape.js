const path = require('path');
const sharp = require('sharp');

class SharpClass {
  static async compress(file, quality) {
    quality = Number(quality);

    const orginalImagePath = path.join(process.env.MAIN_PATH, file.destination, file.filename);
    const compressImagePath = path.join(
      process.env.MAIN_PATH,
      file.destination,
      `compress${file.filename}`
    );
    let compressedImage = await sharp(orginalImagePath)
      .jpeg({ quality: quality })
      .toFile(compressImagePath);

    compressedImage.filename = `compress${file.filename}`;
    compressedImage.originalname = `compress${file.filename}`;
    compressedImage.fullpath = compressImagePath;
    compressedImage.destination = compressImagePath
      .replace(`${process.env.MAIN_PATH}`, '')
      .replace(`compress${file.filename}`, '');

    return compressedImage;
  }
}

module.exports = { SharpClass };
