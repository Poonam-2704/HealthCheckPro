// Backend/models/Result.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  score: Number,
  totalScore: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: String, // Optional: only if you're tracking users
  name: String     // Optional: if you're displaying names
});

module.exports = mongoose.model("Result", resultSchema);
