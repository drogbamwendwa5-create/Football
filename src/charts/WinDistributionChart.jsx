import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#1a5c2a", "#dc3545", "#f5a623"];

function buildData(rows = []) {
  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;
  rows.forEach((r) => {
    const h = Number(r.goalsFor || 0);
    const a = Number(r.goalsAgainst || 0);
    if (h > a) homeWins += 1;
    else if (a > h) awayWins += 1;
    else draws += 1;
  });
  const total = Math.max(homeWins + awayWins + draws, 1);
  return [
    { name: "Home Win", value: Math.round((homeWins / total) * 100) },
    { name: "Away Win", value: Math.round((awayWins / total) * 100) },
    { name: "Draw", value: Math.round((draws / total) * 100) },
  ];
}

export default function WinDistributionChart({ title = "Win Distribution", data = [] }) {
  const chartData = buildData(data);
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
