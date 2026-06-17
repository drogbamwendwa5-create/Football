import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SummaryCard from "../Components/SummaryCard";
import GoalsChart from "../charts/GoalsChart";
import WinDistributionChart from "../charts/WinDistributionChart";
import FormTrendChart from "../charts/FormTrendChart";
import LeagueComparisonChart from "../charts/LeagueComparisonChart";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { getAllLeagueStandings } from "../services/footballApi";
import { exportToPdf } from "../utils/exportPdf";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Dashboard() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const all = await getAllLeagueStandings();
        if (active) setStandings(all);
      } catch {
        if (active) setError("Failed to load dashboard data.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  // Compute live summary stats
  const totalTeams = standings.length;
  const totalMatches = standings.reduce((sum, r) => sum + (r.playedGames || 0), 0);
  const totalGoals = standings.reduce((sum, r) => sum + (r.goalsFor || 0), 0);
  const avgGoals = totalMatches > 0
    ? ((totalGoals * 2) / totalMatches).toFixed(1)
    : "0";
  // totalGoals is one side's goals; multiply by 2 for both sides per match
  // but each match is counted twice in the standings (once per team), so:
  const matchesPlayed = Math.round(totalMatches / 2);
  const avgGoalsPerMatch = matchesPlayed > 0
    ? (totalGoals / matchesPlayed).toFixed(1)
    : "0";

  return (
    <div className="main-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <h1>Football Intelligence Dashboard</h1>
          <p>Central command center for football analytics.</p>
        </div>
        <button className="btn btn-outline" onClick={() => exportToPdf("dashboard-content", "football-dashboard.pdf")}>
          📄 Export PDF
        </button>
      </motion.div>

      {loading && <Loading message="Loading dashboard data across all leagues..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div id="dashboard-content">
          <motion.div className="card-grid" variants={container} initial="hidden" animate="show">
            <SummaryCard title="Matches Played" value={matchesPlayed.toLocaleString()} icon="⚽" />
            <SummaryCard title="Total Teams" value={totalTeams.toLocaleString()} icon="🏆" />
            <SummaryCard title="Leagues Tracked" value="5" icon="🌍" />
            <SummaryCard title="Avg Goals/Match" value={avgGoalsPerMatch} icon="🎯" />
          </motion.div>

          <motion.div className="charts-grid" variants={container} initial="hidden" animate="show">
            <motion.div variants={item}><GoalsChart title="Goals Analysis — Top Teams" data={standings} /></motion.div>
            <motion.div variants={item}><WinDistributionChart title="Win Distribution" data={standings} /></motion.div>
            <motion.div variants={item}><FormTrendChart title="Team Form — Points" data={standings} /></motion.div>
            <motion.div variants={item}><LeagueComparisonChart title="League Comparison" data={standings} /></motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;