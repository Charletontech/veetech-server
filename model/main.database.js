const mysql = require("mysql");

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "veetech",
});

module.exports = connectDB;
