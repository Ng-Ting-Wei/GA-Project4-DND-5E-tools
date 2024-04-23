const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    race: { type: String, require: true },
    class: { type: String, require: true },
    subclass: { type: String },
    level: { type: Number, default: 1 },
    proficiencybonus: { type: Number, default: 2 },
    background: { type: String, require: true },
    savingthrows: { type: [String] },
    skill: { type: [String] },
    strength: { type: Number, require: true },
    dexterity: { type: Number, require: true },
    constitution: { type: Number, require: true },
    intelligence: { type: Number, require: true },
    wisdom: { type: Number, require: true },
    charisma: { type: Number, require: true },
    hitpoints: { type: Number, require: true },
    temporaryhitpoints: { type: Number, default: 0 },
    armorclass: { type: Number, default: 10 },
    inventory: { type: [String] },
    created_at: { type: Date, default: Date.now },
    player: { type: mongoose.Schema.ObjectId, ref: "Users" },
  },
  { collection: "characters" }
);

module.exports = mongoose.model("Characters", CharacterSchema);
