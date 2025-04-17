import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Leaderboard.css"; // optional CSS file

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/leaderboard/overall")
      .then((res) => {
        setLeaderboard(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      });
  }, []);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return "🏅"; // Gold
    if (rank === 2) return "🥈"; // Silver
    if (rank === 3) return "🥉"; // Bronze
    return ""; // No medal for other ranks
  };

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : leaderboard.length === 0 ? (
        <p>No leaderboard data available.</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Total Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.userId || index}>
                <td>
                  {index + 1}{" "}
                  <span className="medal-emoji">
                    {getMedalEmoji(index + 1)}
                  </span>
                </td>
                <td>{entry.name || "Anonymous"}</td>
                <td>{entry.score}</td>
                <td>{entry.totalScore}</td>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => (window.location.href = "/")} className="home-button">
        Go to Home
      </button>
    </div>
  );
};

export default Leaderboard;
