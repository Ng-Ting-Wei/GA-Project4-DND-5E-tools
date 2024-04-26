const express = require("express");
const router = express.Router();

const { getAllRacelist, addRace } = require("../controllers/races");
const { errorCheck } = require("../validators/errorCheck");
const auth = require("../middleware/users");

router.get("/racelist", errorCheck, getAllRacelist);
router.put("/racelist", errorCheck, addRace);

module.exports = router;
