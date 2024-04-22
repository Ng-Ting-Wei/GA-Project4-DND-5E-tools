const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    hash: { type: String, require: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

module.exports = mongoose.model("Users", AuthSchema);
