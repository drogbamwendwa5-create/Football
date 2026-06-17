import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Match 1", home: 2, away: 1 },
  { name: "Match 2", home: 3, away: 2 },
  { name: "Match 3", home: 1, away: 1 },
  { name: "Match 4", home: 4, away: 0 },
  { name: "Match 5", home: 2, away: 3 },
  { name: "Match 6", home: 1, away: 2 },
];

export default function GoalsChart({ title = "Goals Trend" }) {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="home" stroke="#1a5c2a" name="Home Goals" />
          <Line type="monotone" dataKey="away" stroke="#f5a623" name="Away Goals" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}