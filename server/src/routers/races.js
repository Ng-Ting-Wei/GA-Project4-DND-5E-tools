const express = require("express");
const router = express.Router();

const { getAllRacelist } = require("../controllers/races");
const { errorCheck } = require("../validators/errorCheck");
const auth = require("../middleware/users");

router.get("/racelist", errorCheck, getAllRacelist);

module.exports = router;
