const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillVerificationSchema = new Schema(
  {
    serviceProviderName: { type: String, required: true },
    serviceProviderId: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    isSolved: { type: Boolean, required: true },
    isaccepted: { type: Boolean, required: true },
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
