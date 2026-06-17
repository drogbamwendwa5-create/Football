import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { findTeamById } from "../services/footballApi";

function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const found = await findTeamById(id);
        if (found) setTeam(found);
        else setError("Team not found.");
      } catch {
        setError("Failed to load team details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [id]);

  if (loading) return <div className="main-container"><Loading message="Loading team details..." /></div>;
  if (error) return <div className="main-container"><ErrorMessage message={error} /></div>;
  if (!team) return <div className="main-container"><ErrorMessage message="Team not found." /></div>;

  return (
    <div className="main-container">
      <div className="team-details">
        <div className="team-header">
          {team.crest && (
            <img src={team.crest} alt={`${team.name} crest`} className="team-detail-crest" />
          )}
          <div>
            <h1>{team.name}</h1>
            {team.shortName && <p style={{ color: "var(--text-light)" }}>{team.shortName}</p>}
            {team.tla && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{team.tla}</p>
            )}
          </div>
        </div>
        <div className="card-grid">
          {team.venue && (<div className="card"><h3>Stadium</h3><p>{team.venue}</p></div>)}
          {team.area?.name && (<div className="card"><h3>Country</h3><p>{team.area.name}</p></div>)}
          {team.clubColors && (<div className="card"><h3>Colors</h3><p>{team.clubColors}</p></div>)}
          {team.founded && (<div className="card"><h3>Founded</h3><p>{team.founded}</p></div>)}
          {team.website && (
            <div className="card">
              <h3>Website</h3>
              <p>
                <a href={team.website} target="_blank" rel="noopener noreferrer">
                  {team.website.replace(/^https?:\/\//, "")}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;
