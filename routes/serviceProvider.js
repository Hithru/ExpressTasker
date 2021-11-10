const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");
const Profile = require("../models/profile.model");
const {
  ServiceProviderComplaint,
} = require("../models/serviceProviderComplaint.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
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

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(
//       null,
//       "C:/Users/shami/ExpressTaskerNew/ExpressTasker/express-tasker/src/component/ServiceProviderProfile/profilePhotos"
//     );
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const uploads = multer({ storage: storage });

router.post("/signup", async (req, res) => {
  // const schema = Joi.object({
  //   username: Joi.string().min(6).required(),
  //   email: Joi.string().min(6).required().email(),
  //   password: Joi.string().min(6).required(),
  // });

  // const { error } = schema.validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  // console.log("validation pass");

  let service_provider = await ServiceProvider.findOne({
    email: req.body.email,
  });

  if (service_provider) return res.status(400).send("User already registered.");
  console.log("user exist pass");

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

  console.log(serviceProvider);
  const salt = await bcrypt.genSalt(10);
  serviceProvider.password = await bcrypt.hash(serviceProvider.password, salt);
  await serviceProvider.save();

  // serviceProvider
  //   .save()
  // .then(() => res.json("Service Provider signup successfully..."))
  // .catch((err) => res.status(404).json("Error: " + err));

  const token = serviceProvider.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send("well Done");
});

router
  .route("/addProfilePicture")
  .post(uploadCloud.single("file"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    console.log(req.file.path);
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

router.post("/createComplaint", async (req, res) => {
  console.log("data came to backend");
  const serviceProvider_id = req.body.serviceProvider_id;
  const serviceProvider_name = req.body.serviceProvider_name;
  const serviceProvider_email = req.body.serviceProvider_email;
  const description = req.body.description;
  const isSolved = false;

  const newServiceProviderComplaint = new ServiceProviderComplaint({
    serviceProvider_name,
    serviceProvider_id,
    serviceProvider_email,
    description,
    isSolved,
  });

  newServiceProviderComplaint
    .save()
    .then(() => res.send(newServiceProviderComplaint))
    .catch((err) => res.status(404).json("Error: " + err));

  // const schema = Joi.object({
  //   serviceProvider_id: Joi.string().min(6).required(),
  //   serviceProvider_name: Joi.string().min(6).required(),
  //   serviceProvider_email: Joi.string().min(6).required(),
  //   description: Joi.string().required(),
  // });

  // const { error } = schema.validate({
  //   serviceProvider_id: req.body.serviceProvider_id,
  //   serviceProvider_name: req.body.serviceProvider_name,
  //   serviceProvider_email: req.body.serviceProvider_email,
  //   description: req.body.description,
  // });
  // if (error) return res.status(400).send(error.details[0].message);
  // console.log("validation pass");

  // const complaint = new ServiceProviderComplaint({
  //   serviceProvider_id: req.body.serviceProvider_id,
  //   serviceProvider_name: req.body.serviceProvider_name,
  //   serviceProvider_email: req.body.serviceProvider_email,
  //   description: req.body.description,
  //   isSolved: false,
  // });
  // await complaint.save();

  // res.send(complaint);
});

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
          console.log(err);
          res.status(404).json("Error: " + err);
        });
    })
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route("/profile/:id").post((req, res) => {
  Profile.find({ serviceProviderId: req.params.id.toString() })
    .limit(1)
    .sort({ $natural: -1 })
    .then((profile) => res.json(profile))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
  ServiceProvider.findById(req.params.id)
    .then((serviceProvider) => res.json(serviceProvider))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route("/").post((req, res) => {
  ServiceProvider.find()
    .then((serviceProviders) => res.json(serviceProviders))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
