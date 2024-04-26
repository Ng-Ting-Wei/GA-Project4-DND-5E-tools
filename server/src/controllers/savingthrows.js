const SavingthrowslistModal = require("../models/Savingthrows");

const getAllSavingthrowlist = async (req, res) => {
  try {
    const savingthrowlist = await SavingthrowslistModal.find();
    // mapping savingthrowlist first then mapping savingthrowlist.detail
    res.json(
      savingthrowlist.map((item) => ({
        savingthrow: item.savingthrow,
        details: item.detail.map((detailItem) => ({ detail: detailItem })),
      }))
    );
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "cannot get savingthrowlist" });
  }
};

const addSavingthrow = async (req, res) => {
  try {
    const newSavingthrow = {
      savingthrow: req.body.savingthrow,
      detail: req.body.detail,
    };

    const savingthrow = await SavingthrowslistModal.create(newSavingthrow);

    res.json({ status: "ok", msg: "savingthrow saved", data: savingthrow });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error adding savingthrow" });
  }
};

module.exports = { getAllSavingthrowlist, addSavingthrow };
