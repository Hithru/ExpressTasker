const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    order_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    customer_name: { type: String, required: true },
    serviceProvider_id: { type: String, required: true },
    serviceProvider_name: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports.Rating = Rating;
