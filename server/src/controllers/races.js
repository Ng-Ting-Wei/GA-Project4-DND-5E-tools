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

module.exports = { getAllRacelist };
