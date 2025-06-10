const express = require("express");
const router = express.Router();
const {
  login,
  fullSignup,
  getUserProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/full-signup", fullSignup);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
