import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import MatchCard from "../Components/MatchCard";
import { getCompetition, getTeams, getStandings, getMatches } from "../services/footballApi";
import { WORLD_CUP } from "../constants/leagues";

function formatGroupName(group) {
  if (!group) return "Overall";
  return group.replace("GROUP_", "Group ");
}

function WorldCup() {
  const [competition, setCompetition] = useState(null);
  const [teams, setTeams] = useState([]);
  const [standings, setStandings] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("teams");

  useEffect(() => {
    const fetchWorldCupData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [compData, teamsData, standingsData, matchesData] = await Promise.all([
          getCompetition(WORLD_CUP.id),
          getTeams(WORLD_CUP.id),
          getStandings(WORLD_CUP.id),
          getMatches(WORLD_CUP.id),
        ]);

        setCompetition(compData);
        setTeams(teamsData.teams || []);
        setStandings(standingsData.standings || []);
        setMatches(matchesData.matches || []);
      } catch (err) {
        setError(err.message || "Failed to load World Cup data. Check your API key and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorldCupData();
  }, []);

  const upcomingMatches = matches
    .filter((match) => match.status === "SCHEDULED" || match.status === "TIMED")
    .slice(0, 8);

  const recentMatches = matches
    .filter((match) => match.status === "FINISHED")
    .slice(-8)
    .reverse();

  if (loading) {
    return (
      <div className="main-container">
        <Loading message="Loading World Cup data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="world-cup-page">
      <section className="world-cup-hero">
        <motion.div
          className="world-cup-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="world-cup-badge">FIFA {WORLD_CUP.season}</span>
          <h1>{competition?.name || "FIFA World Cup"}</h1>
          <p>
            {competition?.area?.name || "International"} · {teams.length} nations ·{" "}
            {matches.length} matches
          </p>
          {competition?.currentSeason?.startDate && (
            <p className="world-cup-dates">
              {new Date(competition.currentSeason.startDate).toLocaleDateString()} –{" "}
              {new Date(competition.currentSeason.endDate).toLocaleDateString()}
            </p>
          )}
        </motion.div>
      </section>

      <div className="main-container">
        <div className="world-cup-stats">
          <div className="card summary-stat">
            <span className="stat-value">{teams.length}</span>
            <span className="stat-label">Teams</span>
          </div>
          <div className="card summary-stat">
            <span className="stat-value">{standings.length}</span>
            <span className="stat-label">Groups</span>
          </div>
          <div className="card summary-stat">
            <span className="stat-value">{matches.length}</span>
            <span className="stat-label">Matches</span>
          </div>
          <div className="card summary-stat">
            <span className="stat-value">{upcomingMatches.length}</span>
            <span className="stat-label">Upcoming</span>
          </div>
        </div>

        <div className="world-cup-tabs">
          {["teams", "groups", "fixtures"].map((tab) => (
            <button
              key={tab}
              className={`league-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "teams" ? "Teams" : tab === "groups" ? "Group Standings" : "Fixtures"}
            </button>
          ))}
        </div>

        {activeTab === "teams" && (
          <div className="card-grid world-cup-teams-grid">
            {teams.map((team) => (
              <Link key={team.id} to={`/team/${team.id}`} className="team-card world-cup-team-card">
                {team.crest && (
                  <img src={team.crest} alt={`${team.name} crest`} className="team-crest" />
                )}
                <h4>{team.name}</h4>
                {team.area?.name && (
                  <p className="team-meta">{team.area.name}</p>
                )}
              </Link>
            ))}
          </div>
        )}

        {activeTab === "groups" && (
          <div className="world-cup-groups">
            {standings.length > 0 ? (
              standings.map((group) => (
                <div key={group.group || "overall"} className="card world-cup-group-card">
                  <h3>{formatGroupName(group.group)}</h3>
                  <table className="data-table compact-table">
                    <thead>
                      <tr>
                        <th>Pos</th>
                        <th>Team</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(group.table || []).map((row) => (
                        <tr key={row.team?.id || row.position}>
                          <td><strong>{row.position}</strong></td>
                          <td>
                            <div className="table-team-cell">
                              {row.team?.crest && (
                                <img src={row.team.crest} alt="" className="table-crest" />
                              )}
                              <span>{row.team?.name}</span>
                            </div>
                          </td>
                          <td>{row.playedGames}</td>
                          <td>{row.won}</td>
                          <td>{row.draw}</td>
                          <td>{row.lost}</td>
                          <td>{row.goalDifference}</td>
                          <td><strong>{row.points}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p className="empty-message">Group standings will appear once the tournament begins.</p>
            )}
          </div>
        )}

        {activeTab === "fixtures" && (
          <>
            {upcomingMatches.length > 0 && (
              <section className="world-cup-section">
                <h2>Upcoming Matches</h2>
                <div className="card-grid">
                  {upcomingMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {recentMatches.length > 0 && (
              <section className="world-cup-section">
                <h2>Recent Results</h2>
                <div className="card-grid">
                  {recentMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {upcomingMatches.length === 0 && recentMatches.length === 0 && (
              <p className="empty-message">Fixtures will appear as the tournament schedule is confirmed.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WorldCup;
