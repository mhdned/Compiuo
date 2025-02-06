const { body } = require('express-validator');

const qualityValidationChain = () =>
  body('quality')
    .notEmpty()
    .toInt()
    .isInt({ max: 100, min: 1 })
    .withMessage('The quality value must be an integer and cannot be empty.');

module.exports = { qualityValidationChain };
