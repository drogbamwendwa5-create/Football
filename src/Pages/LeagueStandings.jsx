import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        const tables = data.standings || [];
        setStandings(tables[0]?.table || []);
      } catch (err) {
        setError(err.message || "Failed to load standings. Please try again later.");
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
        <p>Live standings with official team crests from football-data.org.</p>
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
                <td>
                  <Link to={`/team/${row.team?.id}`} className="table-team-cell table-team-link">
                    {row.team?.crest && (
                      <img src={row.team.crest} alt="" className="table-crest" />
                    )}
                    <span>{row.team?.name || "Unknown"}</span>
                  </Link>
                </td>
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
      {!loading && !error && standings.length === 0 && (
        <p className="empty-message">No standings available for this competition.</p>
      )}
    </div>
  );
}

export default LeagueStandings;
