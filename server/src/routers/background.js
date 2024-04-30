const express = require("express");
const router = express.Router();

const {
  getAllBackgroundlist,
  addBackground,
} = require("../controllers/background");
const { auth } = require("../middleware/users");

router.get("/backgroundlist", auth, getAllBackgroundlist);
router.put("/backgroundlist", auth, addBackground);

module.exports = router;
