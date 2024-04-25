const express = require("express");
const router = express.Router();
const {
  getAllClasslist,
  addClasses,
  getClassByName,
} = require("../controllers/classlist");

router.get("/classlist", getAllClasslist);
router.put("/classlist", addClasses);
router.post("/classlist", getClassByName);

module.exports = router;
