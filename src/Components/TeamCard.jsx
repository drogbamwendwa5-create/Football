import { useNavigate } from "react-router-dom";

function TeamCard({ team }) {
  const navigate = useNavigate();

  if (!team) return null;

  return (
    <div className="team-card" onClick={() => navigate(`/team/${team.id}`)}>
      {team.crest && (
        <img
          src={team.crest}
          alt={`${team.name} crest`}
          className="team-crest"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      <h4>{team.name}</h4>
      {team.venue && (
        <p style={{ fontSize: "0.85rem", color: "var(--text)", marginTop: "0.3rem", fontWeight: 500 }}>
          {team.venue}
        </p>
      )}
    </div>
  );
}

export default TeamCard;