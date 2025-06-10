const Event = require("../models/events");

// POST: Create new event
exports.createEvent = async (req, res) => {
  try {
    const { body, file } = req;

    let parsedSchedule = {};
    if (body.schedule) {
      parsedSchedule = JSON.parse(body.schedule);
    }

    if (body.sections && typeof body.sections === "string") {
      body.sections = JSON.parse(body.sections);
    }

    const newEvent = new Event({
      title: body.title,
      intro: body.intro,
      joinLink: body.joinLink,
      sections: body.sections,
      schedule: {
        ...parsedSchedule,
        image: file ? "/uploads/" + file.filename : null,
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
