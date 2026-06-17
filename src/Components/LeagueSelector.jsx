import { useState, useEffect } from "react";
import { LEAGUES } from "../constants/leagues";

function LeagueSelector({ onSelect, selected = "PL", leagues = LEAGUES }) {
  const [activeLeague, setActiveLeague] = useState(selected);

  useEffect(() => {
    setActiveLeague(selected);
  }, [selected]);

  const handleSelect = (leagueId) => {
    setActiveLeague(leagueId);
    if (onSelect) onSelect(leagueId);
  };

  return (
    <div className="league-selector">
      {leagues.map((league) => (
        <button
          key={league.id}
          className={`league-btn ${activeLeague === league.id ? "active" : ""}`}
          onClick={() => handleSelect(league.id)}
        >
          {league.name}
        </button>
      ))}
    </div>
  );
}

export default LeagueSelector;
