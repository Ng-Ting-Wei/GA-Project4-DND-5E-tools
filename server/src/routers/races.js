const express = require("express");
const router = express.Router();

const { getAllRacelist, addRace } = require("../controllers/races");
const { checkRacelistInput, checkRaceByName } = require("../validators/races");
const { errorCheck } = require("../validators/errorCheck");
const { auth } = require("../middleware/users");

router.get("/racelist", auth, checkRacelistInput, errorCheck, getAllRacelist);
router.put("/racelist", auth, checkRaceByName, errorCheck, addRace);

module.exports = router;
