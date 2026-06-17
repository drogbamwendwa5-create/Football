import { motion } from "framer-motion";
import GoalsChart from "../charts/GoalsChart";
import WinDistributionChart from "../charts/WinDistributionChart";
import FormTrendChart from "../charts/FormTrendChart";
import LeagueComparisonChart from "../charts/LeagueComparisonChart";

function Statistics() {
  return (
    <div className="main-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1>Statistics Hub</h1>
          <p>Comprehensive football statistics and data visualizations.</p>
        </div>
      </motion.div>

      <motion.div className="charts-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }}>
        <GoalsChart title="Goals Analysis - Per Match" />
        <WinDistributionChart title="Win Distribution" />
        <FormTrendChart title="Team Form Trends" />
        <LeagueComparisonChart title="League Comparison" />
      </motion.div>

      <div className="card-grid" style={{ marginTop: "2rem" }}>
        <div className="card">
          <h3>🏆 Best Teams</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Manchester City — <strong>90 pts</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Real Madrid — <strong>93 pts</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Bayern Munich — <strong>82 pts</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Inter Milan — <strong>93 pts</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", color: "var(--text)" }}>PSG — <strong>80 pts</strong></li>
          </ul>
        </div>
        <div className="card">
          <h3>🛡️ Best Defenses</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Inter Milan — <strong>22 conceded</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Real Madrid — <strong>26 conceded</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Juventus — <strong>30 conceded</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Bayern Munich — <strong>32 conceded</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", color: "var(--text)" }}>Manchester City — <strong>34 conceded</strong></li>
          </ul>
        </div>
        <div className="card">
          <h3>⚡ Best Attacks</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Manchester City — <strong>96 goals</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Bayern Munich — <strong>91 goals</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Arsenal — <strong>88 goals</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Real Madrid — <strong>87 goals</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", color: "var(--text)" }}>PSG — <strong>86 goals</strong></li>
          </ul>
        </div>
        <div className="card">
          <h3>🎯 Top Scorers League</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Bundesliga — <strong>2.1 goals/match</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Premier League — <strong>1.8 goals/match</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>La Liga — <strong>1.6 goals/match</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)", color: "var(--text)" }}>Ligue 1 — <strong>1.5 goals/match</strong></li>
            <li className="stat-list-item" style={{ padding: "0.5rem 0", color: "var(--text)" }}>Serie A — <strong>1.5 goals/match</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Statistics;