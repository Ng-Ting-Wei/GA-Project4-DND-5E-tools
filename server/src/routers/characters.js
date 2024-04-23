const express = require("express");
const {
  getAllCharacters,
  getCharacterById,
  getCharacterByPlayer,
  addCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characters");
const router = express.Router();

router.get("/characters", getAllCharacters);
router.post("/characters/id", getCharacterById);
router.post("/characters/player", getCharacterByPlayer);
router.put("/characters", addCharacter);
router.patch("/characters", updateCharacter);
router.delete("/characters", deleteCharacter);

module.exports = router;
