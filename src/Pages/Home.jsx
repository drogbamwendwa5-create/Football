import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const FEATURES = [
  { icon: "📊", title: "League Standings", desc: "Real-time standings for 5 top European leagues with sorting and search." },
  { icon: "⚽", title: "Team Analytics", desc: "Deep performance analysis with radar charts, form trends, and statistics." },
  { icon: "📅", title: "Match Center", desc: "Live scores, fixtures, results, and detailed match statistics." },
  { icon: "🔄", title: "Team Comparison", desc: "Side-by-side comparison with radar and bar chart visualizations." },
  { icon: "🔮", title: "Predictions", desc: "Data-driven match outcome predictions based on team statistics." },
  { icon: "📈", title: "Statistics Hub", desc: "Comprehensive charts: goals, wins, form trends, and league comparison." },
];

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Professional Football Intelligence Platform
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            Analyze. Predict. Understand.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <Link to="/dashboard" className="btn btn-accent hero-cta">Explore Dashboard</Link>
            <Link to="/standings" className="btn btn-outline hero-cta secondary">View Standings</Link>
          </motion.div>
        </div>
        <div className="hero-bg-pattern"></div>
      </section>

      <section className="main-container">
        <motion.div className="stats-preview" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="stat-item"><span className="stat-value">5</span><span className="stat-label">Leagues</span></div>
          <div className="stat-item"><span className="stat-value">98</span><span className="stat-label">Teams</span></div>
          <div className="stat-item"><span className="stat-value">2,450</span><span className="stat-label">Matches</span></div>
          <div className="stat-item"><span className="stat-value">6,800</span><span className="stat-label">Players</span></div>
        </motion.div>
      </section>

      <section className="main-container">
        <div className="page-header">
          <h1>Platform Capabilities</h1>
          <p>Everything you need for football analysis</p>
        </div>
        <motion.div className="card-grid features-grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {FEATURES.map((f, i) => (
            <motion.div key={i} className="card feature-card" variants={item}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="main-container">
        <div className="page-header">
          <h1>Trending Teams</h1>
          <p>Most viewed and analyzed teams</p>
        </div>
        <motion.div className="card-grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {[
            { name: "Manchester City", league: "Premier League", crest: "🏆" },
            { name: "Real Madrid", league: "La Liga", crest: "👑" },
            { name: "Bayern Munich", league: "Bundesliga", crest: "⭐" },
            { name: "Inter Milan", league: "Serie A", crest: "🖤" },
            { name: "PSG", league: "Ligue 1", crest: "🔵" },
            { name: "Arsenal", league: "Premier League", crest: "🔴" },
          ].map((team, i) => (
            <motion.div key={i} className="card trending-card" variants={item}>
              <div className="trending-crest">{team.crest}</div>
              <h3>{team.name}</h3>
              <p>{team.league}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default Home;