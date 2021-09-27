const express = require("express");
const router = require("express").Router();
const { Customer } = require("../models/customer.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/signup", async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    location: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("validation pass");

  let customer = await Customer.findOne({ email: req.body.email });

  if (customer) return res.status(400).send("User already registered.");
  console.log("user exist pass");

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const location = req.body.location;
  const rating = 0;

  customer = new Customer({
    username,
    email,
    location,
    rating,
    password,
  });

  console.log(customer);
  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);
  await customer.save();

  const token = customer.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send("well Done");
});

module.exports = router;
