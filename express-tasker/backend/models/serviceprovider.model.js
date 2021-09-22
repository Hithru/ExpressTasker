const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema(
  {
    username: { type: String, required: true },
    skillname: { type: String, required: true },
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

serviceProviderSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isServiceProvider: true,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);

module.exports = ServiceProvider;
