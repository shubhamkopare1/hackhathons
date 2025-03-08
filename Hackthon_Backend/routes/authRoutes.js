const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Dashboard!", role: req.user.role });
});

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/team", authMiddleware, roleMiddleware("team"), (req, res) => {
  res.json({ message: "Welcome Team Member!" });
});

module.exports = router;
