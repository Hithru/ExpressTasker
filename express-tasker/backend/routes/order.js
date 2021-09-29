const express = require("express");
const router = require("express").Router();
const { Customer } = require("../models/customer.model");
const ServiceProvider = require("../models/serviceprovider.model");
const { Order } = require("../models/order.model");
const mongoose = require("mongoose");
const Joi = require("joi");

router.post("/createOrder", async (req, res) => {
  console.log("data came to backend");
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

router.post("/details", async (req, res) => {
  console.log(req.body.order_id);
  const order = await Order.find({ _id: req.body.order_id });

  console.log(order);
  res.send(order);
});

router.post("/serviceProvider", async (req, res) => {
  console.log(req.body.serviceProvider_id);
  const orders = await Order.find({
    serviceProvider_id: req.body.serviceProvider_id,
  }).sort("-status");

  console.log(orders);
  res.send(orders);
});

router.post("/cancel", async (req, res) => {
  console.log(req.body.order_id);
  const order = await Order.findByIdAndUpdate(req.body.order_id, {
    status: "Canceled",
  });

  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  res.send(order);
});

router.post("/accept", async (req, res) => {
  console.log(req.body.order_id);
  const order = await Order.findByIdAndUpdate(req.body.order_id, {
    status: "Open",
  });

  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  res.send(order);
});

router.post("/review", async (req, res) => {
  console.log(req.body.order_id);
  const keep_order = await Order.find({
    _id: req.body.order_id,
  });
  console.log(keep_order[0].status);
  if (keep_order[0].status === "Reviewing") {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Closed",
    });
    res.send(order);
    return;
  } else {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Rating",
    });

    res.send(order);
  }
});

router.post("/rating", async (req, res) => {
  console.log(req.body.order_id);
  const keep_order = await Order.find({
    _id: req.body.order_id,
  });
  console.log(keep_order[0].status);
  if (keep_order[0].status === "Rating") {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Closed",
    });
    res.send(order);
    return;
  } else {
    const order = await Order.findByIdAndUpdate(req.body.order_id, {
      status: "Reviewing",
    });

    res.send(order);
  }
});

module.exports = router;
