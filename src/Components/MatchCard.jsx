function MatchCard({ match }) {
  if (!match) return null;

  const {
    homeTeam = { name: "TBD" },
    awayTeam = { name: "TBD" },
    score = {},
    status = "SCHEDULED",
  } = match;

  const homeScore = score.fullTime?.home ?? score.halfTime?.home ?? "-";
  const awayScore = score.fullTime?.away ?? score.halfTime?.away ?? "-";

  return (
    <div className="match-card">
      <div className="match-teams">
        <div className="match-team">
          <h4>{homeTeam.name}</h4>
        </div>
        <div className="match-score">
          {status === "FINISHED" ? `${homeScore} - ${awayScore}` : "vs"}
        </div>
        <div className="match-team">
          <h4>{awayTeam.name}</h4>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-light)" }}>
        {status === "FINISHED" ? "Full Time" : status === "TIMED" ? "Scheduled" : status}
      </p>
    </div>
  );
}

export default MatchCard;