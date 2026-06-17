import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import { getTeamsAcrossLeagues } from "../services/footballApi";

function Search() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    setSearched(true);
    try {
      const flat = await getTeamsAcrossLeagues();
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
        <p>Search for teams across all leagues and the World Cup.</p>
      </div>
      <SearchBar onSearch={handleSearch} placeholder="Search teams..." />
      {searched && results.length === 0 && (
        <p className="empty-message">No teams found matching your search.</p>
      )}
      {results.length > 0 && (
        <div className="card-grid">
          {results.map((team) => (
            <Link key={team.id} to={`/team/${team.id}`} className="team-card">
              {team.crest && <img src={team.crest} alt={team.name} className="team-crest" />}
              <h4>{team.name}</h4>
              {team.area?.name && <p className="team-meta">{team.area.name}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
