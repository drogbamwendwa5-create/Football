import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "PL", goals: 2.8, cards: 3.2 },
  { name: "PD", goals: 2.5, cards: 4.1 },
  { name: "BL1", goals: 3.1, cards: 2.9 },
  { name: "SA", goals: 2.3, cards: 3.8 },
  { name: "FL1", goals: 2.6, cards: 3.5 },
];

export default function LeagueComparisonChart({ title = "League Comparison" }) {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="goals" fill="#1a5c2a" name="Avg Goals" />
          <Bar dataKey="cards" fill="#f5a623" name="Avg Cards" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}