const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASS = process.env.MONGODB_PASS;

// connect db
mongoose.connect(
  MONGODB_URI,
  {
    auth: {
      user: MONGODB_USERNAME,
      password: MONGODB_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error) {
    console.log(error);
  }
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
  res.render("index");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend server initialized at port: ${PORT}`)
);
