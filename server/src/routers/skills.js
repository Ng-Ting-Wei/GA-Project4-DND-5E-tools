const express = require("express");
const router = express.Router();

const { getAllSkilllist, addSkill } = require("../controllers/skills");
const { errorCheck } = require("../validators/errorCheck");
const auth = require("../middleware/users");

router.get("/skilllist", errorCheck, getAllSkilllist);
router.put("/skilllist", errorCheck, addSkill);

module.exports = router;
