const { body } = require("express-validator");

const checkSavingthrowlistInput = [
  body("savingthrow", "name is required").not().isEmpty(),
  body("savingthrow", "name must be between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("details", "details is required").not().isEmpty(),
];

module.exports = { checkSavingthrowlistInput };
