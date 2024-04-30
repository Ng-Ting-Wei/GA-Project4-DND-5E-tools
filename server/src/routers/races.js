const express = require("express");
const router = express.Router();

const { getAllRacelist, addRace } = require("../controllers/races");
const { checkRacelistInput, checkRaceByName } = require("../validators/races");
const { auth } = require("../middleware/users");

router.get("/racelist", auth, checkRacelistInput, getAllRacelist);
router.put("/racelist", auth, checkRaceByName, addRace);

module.exports = router;
