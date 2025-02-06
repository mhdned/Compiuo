const path = require('path');
const sharp = require('sharp');

class SharpClass {
  static async compress(file, quality = 50) {
    const orginalImagePath = path.join(process.env.MAIN_PATH, file.destination, file.filename);
    const compressImagePath = path.join(
      process.env.MAIN_PATH,
      file.destination,
      `compress${file.filename}`
    );
    const compressedImage = await sharp(orginalImagePath)
      .jpeg({ quality: quality })
      .toFile(compressImagePath);

    return compressedImage;
  }
}

module.exports = { SharpClass };
