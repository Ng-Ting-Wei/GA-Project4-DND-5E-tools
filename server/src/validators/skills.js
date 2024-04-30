const { body } = require("express-validator");

const checkSkilllistInput = [
  body("skill", "name is required").not().isEmpty(),
  body("skill", "name must be between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("details", "details is required").not().isEmpty(),
];

module.exports = { checkSkilllistInput };
