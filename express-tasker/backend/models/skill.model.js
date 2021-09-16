const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillSchema = new Schema(
  {
    skillname: { type: String, required: true },
    rating: { type: Number, required: true },
    isVerified: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
