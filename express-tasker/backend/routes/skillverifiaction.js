const router = require("express").Router();
const SkillVerification = require("../models/skillVerification.model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      "D:/ExpressTasker/ExpressTasker/express-tasker/public/uploads"
    );
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.route("/send").post(uploads.single("attachments"), (req, res) => {
  const skills = req.body.skills;
  const confirmedFrom = req.body.confirmedFrom;
  const attachments = req.file.originalname;

  const newSkillVerificationRequest = new SkillVerification({
    skills,
    confirmedFrom,
    attachments,
  });

  newSkillVerificationRequest
    .save()
    .then(() => res.json("Skill Verification request sent..."))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route("/").get((req, res) => {
  SkillVerification.find()
    .then((skillVerificationRequests) => res.json(skillVerificationRequests))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
