import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { match: "Match 1", form: 3 },
  { match: "Match 2", form: 1 },
  { match: "Match 3", form: 0 },
  { match: "Match 4", form: 3 },
  { match: "Match 5", form: 3 },
  { match: "Match 6", form: 1 },
];

export default function FormTrendChart({ title = "Form Trend" }) {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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