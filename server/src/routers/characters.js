const express = require("express");
const {
  getAllCharacters,
  addCharacter,
  updateCharacter,
} = require("../controllers/characters");
const router = express.Router();

router.get("/characters/allcharacters", getAllCharacters);
router.put("/characters/addcharacters", addCharacter);
router.patch("/characters/updatecharacters", updateCharacter);

module.exports = router;
