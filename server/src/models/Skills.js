const mongoose = require("mongoose");

const SkilllistSchema = new mongoose.Schema(
  {
    skill: { type: String, require: true },
    detail: [{ type: String, require: true }],
    created_at: { type: Date, default: Date.now },
  },
  { collection: "skilllist" }
);

module.exports = mongoose.model("Skilllist", SkilllistSchema);
