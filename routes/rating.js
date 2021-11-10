const express = require("express");
const router = require("express").Router();
const { Customer } = require("../models/customer.model");
const ServiceProvider = require("../models/serviceprovider.model");
const authServiceProvider = require("../middleware/authServiceProvider");
const { Rating } = require("../models/rating.model");
const mongoose = require("mongoose");
const Joi = require("joi");

router.post("/createRating", authServiceProvider, async (req, res) => {
  console.log("data came to backend");
  console.log(req.body);
  const schema = Joi.object({
    order_id: Joi.string().min(6).required(),
    customer_id: Joi.string().min(6).required(),
    customer_name: Joi.string().min(6).required(),
    serviceProvider_id: Joi.string().min(6).required(),
    serviceProvider_name: Joi.string().min(6).required(),
    rating: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("validation pass");

  const rating = new Rating({
    order_id: req.body.order_id,
    customer_id: req.body.customer_id,
    customer_name: req.body.customer_name,
    serviceProvider_id: req.body.serviceProvider_id,
    serviceProvider_name: req.body.serviceProvider_name,
    rating: req.body.rating,
  });

  await rating.save();

  const customerRatings = await Rating.find({
    customer_id: req.body.customer_id,
  });

  let sumRating = 0;
  let numberOfRatings = customerRatings.length;

  customerRatings.forEach(function (arrayItem) {
    sumRating += arrayItem.rating;
    // console.log(arrayItem.rating);
  });

  // console.log(customerRatings);
  // console.log(numberOfRatings);
  // console.log(sumRating);
  const finalNewRating = (sumRating / numberOfRatings).toFixed(1);

  const customer = await Customer.findByIdAndUpdate(req.body.customer_id, {
    rating: finalNewRating,
  });

  // console.log(finalNewRating);
  // console.log(customer);
  res.send(rating);
});

module.exports = router;
