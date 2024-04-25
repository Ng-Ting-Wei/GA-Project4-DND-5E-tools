const Classlist = require("../models/Classlist");

const getAllClasslist = async (req, res) => {
  try {
    const classlists = await Classlist.find();
    // mapping classlists first then mapping classlists.detail
    res.json(
      classlists.map((item) => ({
        classlist: item.classlist,
        details: item.detail.map((detailItem) => ({ detail: detailItem })),
      }))
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "cannot get classlist" });
  }
};

module.exports = { getAllClasslist };
