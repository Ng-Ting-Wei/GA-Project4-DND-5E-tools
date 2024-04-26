const Backgroundlist = require("../models/Background");

const getAllBackgroundlist = async (req, res) => {
  try {
    const backgroundlist = await Backgroundlist.find();
    // mapping backgroundlist first then mapping backgroundlist.detail
    res.json(
      backgroundlist.map((item) => ({
        background: item.background,
        details: item.detail.map((detailItem) => ({ detail: detailItem })),
      }))
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "cannot get backgroundlist" });
  }
};

const addBackground = async (req, res) => {
  try {
    const newBackground = {
      background: req.body.background,
      detail: req.body.detail,
    };

    const backgrounds = await Backgroundlist.create(newBackground);

    res.json({ status: "ok", msg: "background saved", data: backgrounds });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error adding background" });
  }
};

module.exports = { getAllBackgroundlist, addBackground };
