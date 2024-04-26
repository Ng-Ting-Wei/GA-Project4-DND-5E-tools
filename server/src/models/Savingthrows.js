const mongoose = require("mongoose");

const SavingthrowlistSchema = new mongoose.Schema(
  {
    savingthrow: { type: String, require: true },
    detail: [{ type: String, require: true }],
    created_at: { type: Date, default: Date.now },
  },
  { collection: "savingthrowlist" }
);

module.exports = mongoose.model("Savingthrowlist", SavingthrowlistSchema);
