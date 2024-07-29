const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

//enabling cors
app.use(
  cors({
    origin: "https://veetechedu.netlify.app",
    credentials: true,
  })
);
app.options("*", cors());

app.use("/", router);

module.exports = app;
