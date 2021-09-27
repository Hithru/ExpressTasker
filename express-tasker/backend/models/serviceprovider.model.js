const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema(
  {
    username: { type: String, required: true },
    skills: { type: [String], required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);

module.exports = ServiceProvider;
