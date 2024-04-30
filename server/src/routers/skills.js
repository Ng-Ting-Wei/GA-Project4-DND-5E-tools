const express = require("express");
const router = express.Router();

const { getAllSkilllist, addSkill } = require("../controllers/skills");
const { checkSkilllistInput } = require("../validators/skills");
const { errorCheck } = require("../validators/errorCheck");
const { auth } = require("../middleware/users");

router.get("/skilllist", auth, getAllSkilllist);
router.put("/skilllist", auth, checkSkilllistInput, errorCheck, addSkill);

module.exports = router;
