// src/components/Results.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Results.css"; // Optional for styling

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/results")
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching results:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="results-container">
      <h2>Previous Assessment Scores</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Score</th>
              <th>Total Score</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.score}</td>
                <td>{result.totalScore}</td>
                <td>{new Date(result.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
<<<<<<< HEAD
=======
      <br></br>
>>>>>>> 2cb0410 (Updated frontend and backend folders with latest changes)
      <button onClick={() => window.location.href = "/"} className="home-button">
        Go to Home
      </button>
    </div>
  );
};

export default Results;
