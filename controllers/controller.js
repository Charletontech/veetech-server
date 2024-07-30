const axios = require("axios");
const jwt = require("jsonwebtoken");

// utils
const authTokenGenerator = require("../utils/authToken.util");
const refreshTokenGenerator = require("../utils/refreshToken.util");

// models
const connectDB = require("../model/main.database");
const ORM = require("../model/CharlieDB");

// services
const verifyTokenService = require("../services/verifyTokenService");
const createExam = require("../services/createExam.service");
const generateUniqueToken = require("../services/generateUniqueToken.service");

var users = [
  {
    username: "user1",
    password: "123",
  },
];

const loginHandler = (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find((each) => {
    return each.username === username && each.password === password;
  });
  if (userExists) {
    res.cookie("jwt", refreshTokenGenerator(), {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ token: authTokenGenerator() });
  } else {
    res.json({ message: "invalid login" });
    return;
  }
  console.log("welcome");
};

const initDB = (req, res) => {
  var sql =
    "CREATE TABLE IF NOT EXISTS tokens (id INT AUTO_INCREMENT PRIMARY KEY, dateCreated VARCHAR(15), token VARCHAR(255), status VARCHAR(20) )";
  connectDB.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  res.json("database initialized and ready!");
};

const verifyAccessToken = async (req, res) => {
  const receivedExamData = req.body;
  const accessToken = req.body.accessToken;
  let tokenIsVerified = await verifyTokenService(res, accessToken);
  if (tokenIsVerified) {
    createExam(res, receivedExamData);
  }
};

const sendExamToken = async (req, res) => {
  try {
    const token = await generateUniqueToken();
    await addTokenToDB(token);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: `Error occurred: ${err}` });
  }
};

// Function to add the token to the database
function addTokenToDB(token) {
  return new Promise((resolve, reject) => {
    const date = `${new Date().getDate()}/${new Date().getMonth() + 1}`;
    const values = [date, token, "new"];
    const sql = ORM.insert("tokens", ["dateCreated", "token", "status"]);
    connectDB.query(sql, values, (err, result) => {
      if (err) {
        return reject(new Error("There was an error adding token to DB"));
      }
      resolve(result);
    });
  });
}

const getAllTokens = (req, res) => {
  var sql = ORM.select("*", "tokens");
  connectDB.query(sql, (err, result) => {
    if (err) throw new Error("error querying to get all tokens from DB");
    res.status(200).json(result);
    return err;
  });
};

module.exports = {
  loginHandler,
  initDB,
  verifyAccessToken,
  createExam,
  sendExamToken,
  getAllTokens,
};
