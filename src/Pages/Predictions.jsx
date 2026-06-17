import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { predictMatch } from "../utils/predictionEngine";
import { getStandings } from "../services/footballApi";

import { LEAGUE_NAMES } from "../constants/leagues";

const LEAGUES = LEAGUE_NAMES;

function Predictions() {
  const [league, setLeague] = useState("PL");
  const [standings, setStandings] = useState([]);
  const [homeId, setHomeId] = useState("");
  const [awayId, setAwayId] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    getStandings(league).then((res) => {
      const table = res?.standings?.[0]?.table || [];
      const teams = table.map((r) => {
        const played = Math.max(r.playedGames || 1, 1);
        const won = r.won || 0;
        const goalsFor = r.goalsFor || 0;
        return {
          id: String(r.team.id),
          name: r.team.name,
          winrate: Math.round((won / played) * 1000) / 10,
          avgGoals: Math.round((goalsFor / played) * 100) / 100,
        };
      });
      if (active) {
        setStandings(teams);
        setHomeId((prev) => prev || (teams[0]?.id || ""));
        setAwayId((prev) => prev || (teams[1]?.id || ""));
        setLoaded(true);
      }
    });
    return () => { active = false; };
  }, [league]);

  const homeTeam = standings.find((t) => t.id === homeId) || standings[0];
  const awayTeam = standings.find((t) => t.id === awayId) || standings[1];

  useEffect(() => {
    if (!homeTeam || !awayTeam) return;
    if (homeTeam.id === awayTeam.id) return;
    const result = predictMatch(homeTeam, awayTeam);
    setPrediction({ ...result, homeName: homeTeam.name, awayName: awayTeam.name });
  }, [homeId, awayId, league, loaded]);

  const confidence = prediction ? Math.max(...[prediction.homeProb, prediction.drawProb, prediction.awayProb].map(Number)) : 0;

  return (
    <div className="main-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1>Match Predictions</h1>
          <p>Automated data-driven predictions from current league standings.</p>
        </div>
      </motion.div>

      <motion.div className="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="league-selector" style={{ marginBottom: "1rem" }}>
          {Object.entries(LEAGUES).filter(([key]) => key !== "WC").map(([key, label]) => (
            <button key={key} className={`league-btn ${league === key ? "active" : ""}`} onClick={() => setLeague(key)}>
              {label}
            </button>
          ))}
        </div>

        <h3>Select Teams</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "0.8rem" }}>
          <div>
            <h4>🏠 Home Team</h4>
            <select className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} value={homeId} onChange={(e) => setHomeId(e.target.value)}>
              {standings.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>Win Rate: {homeTeam?.winrate ?? 0}% | Avg Goals: {homeTeam?.avgGoals ?? 0}</p>
          </div>
          <div>
            <h4>✈️ Away Team</h4>
            <select className="comparison-input" style={{ width: "100%", margin: "0.5rem 0" }} value={awayId} onChange={(e) => setAwayId(e.target.value)}>
              {standings.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>Win Rate: {awayTeam?.winrate ?? 0}% | Avg Goals: {awayTeam?.avgGoals ?? 0}</p>
          </div>
        </div>
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
