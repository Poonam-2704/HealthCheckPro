// Backend/routes/leaderboard.js
const express = require("express");
const router = express.Router();
const Result = require("../models/Result"); // ✅ Correct path

router.get("/overall", async (req, res) => {
  try {
    // Aggregate to get the top 10 scores
    const results = await Result.aggregate([
      // Sort by score in descending order and timestamp in descending order
      { $sort: { score: -1, timestamp: -1 } },

      // Limit the result to the top 10 entries
      { $limit: 10 },

      // Project the desired fields to return
      {
        $project: {
          userId: 1,
          name: 1,
          score: 1,
          totalScore: 1,
          timestamp: 1,
        },
      },
    ]);

    // Send the results as a JSON response
    res.json(results);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error building leaderboard:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
