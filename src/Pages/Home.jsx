import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getStandings } from "../services/footballApi";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const FEATURES = [
  { icon: "📊", title: "League Standings", desc: "Real-time standings for top leagues and the World Cup with official crests." },
  { icon: "⚽", title: "Team Analytics", desc: "Deep performance analysis with radar charts, form trends, and statistics." },
  { icon: "📅", title: "Match Center", desc: "Live scores, fixtures, results, and detailed match statistics." },
  { icon: "🌍", title: "World Cup Hub", desc: "Dedicated FIFA World Cup page with nations, groups, and fixtures." },
  { icon: "🔮", title: "Predictions", desc: "Data-driven match outcome predictions based on team statistics." },
  { icon: "📈", title: "Statistics Hub", desc: "Comprehensive charts: goals, wins, form trends, and league comparison." },
];

function Home() {
  const [trendingTeams, setTrendingTeams] = useState([]);

  useEffect(() => {
    getStandings("PL")
      .then((data) => {
        const topTeams = (data.standings?.[0]?.table || []).slice(0, 6);
        setTrendingTeams(
          topTeams.map((row) => ({
            id: row.team?.id,
            name: row.team?.name,
            league: "Premier League",
            crest: row.team?.crest,
            points: row.points,
          }))
        );
      })
      .catch(() => setTrendingTeams([]));
  }, []);

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
            <Link to="/world-cup" className="btn btn-outline hero-cta secondary">World Cup 2026</Link>
          </motion.div>
        </div>
        <div className="hero-bg-pattern"></div>
      </section>

      <section className="main-container">
        <motion.div className="stats-preview" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="stat-item"><span className="stat-value">6</span><span className="stat-label">Competitions</span></div>
          <div className="stat-item"><span className="stat-value">Live</span><span className="stat-label">API Data</span></div>
          <div className="stat-item"><span className="stat-value">Real</span><span className="stat-label">Team Crests</span></div>
          <div className="stat-item"><span className="stat-value">2026</span><span className="stat-label">World Cup</span></div>
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
          <h1>Top Premier League Teams</h1>
          <p>Current table leaders with official crests</p>
        </div>
        <motion.div className="card-grid" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {trendingTeams.map((team) => (
            <motion.div key={team.id} variants={item}>
              <Link to={`/team/${team.id}`} className="card trending-card">
                <div className="trending-crest">
                  {team.crest ? (
                    <img src={team.crest} alt={`${team.name} crest`} className="trending-crest-img" />
                  ) : (
                    "⚽"
                  )}
                </div>
                <h3>{team.name}</h3>
                <p>{team.league} · {team.points} pts</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default Home;
