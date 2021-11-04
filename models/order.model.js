const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customer_id: { type: String, required: true },
    customer_name: { type: String, required: true },
    serviceProvider_id: { type: String, required: true },
    serviceProvider_name: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    startTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
