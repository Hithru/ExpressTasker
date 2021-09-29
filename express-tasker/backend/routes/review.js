const express = require("express");
const router = require("express").Router();
const { Customer } = require("../models/customer.model");
const ServiceProvider = require("../models/serviceprovider.model");
const { Review } = require("../models/review.model");
const mongoose = require("mongoose");
const Joi = require("joi");

router.post("/createReview", async (req, res) => {
  console.log("data came to backend");
  console.log(req.body);
  const schema = Joi.object({
    order_id: Joi.string().min(6).required(),
    customer_id: Joi.string().min(6).required(),
    customer_name: Joi.string().min(6).required(),
    serviceProvider_id: Joi.string().min(6).required(),
    serviceProvider_name: Joi.string().min(6).required(),
    rating: Joi.number().required(),
    review: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("validation pass");

  const review = new Review({
    order_id: req.body.order_id,
    customer_id: req.body.customer_id,
    customer_name: req.body.customer_name,
    serviceProvider_id: req.body.serviceProvider_id,
    serviceProvider_name: req.body.serviceProvider_name,
    rating: req.body.rating,
    review: req.body.review,
  });
  await review.save();

  res.send(review);
});

module.exports = router;
