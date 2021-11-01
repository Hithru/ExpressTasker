const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillVerificationSchema = new Schema(
  {
    skills: { type: String, required: true },
    confirmedFrom: { type: String, required: true },
    attachments: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SkillVerification = mongoose.model(
  "SkillVerification",
  skillVerificationSchema
);

module.exports = SkillVerification;
