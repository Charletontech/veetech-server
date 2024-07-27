const jwt = require('jsonwebtoken')
require("dotenv").config();
const authTokenGenerator = () => {
  var accessToken = jwt.sign({ user: "user1" }, process.env.ACCESS_TOKEN, {
    expiresIn: "3m",
  });
  return accessToken;
};
module.exports = authTokenGenerator;