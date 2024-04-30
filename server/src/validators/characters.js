const { body } = require("express-validator");

const checkAddCharacterInput = [
  body("classes", "Classes is required").not().isEmpty(),
  body("classes", "Classes must be a string").isString(),
  body("race", "Race is required").not().isEmpty(),
  body("race", "Race must be a string").isString(),
  body("level", "Level must be a number").isInt(),
  body("background", "Background is required").not().isEmpty(),
  body("background", "Background must be a string").isString(),
  body("strength", "Strength must be a number").isInt({ min: 3, max: 30 }),
  body("dexterity", "Dexterity must be a number").isInt({ min: 3, max: 30 }),
  body("constitution", "Constitution must be a number").isInt({
    min: 3,
    max: 30,
  }),
  body("intelligence", "Intelligence must be a number").isInt({
    min: 3,
    max: 30,
  }),
  body("wisdom", "Wisdom must be a number").isInt({ min: 3, max: 30 }),
  body("charisma", "Charisma must be a number").isInt({ min: 3, max: 30 }),
  body("maximumhitpoints", "maximumhitpoints must be a number").isInt(),
  body("currenthitpoints", "currenthitpoints must be a number").isInt(),
  body("armorclass", "Armor Class must be a number").isInt(),
  body("inventory", "Inventory must be a string").isArray(),
];

const checkUpdateCharacterinput = [
  body("strength", "Strength must be a number").isInt({ min: 3, max: 30 }),
  body("dexterity", "Dexterity must be a number").isInt({ min: 3, max: 30 }),
  body("constitution", "Constitution must be a number").isInt({
    min: 3,
    max: 30,
  }),
  body("intelligence", "Intelligence must be a number").isInt({
    min: 3,
    max: 30,
  }),
  body("wisdom", "Wisdom must be a number").isInt({ min: 3, max: 30 }),
  body("charisma", "Charisma must be a number").isInt({ min: 3, max: 30 }),
  body("maximumhitpoints", "maximumhitpoints must be a number").isInt(),
  body("currenthitpoints", "currenthitpoints must be a number").isInt(),
  body("armorclass", "Armor Class must be a number").isInt(),
  body("inventory", "Inventory must be a string").isArray(),
];

module.exports = { checkAddCharacterInput, checkUpdateCharacterinput };
