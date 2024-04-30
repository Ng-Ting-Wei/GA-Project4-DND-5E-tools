const express = require("express");
const router = express.Router();

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
const { auth } = require("../middleware/users");

router.get("/characters", auth, getAllCharacters);
router.post("/characters/id", auth, getCharacterById);
router.post("/characters/player", auth, getCharacterByPlayer);
router.put(
  "/characters",
  auth,
  checkAddCharacterInput,
  errorCheck,
  addCharacter
);
router.patch(
  "/characters",
  auth,
  checkUpdateCharacterinput,
  errorCheck,
  updateCharacter
);
router.delete("/characters", auth, deleteCharacter);

module.exports = router;
