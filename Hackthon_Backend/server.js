
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const session = require("express-session");
const path = require("path");
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(
    session({
      secret: process.env.SESSION_SECRET || "your_secret_key",  // Change to a strong secret key
      resave: false,
      saveUninitialized: true,
      cookie: { secure: process.env.NODE_ENV === "production" },  // Use secure cookies in production
    })
  );
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
