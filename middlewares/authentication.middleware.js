require("dotenv").config();
const authenticator = (req, res, next) => {
  if (req.headers.authorization) {
    var clientAccessToken = req.headers["authorization"].split(" ")[1];
    if (clientAccessToken !== process.env.ACCESS_TOKEN) {
      res
        .status(401)
        .json({ message: "Unauthorized access: Incorrect access token!" });
      return;
    } else {
      next();
    }
  } else {
    res.status(401).json({ message: "Access token absent!" });
  }
};

module.exports = authenticator;
