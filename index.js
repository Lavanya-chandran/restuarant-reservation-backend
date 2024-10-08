const mongoose = require("mongoose");
const express = require("express");
const people = require("./controller/people");
const reserve=require("./controller/reserve");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const review = require("./controller/review");
const app = express();


dotenv.config();


mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO, {
  useNewUrlparser: true, useUnifiedTopology: true
},).then(() => console.log("Connected to DB"))
  .catch((err) => console.log("error"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({ origin: 'https://golden-fork.netlify.app' }));


app.use("/people", people);
app.use("/reserve",reserve);
app.use("/review",review)
app.listen(8900, () => {
  console.log("Server started at 8900");
})