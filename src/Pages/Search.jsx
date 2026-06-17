import { useState } from "react";
import SearchBar from "../Components/SearchBar";
import { getTeams } from "../services/footballApi";

function Search() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    setSearched(true);
    try {
      const leagues = ["PL", "PD", "BL1", "SA", "FL1"];
      const allTeams = await Promise.all(
        leagues.map((league) => getTeams(league).catch(() => ({ teams: [] })))
      );
      const flat = allTeams.flatMap((data) => data.teams || []);
      const filtered = flat.filter((team) =>
        team.name?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 20));
    } catch {
      setResults([]);
    }
  };

  return (
    <div className="main-container">
      <div className="page-header">
        <h1>Search</h1>
        <p>Search for teams across all leagues.</p>
      </div>
      <SearchBar onSearch={handleSearch} placeholder="Search teams..." />
      {searched && results.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-light)", marginTop: "2rem" }}>
          No teams found matching your search.
        </p>
      )}
      {results.length > 0 && (
        <div className="card-grid">
          {results.map((team) => (
            <div key={team.id} className="team-card" onClick={() => window.location.href = `/team/${team.id}`}>
              {team.crest && <img src={team.crest} alt={team.name} />}
              <h4>{team.name}</h4>
              {team.area?.name && <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>{team.area.name}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;