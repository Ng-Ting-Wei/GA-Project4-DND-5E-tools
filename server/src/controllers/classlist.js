const ClasslistModal = require("../models/Classlist");

const getAllClasslist = async (req, res) => {
  try {
    const classlists = await ClasslistModal.find();
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

const addClasses = async (req, res) => {
  try {
    const newClasses = {
      classlist: req.body.classlist,
      detail: req.body.detail,
    };

    const classes = await ClasslistModal.create(newClasses);

    res.json({ status: "ok", msg: "classlist saved", data: classes });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error adding class" });
  }
};

const getClassByName = async (req, res) => {
  try {
    const classes = await ClasslistModal.find({
      classlist: req.body.classlist,
    });
    if (classes) {
      res.json({ status: "ok", msg: "classes found", data: classes });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Error in getting classes" });
  }
};

module.exports = { getAllClasslist, addClasses, getClassByName };
