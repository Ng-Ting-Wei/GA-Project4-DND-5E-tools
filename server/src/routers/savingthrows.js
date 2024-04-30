const express = require("express");
const router = express.Router();

const {
  getAllSavingthrowlist,
  addSavingthrow,
} = require("../controllers/savingthrows");
const { checkSavingthrowlistInput } = require("../validators/savingthrow");
const { errorCheck } = require("../validators/errorCheck");
const { auth } = require("../middleware/users");

router.get("/savingthrowlist", auth, getAllSavingthrowlist);
router.put(
  "/savingthrowlist",
  auth,
  checkSavingthrowlistInput,
  errorCheck,
  addSavingthrow
);

module.exports = router;
