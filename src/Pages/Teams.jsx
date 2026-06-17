import { useState, useEffect } from "react";
import LeagueSelector from "../Components/LeagueSelector";
import TeamCard from "../Components/TeamCard";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { getTeams } from "../services/footballApi";

function Teams() {
  const [league, setLeague] = useState("PL");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTeams(league);
        setTeams(data.teams || []);
      } catch (err) {
        setError("Failed to load teams.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [league]);

  return (
    <div className="main-container">
      <div className="page-header">
        <h1>Teams</h1>
        <p>Browse teams from top European football leagues.</p>
      </div>
      <LeagueSelector onSelect={setLeague} selected={league} />
      {loading && <Loading message="Loading teams..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="card-grid">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;