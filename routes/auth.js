const Joi = require("joi");
const bcrypt = require("bcrypt");
const ServiceProvider = require("../models/serviceprovider.model");
const { Customer } = require("../models/customer.model");
const express = require("express");
const router = express.Router();

//Customer Login
router.post("/customer", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (!customer) return res.status(400).send("Invalid email or password.");
  const validPassword = await bcrypt.compare(
    req.body.password,
    customer.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  const token = customer.generateAuthToken();
  res.send(token);
});

//Service Provider Login
router.post("/serviceProvider", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let serviceProvider = await ServiceProvider.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (!serviceProvider)
    return res.status(400).send("Invalid email or password.");
  const validPassword = await bcrypt.compare(
    req.body.password,
    serviceProvider.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  const token = serviceProvider.generateAuthToken();
  res.send(token);
});

module.exports = router;
