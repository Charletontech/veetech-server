const express = require("express");
const router = express.Router();
// controllers
const {
  loginHandler,
  initDB,
  verifyAccessToken,
  sendExamToken,
  getAllTokens,
} = require("../controllers/controller");

// middlewares
const authenticator = require("../middlewares/authentication.middleware");
const tokenRenewer = require("../utils/tokenRenewer.util");

// public routes
router.post("/login", loginHandler);
router.get("/refresher", tokenRenewer);
router.get("/db-init", initDB);

// protected api routes
router.use("/api", authenticator);
router.get("/api/dashboard", (req, res) => {
  console.log("reached");
  res.status(200).json("ok");
});

router.post("/api/verify-exam-access", verifyAccessToken);
router.get("/api/get-token", sendExamToken);
router.get("/api/get-all-tokens", getAllTokens);
module.exports = router;
