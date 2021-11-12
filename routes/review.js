const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");
const { Review } = require("../models/review.model");
const authCustomer = require("../middleware/authCustomer");
const Joi = require("joi");

//Create New Review and Update Service Provider Rating
router.post("/createReview", authCustomer, async (req, res) => {
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

  const serviceProviderRatings = await Review.find({
    serviceProvider_id: req.body.serviceProvider_id,
  });

  let sumRating = 0;
  let numberOfRatings = serviceProviderRatings.length;

  serviceProviderRatings.forEach(function (arrayItem) {
    sumRating += arrayItem.rating;
  });

  const finalNewRating = (sumRating / numberOfRatings).toFixed(1);

  const serviceProvider = await ServiceProvider.findByIdAndUpdate(
    req.body.serviceProvider_id,
    {
      rating: finalNewRating,
    }
  );

  res.send(review);
});

module.exports = router;
