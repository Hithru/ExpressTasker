const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  console.log("service provider Middle");
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  console.log("service provider Middle");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.serviceProvider = decoded;
    if (!req.serviceProvider.isServiceProvider)
      return res.status(403).send("Access denied.");
    console.log("middleware work properly");
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
