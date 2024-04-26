const mongoose = require("mongoose");

const BackgroundlistSchema = new mongoose.Schema(
  {
    background: { type: String, require: true },
    detail: [{ type: String, require: true }],
    created_at: { type: Date, default: Date.now },
  },
  { collection: "backgroundlist" }
);

module.exports = mongoose.model("Backgroundlist", BackgroundlistSchema);
