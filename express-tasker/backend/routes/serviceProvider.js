const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");

router.route("/signup").post((req, res) => {
  const username = req.body.username;
  const skills = req.body.skills;
  const location = req.body.location;
  const description = req.body.description;
  const review = "No reviews";
  const rating = 0;
  const email = req.body.email;
  const password = req.body.password;

  const newServiceProvider = new ServiceProvider({
    username,
    skills,
    location,
    description,
    review,
    rating,
    email,
    password,
  });

  newServiceProvider
    .save()
    .then(() => res.json("Service Provider signup successfully..."))
    .catch((err) => res.status(404).json("Error: " + err));
});

router.route("/").get((req, res) => {
  ServiceProvider.find()
    .then((serviceProviders) => res.json(serviceProviders))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
