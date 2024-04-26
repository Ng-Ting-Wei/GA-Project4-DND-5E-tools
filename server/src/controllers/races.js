const RacelistModal = require("../models/Races");

const getAllRacelist = async (req, res) => {
  try {
    const racelists = await RacelistModal.find();
    // mapping racelists first then mapping racelists.detail
    res.json(
      racelists.map((item) => ({
        racelist: item.racelist,
        details: item.detail.map((detailItem) => ({ detail: detailItem })),
      }))
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "cannot get racelist" });
  }
};

const addRace = async (req, res) => {
  try {
    const newRace = {
      racelist: req.body.racelist,
      detail: req.body.detail,
    };

    const races = await RacelistModal.create(newRace);

    res.json({ status: "ok", msg: "race saved", data: races });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error adding race" });
  }
};

module.exports = { getAllRacelist, addRace };
