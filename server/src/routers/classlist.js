const express = require("express");
const router = express.Router();
const { getAllClasslist } = require("../controllers/classlist");

router.get("/classlist", getAllClasslist);

module.exports = router;
