const SkilllistModal = require("../models/Skills");

const getAllSkilllist = async (req, res) => {
  try {
    const skilllist = await SkilllistModal.find();
    // mapping skilllist first then mapping skilllist.detail
    res.json(
      skilllist.map((item) => ({
        skill: item.skill,
        details: item.detail.map((detailItem) => ({ detail: detailItem })),
      }))
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "cannot get skilllist" });
  }
};

const addSkill = async (req, res) => {
  try {
    const newSkill = {
      skill: req.body.skill,
      detail: req.body.detail,
    };

    const skills = await SkilllistModal.create(newSkill);

    res.json({ status: "ok", msg: "skill saved", data: skills });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error adding skill" });
  }
};

module.exports = { getAllSkilllist, addSkill };
