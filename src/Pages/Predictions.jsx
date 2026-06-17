import { useState } from "react";
import { motion } from "framer-motion";
import { predictMatch } from "../utils/predictionEngine";

function Predictions() {
  const [homeTeam, setHomeTeam] = useState({ name: "", winrate: 0, avgGoals: 0 });
  const [awayTeam, setAwayTeam] = useState({ name: "", winrate: 0, avgGoals: 0 });
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    if (!homeTeam.name || !awayTeam.name) return;
    const result = predictMatch(homeTeam, awayTeam);
    setPrediction({ ...result, homeName: homeTeam.name, awayName: awayTeam.name });
  };

  const confidence = prediction ? Math.max(...[prediction.homeProb, prediction.drawProb, prediction.awayProb].map(Number)) : 0;

  return (
    <div className="main-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1>Match Predictions</h1>
          <p>Data-driven match outcome predictions based on team statistics.</p>
        </div>
      </motion.div>

      <motion.div className="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <h3>Enter Team Statistics</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1rem" }}>
          <div>
            <h4>🏠 Home Team</h4>
            <input type="text" placeholder="Team name" value={homeTeam.name} onChange={(e) => setHomeTeam({ ...homeTeam, name: e.target.value })} className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} />
            <input type="number" placeholder="Win rate %" value={homeTeam.winrate} onChange={(e) => setHomeTeam({ ...homeTeam, winrate: Number(e.target.value) })} className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} />
            <input type="number" placeholder="Avg goals" value={homeTeam.avgGoals} onChange={(e) => setHomeTeam({ ...homeTeam, avgGoals: Number(e.target.value) })} className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} />
          </div>
          <div>
            <h4>✈️ Away Team</h4>
            <input type="text" placeholder="Team name" value={awayTeam.name} onChange={(e) => setAwayTeam({ ...awayTeam, name: e.target.value })} className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} />
            <input type="number" placeholder="Win rate %" value={awayTeam.winrate} onChange={(e) => setAwayTeam({ ...awayTeam, winrate: Number(e.target.value) })} className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} />
            <input type="number" placeholder="Avg goals" value={awayTeam.avgGoals} onChange={(e) => setAwayTeam({ ...awayTeam, avgGoals: Number(e.target.value) })} className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handlePredict} style={{ marginTop: "1rem" }}>🔮 Get Prediction</button>
      </motion.div>

      {prediction && (
        <motion.div className="card" style={{ marginTop: "2rem" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h3>Prediction Result</h3>
          <p style={{ margin: "1rem 0", textAlign: "center", fontWeight: 700, fontSize: "1.2rem", color: "var(--text-white)" }}>
            {prediction.homeName} vs {prediction.awayName}
          </p>
          <div className="prediction-bar">
            <motion.div className="prediction-segment" style={{ background: "var(--primary)" }} initial={{ width: 0 }} animate={{ width: `${prediction.homeProb}%` }}>
              {prediction.homeProb}%
            </motion.div>
            <motion.div className="prediction-segment" style={{ background: "var(--warning)" }} initial={{ width: 0 }} animate={{ width: `${prediction.drawProb}%` }}>
              {prediction.drawProb}%
            </motion.div>
            <motion.div className="prediction-segment" style={{ background: "var(--danger)" }} initial={{ width: 0 }} animate={{ width: `${prediction.awayProb}%` }}>
              {prediction.awayProb}%
            </motion.div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "1rem" }}>
            <span>{prediction.homeName} Win</span><span>Draw</span><span>{prediction.awayName} Win</span>
          </div>
          <div className="card" style={{ background: "var(--success-bg)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
            <p style={{ color: "var(--success)", fontWeight: 600, textAlign: "center" }}>
              Confidence: {confidence.toFixed(0)}% — {confidence > 50 ? "📈 High confidence prediction" : "📊 Low confidence - close match"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Predictions;