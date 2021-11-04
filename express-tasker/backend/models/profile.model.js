const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    serviceProviderName:{ type: String, required: true },
    serviceProviderId:{ type: String, required: true },
    profilePicture:{ type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model(
  "Profile",
  profileSchema
);

module.exports = Profile;
