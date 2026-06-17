function MatchCard({ match }) {
  if (!match) return null;

  const {
    homeTeam = { name: "TBD" },
    awayTeam = { name: "TBD" },
    score = {},
    status = "SCHEDULED",
    utcDate,
    stage,
  } = match;

  const homeScore = score.fullTime?.home ?? score.halfTime?.home ?? "-";
  const awayScore = score.fullTime?.away ?? score.halfTime?.away ?? "-";

  const statusLabel =
    status === "FINISHED"
      ? "Full Time"
      : status === "TIMED" || status === "SCHEDULED"
        ? utcDate
          ? new Date(utcDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Scheduled"
        : status.replace(/_/g, " ");

  return (
    <div className="match-card">
      {stage && (
        <p className="match-stage">{stage.replace(/_/g, " ")}</p>
      )}
      <div className="match-teams">
        <div className="match-team">
          {homeTeam.crest && (
            <img src={homeTeam.crest} alt="" className="match-crest" />
          )}
          <h4>{homeTeam.name}</h4>
        </div>
        <div className="match-score">
          {status === "FINISHED" ? `${homeScore} - ${awayScore}` : "vs"}
        </div>
        <div className="match-team">
          {awayTeam.crest && (
            <img src={awayTeam.crest} alt="" className="match-crest" />
          )}
          <h4>{awayTeam.name}</h4>
        </div>
      </div>
      <p className="match-status">{statusLabel}</p>
    </div>
  );
}

export default MatchCard;
