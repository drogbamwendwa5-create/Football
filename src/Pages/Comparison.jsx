import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RadarComparison from "../charts/RadarComparison";
import LeagueComparisonChart from "../charts/LeagueComparisonChart";
import LeagueSelector from "../Components/LeagueSelector";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { getStandings } from "../services/footballApi";

function Comparison() {
  const [league, setLeague] = useState("PL");
  const [standings, setStandings] = useState([]);
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStandings(league);
        const table = data?.standings?.[0]?.table || [];
        if (active) {
          setStandings(table);
          setTeam1Id(String(table[0]?.team?.id || ""));
          setTeam2Id(String(table[1]?.team?.id || ""));
        }
      } catch {
        if (active) setError("Failed to load standings.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [league]);

  const team1Row = standings.find((r) => String(r.team?.id) === team1Id);
  const team2Row = standings.find((r) => String(r.team?.id) === team2Id);

  const stats = team1Row && team2Row
    ? [
        { label: "Position", t1: team1Row.position, t2: team2Row.position },
        { label: "Matches Played", t1: team1Row.playedGames, t2: team2Row.playedGames },
        { label: "Wins", t1: team1Row.won, t2: team2Row.won },
        { label: "Draws", t1: team1Row.draw, t2: team2Row.draw },
        { label: "Losses", t1: team1Row.lost, t2: team2Row.lost },
        { label: "Goals For", t1: team1Row.goalsFor, t2: team2Row.goalsFor },
        { label: "Goals Against", t1: team1Row.goalsAgainst, t2: team2Row.goalsAgainst },
        { label: "Goal Difference", t1: team1Row.goalDifference > 0 ? `+${team1Row.goalDifference}` : team1Row.goalDifference, t2: team2Row.goalDifference > 0 ? `+${team2Row.goalDifference}` : team2Row.goalDifference },
        { label: "Points", t1: team1Row.points, t2: team2Row.points },
      ]
    : [];

  // Build radar data from real stats
  function normalize(val, max) {
    return max > 0 ? Math.round((val / max) * 100) : 0;
  }

  const radarData = team1Row && team2Row
    ? (() => {
        const maxPlayed = Math.max(team1Row.playedGames, team2Row.playedGames, 1);
        const maxGoals = Math.max(team1Row.goalsFor, team2Row.goalsFor, 1);
        const maxPoints = Math.max(team1Row.points, team2Row.points, 1);
        const maxWins = Math.max(team1Row.won, team2Row.won, 1);
        // Defense: fewer goals against = better, so invert
        const maxGA = Math.max(team1Row.goalsAgainst, team2Row.goalsAgainst, 1);
        return [
          { stat: "Attack", teamA: normalize(team1Row.goalsFor, maxGoals), teamB: normalize(team2Row.goalsFor, maxGoals) },
          { stat: "Defense", teamA: normalize(maxGA - team1Row.goalsAgainst, maxGA), teamB: normalize(maxGA - team2Row.goalsAgainst, maxGA) },
          { stat: "Win Rate", teamA: normalize(team1Row.won, maxWins), teamB: normalize(team2Row.won, maxWins) },
          { stat: "Points", teamA: normalize(team1Row.points, maxPoints), teamB: normalize(team2Row.points, maxPoints) },
          { stat: "Goal Diff", teamA: Math.max(0, Math.min(100, 50 + team1Row.goalDifference)), teamB: Math.max(0, Math.min(100, 50 + team2Row.goalDifference)) },
        ];
      })()
    : [];

  const team1Name = team1Row?.team?.name || "Team A";
  const team2Name = team2Row?.team?.name || "Team B";

  return (
    <div className="main-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1>Team Comparison</h1>
          <p>Compare real statistics between two teams side-by-side.</p>
        </div>

        <LeagueSelector onSelect={(id) => { setLeague(id); }} selected={league} />

        {loading && <Loading message="Loading team data..." />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && standings.length > 0 && (
          <div className="comparison-inputs">
            <select
              className="comparison-input"
              value={team1Id}
              onChange={(e) => setTeam1Id(e.target.value)}
            >
              {standings.map((r) => (
                <option key={r.team?.id} value={String(r.team?.id)}>
                  {r.team?.name}
                </option>
              ))}
            </select>
            <span className="comparison-vs">VS</span>
            <select
              className="comparison-input"
              value={team2Id}
              onChange={(e) => setTeam2Id(e.target.value)}
            >
              {standings.map((r) => (
                <option key={r.team?.id} value={String(r.team?.id)}>
                  {r.team?.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </motion.div>

      {!loading && !error && stats.length > 0 && (
        <div className="comparison-content">
          <motion.div className="card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <h3>Statistical Comparison</h3>
            <div className="comparison-grid">
              <h3 style={{ textAlign: "right" }}>{team1Name}</h3>
              <h3 style={{ color: "var(--accent-light)" }}>Stat</h3>
              <h3>{team2Name}</h3>
            </div>
            {stats.map((s) => (
              <div key={s.label} className="comparison-stat">
                <span style={{ fontWeight: 700, color: "var(--text-white)" }}>{s.t1}</span>
                <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: "var(--text-white)" }}>{s.t2}</span>
              </div>
            ))}
          </motion.div>

          <RadarComparison
            title="Team Comparison Radar"
            data={radarData}
            teamAName={team1Name}
            teamBName={team2Name}
          />
          <LeagueComparisonChart title="League Scoring Comparison" />
        </div>
      )}
    </div>
  );
}

export default Comparison;