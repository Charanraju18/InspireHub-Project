const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createEvent,
  getAllEvents,
  getEventById,
} = require("../controllers/eventController");

// Multer config (memory storage for base64)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);

module.exports = router;
