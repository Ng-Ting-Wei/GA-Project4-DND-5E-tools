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
      hitpoints: req.bod.hitpoints,
      temporaryhitpoints: req.body.temporaryhitpoints,
      armorclass: req.body.armorclass,
      inventory: req.body.inventory,
      player: req.body.player,
    };
    const character = await CharactersModal.create(newCharacter);

    let user = await UsersModel.findById(req.body.player);

    user.characters.push(character._id);

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

module.exports = {
  getAllCharacters,
  addCharacter,
};
