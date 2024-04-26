const express = require("express");
const router = express.Router();

const {
  getAllSavingthrowlist,
  addSavingthrow,
} = require("../controllers/savingthrows");
const { errorCheck } = require("../validators/errorCheck");
const auth = require("../middleware/users");

router.get("/savingthrowlist", errorCheck, getAllSavingthrowlist);
router.put("/savingthrowlist", errorCheck, addSavingthrow);

module.exports = router;
