import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";

const data = [
  { stat: "Attack", teamA: 80, teamB: 65 },
  { stat: "Defense", teamA: 70, teamB: 75 },
  { stat: "Possession", teamA: 85, teamB: 60 },
  { stat: "Passing", teamA: 75, teamB: 70 },
  { stat: "Speed", teamA: 60, teamB: 80 },
];

export default function RadarComparison({ title = "Team Comparison Radar" }) {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Team A" dataKey="teamA" stroke="#1a5c2a" fill="#1a5c2a" fillOpacity={0.3} />
          <Radar name="Team B" dataKey="teamB" stroke="#f5a623" fill="#f5a623" fillOpacity={0.3} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}