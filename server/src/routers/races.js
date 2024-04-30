const express = require("express");
const router = express.Router();

const { getAllRacelist, addRace } = require("../controllers/races");
const { auth } = require("../middleware/users");

router.get("/racelist", auth, getAllRacelist);
router.put("/racelist", auth, addRace);

module.exports = router;
