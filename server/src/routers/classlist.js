const express = require("express");
const router = express.Router();
const {
  getAllClasslist,
  addClasses,
  getClassByName,
} = require("../controllers/classlist");
const {
  checkClasslistInput,
  checkGetClassByName,
} = require("../validators/classlist");
const { errorCheck } = require("../validators/errorCheck");

router.get("/classlist", getAllClasslist);
router.put("/classlist", checkClasslistInput, errorCheck, addClasses);
router.post("/classlist", checkGetClassByName, errorCheck, getClassByName);

module.exports = router;
