const router = require("express").Router();
const Skill = require("../models/skill.model");

//Adding a new service provider skill
router.route("/add").post((req, res) => {
  const skillname = req.body.skillname;
  const rating = 0;
  const isVerified = false;

  const newSkill = new Skill({
    skillname,
    rating,
    isVerified,
  });

  newSkill
    .save()
    .then(() => res.json("Skill added successfully..."))
    .catch((err) => res.status(404).json("Error: " + err));
});

//Getting all the skils
router.route("/").post((req, res) => {
  Skill.find()
    .then((skills) => res.json(skills))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
