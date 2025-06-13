const express = require("express");
const router = express.Router();
const { login, fullSignup, forgotPassword, resetPassword } = require("../controllers/authController");
const {getUserProfile, getAllInstructors, getSelectedInstructor} = require("../controllers/DetailsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/full-signup", fullSignup);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/instructors", getAllInstructors);
router.get("/instructors/:id", getSelectedInstructor);

module.exports = router;
