import { useState, useEffect } from "react";
import LeagueSelector from "../Components/LeagueSelector";
import MatchCard from "../Components/MatchCard";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { getMatches } from "../services/footballApi";

function MatchCenter() {
  const [league, setLeague] = useState("PL");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMatches(league);
        setMatches(data.matches || []);
      } catch (err) {
        setError(err.message || "Failed to load matches.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [league]);

  return (
    <div className="main-container">
      <div className="page-header">
        <h1>Match Center</h1>
        <p>Live scores, fixtures, and match results.</p>
      </div>
      <LeagueSelector onSelect={setLeague} selected={league} />
      {loading && <Loading message="Loading matches..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="card-grid">
          {matches.slice(0, 20).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchCenter;