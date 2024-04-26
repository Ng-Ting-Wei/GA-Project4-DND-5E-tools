const express = require("express");
const router = express.Router();

const {
  getAllBackgroundlist,
  addBackground,
} = require("../controllers/background");
const { errorCheck } = require("../validators/errorCheck");
const auth = require("../middleware/users");

router.get("/backgroundlist", errorCheck, getAllBackgroundlist);
router.put("/backgroundlist", errorCheck, addBackground);

module.exports = router;
