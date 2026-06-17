import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function buildChartData(rows) {
  const top = (rows || []).slice(0, 12);
  return top.map((r) => ({
    name: r.team?.name || `Team ${r.team?.id || r.position}`,
    home: Number(r.goalsFor || 0),
    away: Number(r.goalsAgainst || 0),
  }));
}

export default function GoalsChart({ title = "Goals Trend", data = [] }) {
  const chartData = buildChartData(data);
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="home" stroke="#1a5c2a" name="Goals For" />
          <Line type="monotone" dataKey="away" stroke="#f5a623" name="Goals Against" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
