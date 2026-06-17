import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function buildData(rows = []) {
  const top = rows.slice(0, 10);
  return top.map((r) => ({
    match: r.team?.name || `Team ${r.position}`,
    form: Number(r.points || 0),
  }));
}

export default function FormTrendChart({ title = "Form Trend", data = [] }) {
  const chartData = buildData(data);
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="match" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="form" fill="#1a5c2a" name="Points" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
