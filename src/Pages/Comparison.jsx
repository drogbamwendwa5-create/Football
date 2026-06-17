import { useState } from "react";
import { motion } from "framer-motion";
import RadarComparison from "../charts/RadarComparison";
import LeagueComparisonChart from "../charts/LeagueComparisonChart";

function Comparison() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  const stats = [
    { label: "Matches Played", t1: "38", t2: "38" },
    { label: "Wins", t1: "28", t2: "26" },
    { label: "Draws", t1: "6", t2: "8" },
    { label: "Losses", t1: "4", t2: "4" },
    { label: "Goals For", t1: "96", t2: "88" },
    { label: "Goals Against", t1: "34", t2: "29" },
    { label: "Goal Difference", t1: "+62", t2: "+59" },
    { label: "Points", t1: "90", t2: "86" },
  ];

  return (
    <div className="main-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1>Team Comparison</h1>
          <p>Compare statistics between two teams side-by-side.</p>
        </div>

        <div className="comparison-inputs">
          <input type="text" placeholder="Enter team 1 (e.g. Manchester City)" value={team1}
            onChange={(e) => setTeam1(e.target.value)} className="comparison-input" />
          <span className="comparison-vs">VS</span>
          <input type="text" placeholder="Enter team 2 (e.g. Arsenal)" value={team2}
            onChange={(e) => setTeam2(e.target.value)} className="comparison-input" />
        </div>
      </motion.div>

      <div className="comparison-content">
        <motion.div className="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <h3>Statistical Comparison</h3>
          <div className="comparison-grid">
            <h3 style={{ textAlign: "right" }}>{team1 || "Team A"}</h3>
            <h3 style={{ color: "var(--accent-light)" }}>Stat</h3>
            <h3>{team2 || "Team B"}</h3>
          </div>
          {stats.map((s) => (
            <div key={s.label} className="comparison-stat">
              <span style={{ fontWeight: 700, color: "var(--text-white)" }}>{s.t1}</span>
              <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
              <span style={{ fontWeight: 700, color: "var(--text-white)" }}>{s.t2}</span>
            </div>
          ))}
        </motion.div>

        <RadarComparison title="Team Comparison Radar" />
        <LeagueComparisonChart title="League Scoring Comparison" />
      </div>
    </div>
  );
}

export default Comparison;