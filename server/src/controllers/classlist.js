const Classlist = require("../models/Classlist");

const getAllClasslist = async (req, res) => {
  try {
    const classlists = await Classlist.find();
    res.json(
      classlists.map((item) => ({
        classlist: item.classlist,
        details: item.detail,
      }))
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "cannot get classlist" });
  }
};
