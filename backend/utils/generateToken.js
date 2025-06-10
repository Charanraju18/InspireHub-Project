const jwt = require("jsonwebtoken");

const generateToken = (user, role) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: role,
    },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
