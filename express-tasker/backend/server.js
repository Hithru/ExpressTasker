const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const customerRouter = require("./routes/customer");
const skillRouter = require("./routes/skill");
const serviceProviderRouter = require("./routes/serviceProvider");
const skillVerificationRouter = require("./routes/skillverifiaction");
const searchRouter = require("./routes/search");

require("dotenv").config();

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
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
