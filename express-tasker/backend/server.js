const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const customerRouter = require("./routes/customer");
const skillRouter = require("./routes/skill");
const serviceProviderRouter = require("./routes/serviceProvider");
const skillVerificationRouter = require("./routes/skillverifiaction");
const auth = require("./routes/auth");
const orderRouter = require("./routes/order");
const reviewRouter = require("./routes/review");
const ratingRouter = require("./routes/rating");
const searchRouter = require("./routes/search");

require("dotenv").config();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/customer", customerRouter);
app.use("/serviceProvider", serviceProviderRouter);
app.use("/skill", skillRouter);
app.use("/skillVerification", skillVerificationRouter);
app.use("/auth", auth);
app.use("/order", orderRouter);
app.use("/review", reviewRouter);
app.use("/rating", ratingRouter);
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
