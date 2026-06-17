import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GoalsChart from "../charts/GoalsChart";
import WinDistributionChart from "../charts/WinDistributionChart";
import FormTrendChart from "../charts/FormTrendChart";
import LeagueComparisonChart from "../charts/LeagueComparisonChart";
import { getStandings } from "../services/footballApi";

const LEAGUES = ["PL", "PD", "BL1", "SA", "FL1"];

function best(list, n, getVal) {
  return list.slice().sort(getVal).slice(0, n);
}

function Statistics() {
  const [standings, setStandings] = useState([]);
  const [topTeams, setTopTeams] = useState([]);
  const [bestDefenses, setBestDefenses] = useState([]);
  const [bestAttacks, setBestAttacks] = useState([]);
  const [topLeagues, setTopLeagues] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const all = [];
      for (const lg of LEAGUES) {
        const res = await getStandings(lg);
        const table = res?.standings?.[0]?.table || [];
        if (active) all.push(...table.map((r) => ({ ...r, league: lg })));
      }
      if (!active) return;
      const flat = all.filter((r) => r.team);
      setTopTeams(best(flat, 5, (a, b) => (b.points || 0) - (a.points || 0)).map((r) => ({ name: r.team.name, value: `${r.points || 0} pts` })));
      setBestDefenses(best(flat, 5, (a, b) => (a.goalsAgainst || 999) - (b.goalsAgainst || 999)).map((r) => ({ name: r.team.name, value: `${r.goalsAgainst || 0} conceded` })));
      setBestAttacks(best(flat, 5, (a, b) => (b.goalsFor || 0) - (a.goalsFor || 0)).map((r) => ({ name: r.team.name, value: `${r.goalsFor || 0} goals` })));
      const leagueStats = all.map((r) => ({ league: r.league, goalsFor: r.goalsFor || 0, played: Math.max(r.playedGames || 1, 1) }));
      const grouped = leagueStats.reduce((acc, cur) => { acc[cur.league] = (acc[cur.league] || 0) + cur.goalsFor; acc[cur.league + "_played"] = (acc[cur.league + "_played"] || 0) + cur.played; return acc; }, {});
      const leagueAvgs = LEAGUES.map((lg) => ({ league: lg, avg: grouped[lg + "_played"] ? grouped[lg] / grouped[lg + "_played"] : 0 })).sort((a, b) => b.avg - a.avg);
      setTopLeagues(leagueAvgs.map((r) => ({ name: r.league, value: `${r.avg.toFixed(1)} goals/match` })));
      setStandings(all);
    };
    load();
    return () => { active = false; };
  }, []);

  const list = (arr) => arr.map((item, idx) => (
    <li key={idx} className="stat-list-item">{item.name} — <strong>{item.value}</strong></li>
  ));

  return (
    <div className="main-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1>Statistics Hub</h1>
          <p>Comprehensive football statistics and data visualizations.</p>
        </div>
      </motion.div>

      <motion.div className="charts-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }}>
        <GoalsChart title="Goals Analysis - Per Match" data={standings} />
        <WinDistributionChart title="Win Distribution" data={standings} />
        <FormTrendChart title="Team Form Trends" data={standings} />
        <LeagueComparisonChart title="League Comparison" data={standings} />
      </motion.div>

      <div className="card-grid" style={{ marginTop: "2rem" }}>
        <div className="card">
          <h3>🏆 Best Teams</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>{list(topTeams)}</ul>
        </div>
        <div className="card">
          <h3>🛡️ Best Defenses</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>{list(bestDefenses)}</ul>
        </div>
        <div className="card">
          <h3>⚡ Best Attacks</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>{list(bestAttacks)}</ul>
        </div>
        <div className="card">
          <h3>🎯 Top Scorers League</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>{list(topLeagues)}</ul>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
