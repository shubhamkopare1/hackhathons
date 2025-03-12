const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role ,email : user.email},
    process.env.JWT_SECRET,  // ✅ Use environment variable
    { expiresIn: "1h" }
  );
};

// ✅ Register User
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 🔍 Validate role
    if (!["admin", "team"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // 🔑 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// ✅ Login & Issue Token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    // ✅ Remove session storage if not needed
    // req.session.token = token;
    // req.session.role = user.role;

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Logout (Clear Cookie)
exports.logout = (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully" });
};
