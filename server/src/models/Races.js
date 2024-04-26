const mongoose = require("mongoose");

const RacelistSchema = new mongoose.Schema(
  {
    race: { type: String, require: true },
    detail: [{ type: String, require: true }],
    created_at: { type: Date, default: Date.now },
  },
  { collection: "racelist" }
);

module.exports = mongoose.model("Racelist", RacelistSchema);
