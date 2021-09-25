const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");

router.route("/signup").post((req, res) => {
  const username = req.body.username;
  const skillname = req.body.skillname;
  const location =req.body.location;
  const description=req.body.description;
  const review ="No reviews";
  const rating = 0;
  const contactNumber = req.body.contactNumber;
  const profilePicture= "no picture";
  const email = req.body.email;
  const password = req.body.password;

  const newServiceProvider = new ServiceProvider({
    username,
    skillname,
    location,
    description,
    review,
    rating,
    contactNumber,
    profilePicture,
    email,
    password
  });
  
  newServiceProvider
    .save()
    .then(() => res.json("Service Provider signup successfully..."))
    .catch((err) => res.status(404).json("Error: " + err));
});


router.route('/edit/:id').post((req,res)=>{
  ServiceProvider.findById(req.params.id)
      .then(serviceProvider => {
          serviceProvider.username=req.body.username;
          serviceProvider.description=req.body.description;
          serviceProvider.location=req.body.location;
          serviceProvider.contactNumber=req.body.contactNumber;

          serviceProvider.save()
              .then(()=>res.json('Service Provider Profile Updated...'))
              .catch(err => res.status(404).json('Error: '+err))
      })
      .catch(err => res.status(404).json('Error: '+err))
})


router.route('/').get((req,res)=>{
  ServiceProvider.find()
      .then(serviceProviders => res.json(serviceProviders))
      .catch(err => res.status(404).json('Error: '+err));
})

router.route('/:id').get((req,res)=>{
  ServiceProvider.findById(req.params.id)
      .then(serviceProvider => res.json(serviceProvider))
      .catch(err => res.status(404).json('Error: '+err));
})



module.exports = router;
