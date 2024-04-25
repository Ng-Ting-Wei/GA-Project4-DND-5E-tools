const { body } = require("express-validator");

const checkClasslistInput = [
  body("classlist", "name is required").not().isEmpty(),
  body("classlist", "name must be between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("details", "details is required").not().isEmpty(),
];

const checkGetClassByName = [
  body("classlist", "classlist is required").not().isEmpty(),
];

module.exports = { checkClasslistInput, checkGetClassByName };
