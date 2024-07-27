const jwt = require('jsonwebtoken')
require("dotenv").config();
const refreshTokenGenerator = () => {
    const refreshToken = jwt.sign({ user: "user1" }, process.env.REFRESH_TOKEN, {
    expiresIn: "1d",
  });
  return refreshToken;
};
module.exports = refreshTokenGenerator;