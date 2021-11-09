const router = require("express").Router();
const SkillVerification = require("../models/skillVerification.model");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require("config");
require("dotenv").config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloudCertificates = multer({ storage });


// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(
//       null,
//       "D:/ExpressTasker/ExpressTasker/express-tasker/public/uploads"
//     );
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const uploads = multer({ storage: storage });

router.route("/send").post(uploadCloudCertificates.single("attachments"), (req, res) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
 
  const serviceProviderName = req.body.serviceProviderName;
  const serviceProviderId = req.body.serviceProviderId;
  const email = req.body.email;
  const description = req.body.description;
  const isSolved = false;
  const isaccepted = false;
  const attachments = req.file.path;

  const newSkillVerificationRequest = new SkillVerification({
    serviceProviderName,
    serviceProviderId,
    email,
    description,
    isSolved,
    isaccepted,
    attachments,
  });

  newSkillVerificationRequest
    .save()
    .then(() => res.json("Skill Verification request sent..."))
    .catch((err) => res.status(404).json("Error: " + err));
});

// To get a verification request according to the serviceprovider_id
router.route("/find/:id").post((req, res) => {
  SkillVerification.find({ serviceProviderId: req.params.id.toString() })
    .then((verification) => res.json(verification))
    .catch((err) => res.status(404).json("Error: " + err));
});


router.route("/").post((req, res) => {
  SkillVerification.find()
    .then((skillVerificationRequests) => res.json(skillVerificationRequests))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
