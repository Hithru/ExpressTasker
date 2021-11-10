const express = require("express");
const router = require("express").Router();
const { Customer } = require("../models/customer.model");
const { CustomerComplaint } = require("../models/customerComplaint.model");
const authCustomer = require("../middleware/authCustomer");
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
  const email = req.body.email.toLowerCase();
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

router.route("/get-customer").post((req, res) => {
  Customer.find({ _id: req.body.user_id }).then((data) => {
    res.send(data[0]);
  });
});

router.route("/createcomplaint").post((req, res) => {
  console.log("data came to backend");
  console.log(req.body);
  const customer_id = req.body.customer_id;
  const customer_name = req.body.customer_name;
  const customer_email = req.body.customer_email;
  const description = req.body.description;
  const isSolved = false;

  const newCustomerComplaint = new CustomerComplaint({
    customer_name,
    customer_id,
    customer_email,
    description,
    isSolved,
  });

  newCustomerComplaint
    .save()
    .then(() => res.send(newCustomerComplaint))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.post("/:id", async (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => res.json(customer))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
