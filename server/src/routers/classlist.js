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
const { auth } = require("../middleware/users");

router.get("/classlist", getAllClasslist);
router.put("/classlist", auth, checkClasslistInput, errorCheck, addClasses);
router.post(
  "/classlist",
  auth,
  checkGetClassByName,
  errorCheck,
  getClassByName
);

module.exports = router;
