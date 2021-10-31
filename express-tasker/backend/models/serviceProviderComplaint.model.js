const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceProviderComplaintSchema = new Schema(
  {
    serviceProvider_id: { type: String, required: true },
    serviceProvider_name: { type: String, required: true },
    serviceProvider_email: { type: String, required: true },
    description: { type: String, required: true },
    isSolved: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ServiceProviderComplaint = mongoose.model(
  "ServiceProviderComplaint",
  serviceProviderComplaintSchema
);

module.exports.ServiceProviderComplaint = ServiceProviderComplaint;
