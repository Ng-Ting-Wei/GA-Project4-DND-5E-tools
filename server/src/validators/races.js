const { body } = require("express-validator");

const checkRacelistInput = [
  body("race", "name is required").not().isEmpty(),
  body("race", "name must be between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
  body("details", "details is required").not().isEmpty(),
];

const checkRaceByName = [
  body("race", "race is required").not().isEmpty(),
  body("race", "race is first letter must be uppercase").not().isLowercase(),
];

module.exports = { checkRacelistInput, checkRaceByName };
