const express = require("express");
const router = express.Router();
const { getAllClasslist, addClasses } = require("../controllers/classlist");

router.get("/classlist", getAllClasslist);
router.put("/classlist", addClasses);

module.exports = router;
