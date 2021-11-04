const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerComplaintSchema = new Schema(
  {
    customer_id: { type: String, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    description: { type: String, required: true },
    isSolved: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const CustomerComplaint = mongoose.model(
  "CustomerComplaint",
  customerComplaintSchema
);

module.exports.CustomerComplaint = CustomerComplaint;
