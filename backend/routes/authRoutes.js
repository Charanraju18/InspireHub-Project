const express = require("express");
const router = express.Router();
const {
  login,
  fullSignup,
  getUserProfile,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/full-signup", fullSignup);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
