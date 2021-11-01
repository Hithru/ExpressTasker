const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/signup",async (req, res) => {

  const username = req.body.username;
  const skills = req.body.skill;
  const location =req.body.location;
  const description=req.body.description;
  const review ="No reviews";
  const rating = 0;
  const contactNumber = req.body.contactNumber;
  const profilePicture= "no picture";
  const email = req.body.email;
  const password = req.body.password;

  const serviceProvider = new ServiceProvider({
    username,
    skills,
    location,
    description,
    review,
    rating,
    contactNumber,
    profilePicture,
    email,
    password,
  });

  console.log(serviceProvider);
  const salt = await bcrypt.genSalt(10);
  serviceProvider.password = await bcrypt.hash(serviceProvider.password, salt);
  await serviceProvider.save()
  
  const token = serviceProvider.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .status(200)
    .send("well Done");
    
});


router.post('/edit/:id', async(req,res)=>{
  ServiceProvider.findById(req.params.id)
      .then(async(serviceProvider) => {
          serviceProvider.username=req.body.username;
          serviceProvider.description=req.body.description;
          serviceProvider.location=req.body.location;
          serviceProvider.contactNumber=req.body.contactNumber;
          serviceProvider.skill=req.body.skill;

          serviceProvider.save()
              .then(()=>res.json('Service Provider Profile Updated...'))
              .catch(err => res.status(404).json('Error: '+err))
      })
      .catch(err => res.status(404).json('Error: '+err))
})


router.route('/').get((req,res)=>{
  ServiceProvider.find()
    .then((serviceProviders) => res.json(serviceProviders))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route('/:id').get((req,res)=>{
  ServiceProvider.findById(req.params.id)
      .then(serviceProvider => res.json(serviceProvider))
      .catch(err => res.status(404).json('Error: '+err));
})



module.exports = router;
