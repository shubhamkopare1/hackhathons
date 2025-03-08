const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },

  leader: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  },

  members: {
    type: [memberSchema],
    validate: [(members) => members.length >= 1, "At least one member is required"],
  },

  paymentScreenshot: { type: String, required: true }, // Will store image URL after upload
  
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Team", teamSchema);
