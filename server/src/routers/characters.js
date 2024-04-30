const express = require("express");
const {
  getAllCharacters,
  getCharacterById,
  getCharacterByPlayer,
  addCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characters");
const { errorCheck } = require("../validators/errorCheck");
const {
  checkAddCharacterInput,
  checkUpdateCharacterinput,
} = require("../validators/characters");
const router = express.Router();

router.get("/characters", getAllCharacters);
router.post("/characters/id", getCharacterById);
router.post("/characters/player", getCharacterByPlayer);
router.put("/characters", checkAddCharacterInput, errorCheck, addCharacter);
router.patch(
  "/characters",
  checkUpdateCharacterinput,
  errorCheck,
  updateCharacter
);
router.delete("/characters", deleteCharacter);

module.exports = router;
