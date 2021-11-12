const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");
const Profile = require("../models/profile.model");
const {
  ServiceProviderComplaint,
} = require("../models/serviceProviderComplaint.model");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("config");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

//Service Provider Signup
router.post("/signup", async (req, res) => {
  let service_provider = await ServiceProvider.findOne({
    email: req.body.email,
  });

  if (service_provider) return res.status(400).send("User already registered.");

  const username = req.body.username;
  const skills = req.body.skill;
  const location = req.body.location;
  const description = req.body.description;
  const review = "No reviews";
  const rating = 0;
  const contactNumber = req.body.contactNumber;
  const merchantId = req.body.merchantId;
  const profilePicture = "no picture";
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const isVerified = false;

  const serviceProvider = new ServiceProvider({
    username,
    skills,
    location,
    description,
    review,
    rating,
    contactNumber,
    merchantId,
    profilePicture,
    email,
    password,
    isVerified,
  });

  const salt = await bcrypt.genSalt(10);
  serviceProvider.password = await bcrypt.hash(serviceProvider.password, salt);
  await serviceProvider.save();

  const token = serviceProvider.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send("well Done");
});

//Add Service Provider Profile Picture
router
  .route("/addProfilePicture")
  .post(uploadCloud.single("file"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    const serviceProviderName = req.body.serviceProviderName;
    const serviceProviderId = req.body.serviceProviderId;
    const profilePicture = req.file.path;

    const newProfile = new Profile({
      serviceProviderName,
      serviceProviderId,
      profilePicture,
    });

    newProfile
      .save()
      .then(() => res.json(req.file.path))
      .catch((err) => res.status(404).json("Error: " + err));
  });

//Service Provider Create Complaint
router.post("/createComplaint", async (req, res) => {
  const serviceProvider_id = req.body.serviceProvider_id;
  const serviceProvider_name = req.body.serviceProvider_name;
  const serviceProvider_email = req.body.serviceProvider_email;
  const description = req.body.description;
  const isSolved = false;

  const newServiceProviderComplaint = new ServiceProviderComplaint({
    serviceProvider_id,
    serviceProvider_name,
    serviceProvider_email,
    description,
    isSolved,
  });

  newServiceProviderComplaint
    .save()
    .then(() => res.send(newServiceProviderComplaint))
    .catch((err) => res.status(404).json("Error: " + err));
});

//Service Provider data for Edit
router.post("/edit/:id", async (req, res) => {
  let service_provider = await ServiceProvider.findOne({
    email: req.body.email,
  });

  if (service_provider) return res.status(400).send("User already registered.");

  ServiceProvider.findById(req.params.id)
    .then(async (serviceProvider) => {
      serviceProvider.username = req.body.username;
      serviceProvider.description = req.body.description;
      serviceProvider.location = req.body.location;
      serviceProvider.contactNumber = req.body.contactNumber;
      serviceProvider.skill = req.body.skill;
      serviceProvider.merchantId = req.body.merchantId;
      serviceProvider
        .save()
        .then(() => res.json("Service Provider Profile Updated..."))
        .catch((err) => {
          res.status(404).json("Error: " + err);
        });
    })
    .catch((err) => res.status(404).json("Error: " + err));
});

//Getting Service provider profile details
router.route("/profile/:id").post((req, res) => {
  Profile.find({ serviceProviderId: req.params.id.toString() })
    .limit(1)
    .sort({ $natural: -1 })
    .then((profile) => res.json(profile))
    .catch((err) => res.status(404).json("Error: " + err));
});

//Getting service provider details
router.route("/:id").post((req, res) => {
  ServiceProvider.findById(req.params.id)
    .then((serviceProvider) => res.json(serviceProvider))
    .catch((err) => res.status(404).json("Error: " + err));
});

//Getting all service providers
router.route("/").post((req, res) => {
  ServiceProvider.find()
    .then((serviceProviders) => res.json(serviceProviders))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
