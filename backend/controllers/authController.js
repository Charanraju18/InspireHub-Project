const { User } = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user: { id: user._id, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.fullSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      role,
      bio,
      profilePicture, // base64 string
      socialLinks,
      instructorProfile,
      learnerProfile,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Handle base64 profile picture conversion to image file
    let profilePictureUrl = "";

    if (profilePicture && profilePicture.startsWith("data:image")) {
      const base64Data = profilePicture.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Generate unique filename
      const filename = `profile_${Date.now()}.jpg`;

      // Directory to save uploads
      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Full path to save file
      const uploadPath = path.join(uploadDir, filename);

      // Write buffer to file
      fs.writeFileSync(uploadPath, buffer);

      // Set URL to store in DB or return
      profilePictureUrl = `/uploads/${filename}`;
    }

    const userData = {
      name,
      email,
      password,
      gender,
      role,
      bio,
      profilePicture: profilePictureUrl,
      socialLinks,
    };

    if (role === "Instructor") {
      userData.instructorProfile = instructorProfile;
    } else if (role === "Learner") {
      userData.learnerProfile = learnerProfile;
    }

    const newUser = new User(userData);
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        role: newUser.role,
        profilePicture: newUser.profilePicture, // send image path back
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
