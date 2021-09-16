const router = require("express").Router();
const SkillVerification = require("../models/skillVerification.model");

router.route("/send").post((req, res) => {
  const skills = req.body.skills;
  const confirmedFrom = req.body.confirmedFrom;
  const attachments = req.body.attachments;

  const newSkillVerificationRequest= new SkillVerification({
    skills,
    confirmedFrom,
    attachments
  });
  
  newSkillVerificationRequest
    .save()
    .then(() => res.json("Skill Verification request sent..."))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route('/').get((req,res)=>{
  SkillVerification.find()
      .then(skillVerificationRequests => res.json(skillVerificationRequests))
      .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;
