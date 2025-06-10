const Event = require("../models/events");

// POST: Create new event
exports.createEvent = async (req, res) => {
  try {
    const { body, file } = req;

    // Parse schedule JSON if sent as string
    let parsedSchedule = {};
    if (body.schedule) {
      try {
        parsedSchedule = JSON.parse(body.schedule);
      } catch (error) {
        console.error("Error parsing schedule JSON:", error.message);
        return res.status(400).json({ error: "Invalid schedule format" });
      }
    }

    // Parse sections JSON if sent as string
    let parsedSections = [];
    if (body.sections) {
      try {
        parsedSections = JSON.parse(body.sections);
      } catch (error) {
        console.error("Error parsing sections JSON:", error.message);
        return res.status(400).json({ error: "Invalid sections format" });
      }
    }

    // Convert uploaded image buffer to base64 string
    const base64Image = file
      ? `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      : parsedSchedule.image || null;

    const newEvent = new Event({
      title: body.title,
      intro: body.intro,
      joinLink: body.joinLink,
      sections: parsedSections,
      schedule: {
        ...parsedSchedule,
        image: base64Image,
      },
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (err) {
    console.error("Error saving event:", err.message);
    res.status(500).json({ error: "Failed to save event" });
  }
};

// GET: All events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
