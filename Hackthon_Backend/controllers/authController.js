const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ✅ Register User
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!["admin", "team"].includes(role)) return res.status(400).json({ message: "Invalid role" });

    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// ✅ Login & Issue Token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    // Store token in HTTP-Only Cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000, // 1 hour
    });

    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// ✅ Logout (Clear Cookie)
exports.logout = (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully" });
};
