const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema(
  {
    role: { type: String, require: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "roles" }
);

module.exports = mongoose.model("Roles", RolesSchema);
