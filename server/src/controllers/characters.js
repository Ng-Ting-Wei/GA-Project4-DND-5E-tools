const CharactersModal = require("../models/Characters");
const UsersModel = require("../models/Users");

const getAllCharacters = async (req, res) => {
  try {
    const characters = await CharactersModal.find();
    if (characters.length) {
      res.json({ status: "ok", msg: "characters found", data: characters });
    } else {
      res.json({ status: "error", msg: "no characters found" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error in getting all characters" });
  }
};

const addCharacter = async (req, res) => {
  try {
    const newCharacter = {
      name: req.body.name,
      race: req.body.race,
      class: req.body.class,
      level: req.body.level,
      background: req.body.background,
      strength: req.body.strength,
      dexterity: req.body.dexterity,
      constitution: req.body.constitution,
      intelligence: req.body.intelligence,
      wisdom: req.body.wisdom,
      charisma: req.body.charisma,
      hitpoints: req.body.hitpoints,
      temporaryhitpoints: req.body.temporaryhitpoints,
      armorclass: req.body.armorclass,
      inventory: req.body.inventory,
      player: req.body.player,
    };
    const character = await CharactersModal.create(newCharacter);

    let user = await UsersModel.findById(req.body.player);

    user.characters.push(character._id);

    user = await UsersModel.findByIdAndUpdate(req.body.player, user, {
      new: true,
    });

    res.json({
      status: "ok",
      msg: "character saved",
      data: { character, user },
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error in adding character" });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const updateCharacter = {};
    if ("name" in req.body) updateCharacter.name = req.body.name;
    if ("race" in req.body) updateCharacter.race = req.body.race;
    if ("class" in req.body) updateCharacter.class = req.body.class;
    if ("level" in req.body) updateCharacter.level = req.body.level;
    if ("background" in req.body)
      updateCharacter.background = req.body.background;
    if ("strength" in req.body) updateCharacter.strength = req.body.strength;
    if ("dexterity" in req.body) updateCharacter.dexterity = req.body.dexterity;
    if ("constitution" in req.body)
      updateCharacter.constitution = req.body.constitution;
    if ("intelligence" in req.body)
      updateCharacter.intelligence = req.body.intelligence;
    if ("wisdom" in req.body) updateCharacter.wisdom = req.body.wisdom;
    if ("charisma" in req.body) updateCharacter.charisma = req.body.charisma;
    if ("hitpoints" in req.body) updateCharacter.hitpoints = req.body.hitpoints;
    if ("temporaryhitpoints" in req.body)
      updateCharacter.temporaryhitpoints = req.body.temporaryhitpoints;
    if ("armorclass" in req.body)
      updateCharacter.armorclass = req.body.armorclass;
    if ("inventory" in req.body) updateCharacter.inventory = req.body.inventory;

    const character = await CharactersModal.findByIdAndUpdate(
      req.body._id,
      updateCharacter
    );

    res.json({ status: "ok", msg: "Character updated", data: character });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error in updating character" });
  }
};

module.exports = {
  getAllCharacters,
  addCharacter,
  updateCharacter,
};
