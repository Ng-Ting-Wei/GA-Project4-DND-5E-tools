const express = require("express");

const {
  getAllBackgroundlist,
  addBackground,
} = require("../controllers/background");
const { auth } = require("../middleware/users");

const router = express.Router();

router.get("/backgroundlist", auth, getAllBackgroundlist);
router.put("/backgroundlist", auth, addBackground);

module.exports = router;
