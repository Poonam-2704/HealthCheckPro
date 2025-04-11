// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/healthAssessment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema
const resultSchema = new mongoose.Schema({
  score: Number,
  totalScore: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.model("Result", resultSchema);

// POST route to save score
app.post("/api/save-score", async (req, res) => {
  try {
    const { score, totalScore } = req.body;
    const newResult = new Result({ score, totalScore });
    await newResult.save();
    res.status(201).json({ message: "Score saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save score." });
  }
});

// GET route to fetch all results
app.get("/api/results", async (req, res) => {
  try {
    const results = await Result.find().sort({ timestamp: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
