const { body } = require("express-validator");

const checkAddCharacterInput = [
  body("classlist", "name is required").not().isEmpty(),
  body("race", "race is required").not().isEmpty(),
  body("race", "race is must be character").isString(),
  body("class", "class is required").not().isEmpty(),
  body("class", "class is must be character").isString(),
  body("level", "level must be a number").isInt(),
  body("background", "background is required").not().isEmpty(),
  body("background", "background is must be character").isString(),
  body("savingthrows", "savingthrows is required").not().isEmpty(),
  body("savingthrows", "savingthrows is must be character").isString(),
  body("skill", "skill is required").not().isEmpty(),
  body("skill", "skill is must be character").isString(),
  body("strength", "strength must be a number").isInt(),
  body("strength", "strength must be a number between 3 to 30").isInt({
    min: 3,
    max: 30,
  }),
  body("dexterity", "dexterity must be a number").isInt(),
  body("dexterity", "dexterity number between 3 to 30").isInt({
    min: 3,
    max: 30,
  }),
  ,
  body("constitution", "constitution must be a number").isInt(),
  body("constitution", "constitution number between 3 to 30").isInt({
    min: 3,
    max: 30,
  }),
  ,
  body("intelligence", "intelligence must be a number").isInt({
    min: 3,
    max: 30,
  }),
  ,
  body("intelligence", "intelligence number between 3 to 30").isInt(),
  body("wisdom", "wisdom must be a number").isInt(),
  body("wisdom", "wisdom number between 3 to 30").isInt({
    min: 3,
    max: 30,
  }),
  ,
  body("charisma", "charisma must be a number").isInt(),
  body("charisma", "charisma number between 3 to 30").isInt({
    min: 3,
    max: 30,
  }),
  ,
  body("hitpoints", "hitpoints must be a number").isInt(),
  body("temporaryhitpoints", "temporaryhitpoints must be a number").isInt(),
  body("armorclass", "armorclass must be a number").isInt(),
  body("inventory", "inventory is must be characters").isString(),
];

module.exports = { checkAddCharacterInput };
