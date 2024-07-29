const mysql = require("mysql");
require("dotenv").config();

const connectDB = mysql.createConnection({
  host: `${process.env.VT_HOST}`,
  user: `${process.env.VT_USER},
  password: `${process.env.VT_PASSWORD}`,
  port: 3307,
  database: `${process.env.VT_DB}`,
});

module.exports = connectDB;
