const express = require("express");
const {
  getAllCharacters,
  addCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characters");
const router = express.Router();

router.get("/characters/allcharacters", getAllCharacters);
router.put("/characters/addcharacters", addCharacter);
router.patch("/characters/updatecharacters", updateCharacter);
router.delete("/characters/deletecharacters", deleteCharacter);

module.exports = router;
