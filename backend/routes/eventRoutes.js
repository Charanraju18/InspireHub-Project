const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createEvent,
  getAllEvents,
  getEventById,
} = require("../controllers/eventController");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);

module.exports = router;
