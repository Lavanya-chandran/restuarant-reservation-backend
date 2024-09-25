const mongoose = require("mongoose");
const express = require("express");
const people = require("./controller/people");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();


dotenv.config();


mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO, {
  useNewUrlparser: true, useUnifiedTopology: true
},).then(() => console.log("Connected to DB"))
  .catch((err) => console.log("error"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/people", people);

app.listen(4000, () => {
  console.log("Server started at 4000");
})