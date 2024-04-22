const CharactersModal = require("../models/Characters");
const UsersModel = require("../models/Users");

const getAllCharacters = async (req, res) => {
  try {
    const characters = await CharactersModal.find();
    if (characters.length) {
      res.json({ status: "ok", msg: "characters found", data: characters });
    } else {
      res.json({ status: "error", msg: "Error in getting all characters" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "Error in getting all characters" });
  }
};

module.exports = {
  getAllCharacters,
};
