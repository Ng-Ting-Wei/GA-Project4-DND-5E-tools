const mongoose = require("mongoose");

const Feature = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
});

const ClasslistSchema = new mongoose.Schema(
  {
    classlist: { type: String, require: true },
    detail: { type: [Feature] },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "classlist" }
);

module.exports = mongoose.model("Classlist", ClasslistSchema);
