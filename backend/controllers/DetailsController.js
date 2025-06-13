const { User } = require("../models/User");

exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await User.find({ role: "Instructor" });
        if (!instructors || instructors.length === 0) {
            return res.status(404).json({ msg: "No instructors found" });
        }
        res.status(200).json(instructors);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
}

exports.getSelectedInstructor = async (req, res) => {
    const { id } = req.params;
    try {
        const instructor = await User.findOne({ _id: id, role: "Instructor" });
        if (!instructor) {
            return res.status(404).json({ msg: "Instructor not found" });
        }
        res.status(200).json(instructor);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
}