import { motion } from "framer-motion";
import SummaryCard from "../Components/SummaryCard";
import GoalsChart from "../charts/GoalsChart";
import WinDistributionChart from "../charts/WinDistributionChart";
import FormTrendChart from "../charts/FormTrendChart";
import LeagueComparisonChart from "../charts/LeagueComparisonChart";
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

      <div id="dashboard-content">
        <motion.div className="card-grid" variants={container} initial="hidden" animate="show">
          <SummaryCard title="Total Matches" value="2,450" icon="⚽" />
          <SummaryCard title="Total Teams" value="98" icon="🏆" />
          <SummaryCard title="Total Leagues" value="5" icon="🌍" />
          <SummaryCard title="Average Goals" value="2.4" icon="🎯" />
        </motion.div>

        <motion.div className="charts-grid" variants={container} initial="hidden" animate="show">
          <motion.div variants={item}><GoalsChart title="Goals Analysis - Per Match" /></motion.div>
          <motion.div variants={item}><WinDistributionChart title="Win Distribution" /></motion.div>
          <motion.div variants={item}><FormTrendChart title="Team Form Trends" /></motion.div>
          <motion.div variants={item}><LeagueComparisonChart title="League Comparison" /></motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;