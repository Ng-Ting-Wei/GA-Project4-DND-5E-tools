const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true, default: "user" },
    created_at: { type: Date, default: Date.now },
    characters: [{ type: mongoose.Schema.ObjectId, ref: "Characters" }],
    npcs: [{ type: mongoose.Schema.ObjectId, ref: "NPCs" }],
  },
  { collection: "users" }
);

module.exports = mongoose.model("Users", UsersSchema);
