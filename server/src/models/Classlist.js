const mongoose = require("mongoose");

const ClasslistSchema = new mongoose.Schema(
  {
    classlist: { type: String, require: true },
    detail: { type: [String] },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "classlist" }
);

module.exports = mongoose.model("Classlist", ClasslistSchema);
