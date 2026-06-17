import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LEAGUES = ["PL", "PD", "BL1", "SA", "FL1"];

function buildData(rows = []) {
  const grouped = {};
  rows.forEach((r) => {
    const lg = r.league;
    if (!lg) return;
    if (!grouped[lg]) grouped[lg] = { goals: 0, played: 0 };
    grouped[lg].goals += Number(r.goalsFor || 0) + Number(r.goalsAgainst || 0);
    grouped[lg].played += Math.max(Number(r.playedGames || 1), 1);
  });
  return LEAGUES.map((lg) => {
    const g = grouped[lg] || { goals: 0, played: 1 };
    return { name: lg, goals: Number((g.goals / g.played).toFixed(2)), cards: 0 };
  });
}

export default function LeagueComparisonChart({ title = "League Comparison", data = [] }) {
  const chartData = buildData(data);
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="goals" fill="#1a5c2a" name="Avg Goals/Match" />
          <Bar dataKey="cards" fill="#f5a623" name="Avg Cards/Match" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
