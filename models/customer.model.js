const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    location: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isServiceProvider: false,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports.Customer = Customer;
