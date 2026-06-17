import { useState } from "react";

const LEAGUES = [
  { id: "PL", name: "Premier League" },
  { id: "PD", name: "La Liga" },
  { id: "BL1", name: "Bundesliga" },
  { id: "SA", name: "Serie A" },
  { id: "FL1", name: "Ligue 1" },
];

function LeagueSelector({ onSelect, selected = "PL" }) {
  const [activeLeague, setActiveLeague] = useState(selected);

  const handleSelect = (leagueId) => {
    setActiveLeague(leagueId);
    if (onSelect) onSelect(leagueId);
  };

  return (
    <div className="league-selector">
      {LEAGUES.map((league) => (
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