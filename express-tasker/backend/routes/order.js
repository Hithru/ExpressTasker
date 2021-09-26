const express = require("express");
const router = require("express").Router();
const { Customer } = require("../models/customer.model");
const ServiceProvider = require("../models/serviceprovider.model");
const { Order } = require("../models/order.model");
const mongoose = require("mongoose");
const Joi = require("joi");

router.post("/createOrder", async (req, res) => {
  const schema = Joi.object({
    customer_id: Joi.string().min(6).required(),
    customer_name: Joi.string().min(6).required(),
    serviceProvider_id: Joi.string().min(6).required(),
    serviceProvider_name: Joi.string().min(6).required(),
    amount: Joi.number().required(),
    status: Joi.string(),
    startTime: Joi.date(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("validation pass");

  const order = new Order({
    customer_id: req.body.customer_id,
    customer_name: req.body.customer_name,
    serviceProvider_id: req.body.serviceProvider_id,
    serviceProvider_name: req.body.serviceProvider_name,
    amount: req.body.amount,
    status: req.body.status,
    startTime: req.body.startTime,
  });
  await order.save();

  res.send(order);
});

router.post("/customer", async (req, res) => {
  console.log(req.body.customer_id);
  const orders = await Order.find({ customer_id: req.body.customer_id }).sort(
    "-status"
  );

  console.log(orders);
  res.send(orders);
});

module.exports = router;
