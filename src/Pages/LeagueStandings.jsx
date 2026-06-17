import { useState, useEffect } from "react";
import LeagueSelector from "../Components/LeagueSelector";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { getStandings } from "../services/footballApi";

function LeagueStandings() {
  const [league, setLeague] = useState("PL");
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStandings(league);
        setStandings(data.standings?.[0]?.table || []);
      } catch (err) {
        setError("Failed to load standings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, [league]);

  return (
    <div className="main-container">
      <div className="page-header">
        <h1>League Standings</h1>
        <p>Current standings for top European football leagues.</p>
      </div>
      <LeagueSelector onSelect={setLeague} selected={league} />
      {loading && <Loading message="Loading standings..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && standings.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Drawn</th>
              <th>Lost</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr key={row.team?.id || row.position}>
                <td><strong>{row.position}</strong></td>
                <td>{row.team?.name || "Unknown"}</td>
                <td>{row.playedGames}</td>
                <td>{row.won}</td>
                <td>{row.draw}</td>
                <td>{row.lost}</td>
                <td>{row.goalsFor}</td>
                <td>{row.goalsAgainst}</td>
                <td>{row.goalDifference}</td>
                <td><strong>{row.points}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeagueStandings;