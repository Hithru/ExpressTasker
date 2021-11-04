const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 5, maxlength: 50 },
    skills: { type: [String], required: true },
    location: { type: String, required: true },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 7000,
    },
    review: { type: String, required: true, minlength: 5, maxlength: 50 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    contactNumber: { type: Number, required: true },
    merchantId: { type: String },
    profilePicture: { type: String, required: true },
    email: { type: String, required: true, minlength: 5, maxlength: 50 },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    isVerified: { type: Boolean, required: true },
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
