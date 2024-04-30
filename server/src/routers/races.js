const express = require("express");
const router = express.Router();

const { getAllRacelist, addRace } = require("../controllers/races");
const { checkRacelistInput } = require("../validators/races");
const { errorCheck } = require("../validators/errorCheck");
const { auth } = require("../middleware/users");

router.get("/racelist", auth, getAllRacelist);
router.put("/racelist", auth, checkRacelistInput, errorCheck, addRace);

module.exports = router;
