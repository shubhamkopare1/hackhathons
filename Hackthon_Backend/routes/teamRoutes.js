const express = require("express");
const multer = require("multer");
const Team = require("../models/TeamModel");
const path = require("path");
const router = express.Router();
const fs = require("fs");

// ✅ Ensure "uploads/" folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // ✅ Automatically create folder
}

// ✅ Multer Storage Setup (For Payment Screenshot)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ Ensure files are stored in "uploads/"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ✅ Unique filename
  },
});

const upload = multer({ storage: storage });

// ✅ Register API (With Payment Screenshot Upload)
router.post("/register", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    console.log("📂 Uploaded File:", req.file); // ✅ Debugging output
    console.log("📜 Request Body:", req.body); // ✅ Debugging output

    if (!req.file) {
      return res.status(400).json({ message: "Payment screenshot is required" });
    }

    const { teamName, leaderName, leaderEmail, leaderPhone, leaderGender, members } = req.body;
    const parsedMembers = typeof members === "string" ? JSON.parse(members) : members;

    const hasFemale = parsedMembers.some((member) => member.gender === "Female");
    if (!hasFemale) {
      return res.status(400).json({ message: "At least one female team member is required" });
    }

    const newTeam = new Team({
      teamName,
      leader: { name: leaderName, email: leaderEmail, phone: leaderPhone, gender: leaderGender },
      members: parsedMembers,
      paymentScreenshot: `/uploads/${req.file.filename}`,
    });

    await newTeam.save();
    res.status(201).json({ message: "Team registered successfully!" });
  } catch (error) {
    console.error("❌ Error Registering Team:", error); // ✅ Error log karo
    res.status(500).json({ message: "Error registering team", error: error.message });
  }
});
// ✅ Get All Teams API
router.get("/getAllTeams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
});

// ✅ Get Single Team by ID API
router.get("/getTeam/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team", error });
  }
});

module.exports = router;
