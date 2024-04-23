const express = require("express");
const { getAllCharacters, addCharacter } = require("../controllers/characters");
const router = express.Router();

router.get("/characters/allcharacters", getAllCharacters);
router.put("/characters/addcharacters", addCharacter);

module.exports = router;
