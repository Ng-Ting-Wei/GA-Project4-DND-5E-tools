const mongoose = require("mongoose");

const NPCsSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    race: { type: String, require: true },
    feature: { type: [String] },
    proficiencybonus: { type: Number, default: 2 },
    savingthrows: { type: [String] },
    skill: { type: [String] },
    strength: { type: Number, require: true },
    dexterity: { type: Number, require: true },
    constitution: { type: Number, require: true },
    intelligence: { type: Number, require: true },
    wisdom: { type: Number, require: true },
    charisma: { type: Number, require: true },
    maximumhitpoints: { type: Number, require: true },
    currenthitpoints: { type: Number, require: true },
    temporaryhitpoints: { type: Number, default: 0 },
    armorclass: { type: Number, default: 10 },
    created_at: { type: Date, default: Date.now },
    player: { type: mongoose.Schema.ObjectId, ref: "Users" },
  },
  { collection: "npcs" }
);

module.exports = mongoose.model("NPCs", NPCsSchema);
