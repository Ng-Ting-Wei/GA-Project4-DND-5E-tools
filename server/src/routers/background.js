const express = require("express");
const router = express.Router();

const {
  getAllBackgroundlist,
  addBackground,
} = require("../controllers/background");
const { checkBackgroundlistInput } = require("../validators/background");
const { errorCheck } = require("../validators/errorCheck");
const { auth } = require("../middleware/users");

router.get(
  "/backgroundlist",
  auth,
  checkBackgroundlistInput,
  errorCheck,
  getAllBackgroundlist
);
router.put("/backgroundlist", auth, addBackground);

module.exports = router;
