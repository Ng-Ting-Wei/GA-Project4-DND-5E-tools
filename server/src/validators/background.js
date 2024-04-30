const { body } = require("express-validator");

const checkBackgroundlistInput = [
  body("background", "name is required").not().isEmpty(),
  body("background", "name must be between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("details", "details is required").not().isEmpty(),
];

const checkBackgroundByName = [
  body("background", "background is required").not().isEmpty(),
  body("background", "background is first letter must be uppercase")
    .not()
    .isLowercase(),
];

module.exports = { checkBackgroundlistInput, checkBackgroundByName };
