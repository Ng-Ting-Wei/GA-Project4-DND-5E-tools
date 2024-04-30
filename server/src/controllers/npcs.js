const NPCsModal = require("../models/NPCs");
const UsersModel = require("../models/Users");

const getAllNPCs = async (req, res) => {
  try {
    const npcs = await NPCsModal.find();
    if (npcs.length) {
      res.json({ status: "ok", msg: "npcs found", data: npcs });
    } else {
      res.json({ status: "ok", msg: "no npcs found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error in getting all npcs" });
  }
};

const getNPCsById = async (req, res) => {
  try {
    const npcs = await NPCsModal.findById(req.body._id);
    if (npcs) {
      res.json({ status: "ok", msg: "npcs found", data: npcs });
    } else {
      res.json({ status: "ok", msg: "npcs id does not exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error in getting npcs id" });
  }
};

const getNPCsByPlayer = async (req, res) => {
  try {
    const npcs = await NPCsModal.find({ player: req.body.player });
    if (npcs) {
      res.json({ status: "ok", msg: "npcs found", data: npcs });
    } else {
      res.json({ status: "ok", msg: "User has no npcs" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error in getting player npcs" });
  }
};

const addNPCs = async (req, res) => {
  try {
    const newNPC = {
      name: req.body.name,
      race: req.body.race,
      feature: req.body.feature,
      savingthrows: req.body.savingthrows,
      skill: req.body.skill,
      strength: req.body.strength,
      dexterity: req.body.dexterity,
      constitution: req.body.constitution,
      intelligence: req.body.intelligence,
      wisdom: req.body.wisdom,
      charisma: req.body.charisma,
      maximumhitpoints: req.body.maximumhitpoints,
      currenthitpoints: req.body.currenthitpoints,
      temporaryhitpoints: req.body.temporaryhitpoints,
      armorclass: req.body.armorclass,
      player: req.body.player,
    };
    const npc = await NPCsModal.create(newNPC);

    let user = await UsersModel.findById(req.body.player);

    user.npcs.push(npc._id);

    user = await UsersModel.findByIdAndUpdate(req.body.player, user, {
      new: true,
    });

    res.json({
      status: "ok",
      msg: "NPC saved",
      data: { npc, user },
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error in adding NPC" });
  }
};

const updateNPC = async (req, res) => {
  try {
    const updateNPC = {};
    if ("name" in req.body) updateNPC.name = req.body.name;
    if ("race" in req.body) updateNPC.race = req.body.race;
    if ("feature" in req.body) updateNPC.feature = req.body.feature;
    if ("proficiencybonus" in req.body)
      updateNPC.proficiencybonus = req.body.proficiencybonus;
    if ("savingthrows" in req.body)
      updateNPC.savingthrows = req.body.savingthrows;
    if ("skill" in req.body) updateNPC.skill = req.body.skill;
    if ("strength" in req.body) updateNPC.strength = req.body.strength;
    if ("dexterity" in req.body) updateNPC.dexterity = req.body.dexterity;
    if ("constitution" in req.body)
      updateNPC.constitution = req.body.constitution;
    if ("intelligence" in req.body)
      updateNPC.intelligence = req.body.intelligence;
    if ("wisdom" in req.body) updateNPC.wisdom = req.body.wisdom;
    if ("charisma" in req.body) updateNPC.charisma = req.body.charisma;
    if ("maximumhitpoints" in req.body)
      updateNPC.maximumhitpoints = req.body.maximumhitpoints;
    if ("currenthitpoints" in req.body)
      updateNPC.currenthitpoints = req.body.currenthitpoints;
    if ("temporaryhitpoints" in req.body)
      updateNPC.temporaryhitpoints = req.body.temporaryhitpoints;
    if ("armorclass" in req.body) updateNPC.armorclass = req.body.armorclass;
    if ("player" in req.body) updateNPC.player = req.body.player;

    const npc = await NPCsModal.findByIdAndUpdate(req.body._id, updateNPC);

    res.json({ status: "ok", msg: "NPC updated", data: npc });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error in updating NPC" });
  }
};

const deleteNPC = async (req, res) => {
  try {
    const npc = await NPCsModal.findByIdAndDelete(req.body.npcs);
    const user = await UsersModel.findByIdAndUpdate(
      req.body._id,
      { $pull: { npcs: req.body.npcs } },
      { new: true }
    );
    res.json({ status: "ok", msg: "npc deleted", date: npc });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error in deleting npc" });
  }
};

module.exports = {
  getAllNPCs,
  getNPCsById,
  getNPCsByPlayer,
  addNPCs,
  updateNPC,
  deleteNPC,
};
