const router = require("express").Router();
const Skill = require("../models/skill.model");

router.route("/add").post((req, res) => {
  const skillname = req.body.skillname;
  const rating = 0;
  const isVerified= false;

  const newSkill = new Skill({
    skillname,
    rating,
    isVerified
  });
  
  newSkill
    .save()
    .then(() => res.json("Skill added successfully..."))
    .catch((err) => res.status(404).json("Error: " + err));
});


router.route('/').get((req,res)=>{
  Skill.find()
      .then(skills => res.json(skills))
      .catch(err => res.status(404).json('Error: '+err));
})

router.route('/edit/:id').post((req,res)=>{
    Skill.findById(req.params.id)
        .then(skill => {
            skill.skillname=req.body.skillname;
            skill.rating=Number(req.body.rating);
            skill.isVerifed=req.body.isVerifed;

            skill.save()
                .then(()=>res.json('Skill Updated...'))
                .catch(err => res.status(404).json('Error: '+err))
        })
        .catch(err => res.status(404).json('Error: '+err))
})

module.exports = router;
