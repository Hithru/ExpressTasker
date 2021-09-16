const router = require("express").Router();
const Customer = require("../models/customer.model");

router.route("/signup").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const rating = 0;
  console.log(username);

  const newCustomer = new Customer({
    username,
    email,
    rating,
    password,
  });
  console.log(newCustomer);
  newCustomer
    .save()
    .then(() => res.json("Customer signup successfully..."))
    .catch((err) => res.status(404).json("Error: " + err));
});

module.exports = router;
