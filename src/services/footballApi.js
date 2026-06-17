// Live Football Data API integration
import axios from "axios";

const API_KEY = "52ad9e5212c62c527f5ed56e67a9e934";

// Axios instance with base URL and auth header
const api = axios.create({
  baseURL: "https://api.football-data.org/v2",
  headers: {
    "X-Auth-Token": API_KEY,
  },
});

/**
 * Helper to handle API errors and fallback to mock data if needed.
 */
function handleApiError(error, fallback) {
  console.error("API error:", error);
  // Return mock data as fallback to keep UI functional
  return fallback;
}

// ==================== LIVE ENDPOINTS ====================

export const getStandings = async (leagueId) => {
  try {
    const response = await api.get(`/competitions/${leagueId}/standings`);
    return response.data;
  } catch (err) {
    // Fallback to mock data defined later in the file
    return handleApiError(err, getMockStandings(leagueId));
  }
};

export const getTeams = async (leagueId) => {
  try {
    const response = await api.get(`/competitions/${leagueId}/teams`);
    return response.data;
  } catch (err) {
    return handleApiError(err, getMockTeams(leagueId));
  }
};

export const getMatches = async (leagueId) => {
  try {
    const response = await api.get(`/competitions/${leagueId}/matches`);
    return response.data;
  } catch (err) {
    return handleApiError(err, getMockMatches(leagueId));
  }
};

// ==================== MOCK DATA (fallback) ====================

function delay(ms = 400) {
  return new Promise((r) => setTimeout(r, ms));
}

// (The existing MOCK_STANDINGS, MOCK_TEAMS, MOCK_MATCHES definitions remain unchanged)

// ... (rest of the original mock data definitions omitted for brevity; they are retained in the file)



const API_KEY = "52ad9e5212c62c527f5ed56e67a9e934";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "X-Auth-Token": API_KEY,
    },
});

// ========== MOCK DATA ==========

const MOCK_STANDINGS = {
  PL: [
    { position: 1, team: { id: 1, name: "Manchester City" }, playedGames: 38, won: 28, draw: 6, lost: 4, goalsFor: 96, goalsAgainst: 34, goalDifference: 62, points: 90 },
    { position: 2, team: { id: 2, name: "Arsenal" }, playedGames: 38, won: 26, draw: 8, lost: 4, goalsFor: 88, goalsAgainst: 29, goalDifference: 59, points: 86 },
    { position: 3, team: { id: 3, name: "Liverpool" }, playedGames: 38, won: 24, draw: 10, lost: 4, goalsFor: 82, goalsAgainst: 38, goalDifference: 44, points: 82 },
    { position: 4, team: { id: 4, name: "Aston Villa" }, playedGames: 38, won: 22, draw: 8, lost: 8, goalsFor: 76, goalsAgainst: 52, goalDifference: 24, points: 74 },
    { position: 5, team: { id: 5, name: "Tottenham" }, playedGames: 38, won: 20, draw: 6, lost: 12, goalsFor: 71, goalsAgainst: 59, goalDifference: 12, points: 66 },
    { position: 6, team: { id: 6, name: "Chelsea" }, playedGames: 38, won: 18, draw: 9, lost: 11, goalsFor: 68, goalsAgainst: 57, goalDifference: 11, points: 63 },
    { position: 7, team: { id: 7, name: "Newcastle" }, playedGames: 38, won: 18, draw: 6, lost: 14, goalsFor: 74, goalsAgainst: 58, goalDifference: 16, points: 60 },
    { position: 8, team: { id: 8, name: "Manchester United" }, playedGames: 38, won: 16, draw: 8, lost: 14, goalsFor: 55, goalsAgainst: 58, goalDifference: -3, points: 56 },
    { position: 9, team: { id: 9, name: "West Ham" }, playedGames: 38, won: 14, draw: 10, lost: 14, goalsFor: 59, goalsAgainst: 66, goalDifference: -7, points: 52 },
    { position: 10, team: { id: 10, name: "Brighton" }, playedGames: 38, won: 12, draw: 12, lost: 14, goalsFor: 52, goalsAgainst: 60, goalDifference: -8, points: 48 },
  ],
  PD: [
    { position: 1, team: { id: 11, name: "Real Madrid" }, playedGames: 38, won: 29, draw: 6, lost: 3, goalsFor: 87, goalsAgainst: 26, goalDifference: 61, points: 93 },
    { position: 2, team: { id: 12, name: "Barcelona" }, playedGames: 38, won: 26, draw: 7, lost: 5, goalsFor: 79, goalsAgainst: 35, goalDifference: 44, points: 85 },
    { position: 3, team: { id: 13, name: "Atletico Madrid" }, playedGames: 38, won: 24, draw: 4, lost: 10, goalsFor: 70, goalsAgainst: 37, goalDifference: 33, points: 76 },
    { position: 4, team: { id: 14, name: "Girona" }, playedGames: 38, won: 21, draw: 8, lost: 9, goalsFor: 65, goalsAgainst: 52, goalDifference: 13, points: 71 },
    { position: 5, team: { id: 15, name: "Real Sociedad" }, playedGames: 38, won: 17, draw: 12, lost: 9, goalsFor: 55, goalsAgainst: 42, goalDifference: 13, points: 63 },
    { position: 6, team: { id: 16, name: "Athletic Bilbao" }, playedGames: 38, won: 16, draw: 11, lost: 11, goalsFor: 58, goalsAgainst: 48, goalDifference: 10, points: 59 },
    { position: 7, team: { id: 17, name: "Sevilla" }, playedGames: 38, won: 14, draw: 10, lost: 14, goalsFor: 52, goalsAgainst: 55, goalDifference: -3, points: 52 },
    { position: 8, team: { id: 18, name: "Villarreal" }, playedGames: 38, won: 13, draw: 11, lost: 14, goalsFor: 61, goalsAgainst: 60, goalDifference: 1, points: 50 },
    { position: 9, team: { id: 19, name: "Valencia" }, playedGames: 38, won: 13, draw: 10, lost: 15, goalsFor: 47, goalsAgainst: 54, goalDifference: -7, points: 49 },
    { position: 10, team: { id: 20, name: "Real Betis" }, playedGames: 38, won: 12, draw: 10, lost: 16, goalsFor: 45, goalsAgainst: 56, goalDifference: -11, points: 46 },
  ],
  BL1: [
    { position: 1, team: { id: 21, name: "Bayern Munich" }, playedGames: 34, won: 26, draw: 4, lost: 4, goalsFor: 91, goalsAgainst: 32, goalDifference: 59, points: 82 },
    { position: 2, team: { id: 22, name: "Borussia Dortmund" }, playedGames: 34, win: 22, draw: 6, lost: 6, goalsFor: 76, goalsAgainst: 40, goalDifference: 36, points: 72 },
    { position: 3, team: { id: 23, name: "RB Leipzig" }, playedGames: 34, won: 20, draw: 8, lost: 6, goalsFor: 68, goalsAgainst: 35, goalDifference: 33, points: 68 },
    { position: 4, team: { id: 24, name: "Bayer Leverkusen" }, playedGames: 34, won: 18, draw: 10, lost: 6, goalsFor: 72, goalsAgainst: 42, goalDifference: 30, points: 64 },
    { position: 5, team: { id: 25, name: "Eintracht Frankfurt" }, playedGames: 34, won: 15, draw: 8, lost: 11, goalsFor: 55, goalsAgainst: 48, goalDifference: 7, points: 53 },
    { position: 6, team: { id: 26, name: "VfB Stuttgart" }, playedGames: 34, won: 14, draw: 10, lost: 10, goalsFor: 52, goalsAgainst: 46, goalDifference: 6, points: 52 },
    { position: 7, team: { id: 27, name: "Freiburg" }, playedGames: 34, won: 13, draw: 8, lost: 13, goalsFor: 46, goalsAgainst: 48, goalDifference: -2, points: 47 },
    { position: 8, team: { id: 28, name: "Wolfsburg" }, playedGames: 34, won: 12, draw: 8, lost: 14, goalsFor: 48, goalsAgainst: 55, goalDifference: -7, points: 44 },
    { position: 9, team: { id: 29, name: "Mainz" }, playedGames: 34, won: 10, draw: 12, lost: 12, goalsFor: 42, goalsAgainst: 50, goalDifference: -8, points: 42 },
    { position: 10, team: { id: 30, name: "Borussia Monchengladbach" }, playedGames: 34, won: 11, draw: 8, lost: 15, goalsFor: 45, goalsAgainst: 56, goalDifference: -11, points: 41 },
  ],
  SA: [
    { position: 1, team: { id: 31, name: "Inter Milan" }, playedGames: 38, won: 29, draw: 6, lost: 3, goalsFor: 84, goalsAgainst: 22, goalDifference: 62, points: 93 },
    { position: 2, team: { id: 32, name: "AC Milan" }, playedGames: 38, won: 24, draw: 8, lost: 6, goalsFor: 72, goalsAgainst: 35, goalDifference: 37, points: 80 },
    { position: 3, team: { id: 33, name: "Juventus" }, playedGames: 38, won: 22, draw: 10, lost: 6, goalsFor: 65, goalsAgainst: 30, goalDifference: 35, points: 76 },
    { position: 4, team: { id: 34, name: "Napoli" }, playedGames: 38, won: 20, draw: 10, lost: 8, goalsFor: 68, goalsAgainst: 42, goalDifference: 26, points: 70 },
    { position: 5, team: { id: 35, name: "Roma" }, playedGames: 38, won: 19, draw: 8, lost: 11, goalsFor: 60, goalsAgainst: 44, goalDifference: 16, points: 65 },
    { position: 6, team: { id: 36, name: "Lazio" }, playedGames: 38, won: 18, draw: 7, lost: 13, goalsFor: 56, goalsAgainst: 48, goalDifference: 8, points: 61 },
    { position: 7, team: { id: 37, name: "Atalanta" }, playedGames: 38, won: 16, draw: 9, lost: 13, goalsFor: 62, goalsAgainst: 52, goalDifference: 10, points: 57 },
    { position: 8, team: { id: 38, name: "Fiorentina" }, playedGames: 38, won: 15, draw: 10, lost: 13, goalsFor: 54, goalsAgainst: 50, goalDifference: 4, points: 55 },
    { position: 9, team: { id: 39, name: "Bologna" }, playedGames: 38, won: 14, draw: 12, lost: 12, goalsFor: 48, goalsAgainst: 46, goalDifference: 2, points: 54 },
    { position: 10, team: { id: 40, name: "Torino" }, playedGames: 38, won: 13, draw: 12, lost: 13, goalsFor: 41, goalsAgainst: 43, goalDifference: -2, points: 51 },
  ],
  FL1: [
    { position: 1, team: { id: 41, name: "PSG" }, playedGames: 34, won: 25, draw: 5, lost: 4, goalsFor: 86, goalsAgainst: 28, goalDifference: 58, points: 80 },
    { position: 2, team: { id: 42, name: "Monaco" }, playedGames: 34, won: 20, draw: 8, lost: 6, goalsFor: 68, goalsAgainst: 40, goalDifference: 28, points: 68 },
    { position: 3, team: { id: 43, name: "Marseille" }, playedGames: 34, won: 18, draw: 10, lost: 6, goalsFor: 62, goalsAgainst: 42, goalDifference: 20, points: 64 },
    { position: 4, team: { id: 44, name: "Lille" }, playedGames: 34, won: 17, draw: 10, lost: 7, goalsFor: 55, goalsAgainst: 36, goalDifference: 19, points: 61 },
    { position: 5, team: { id: 45, name: "Nice" }, playedGames: 34, won: 16, draw: 10, lost: 8, goalsFor: 50, goalsAgainst: 38, goalDifference: 12, points: 58 },
    { position: 6, team: { id: 46, name: "Lyon" }, playedGames: 34, won: 15, draw: 8, lost: 11, goalsFor: 58, goalsAgainst: 46, goalDifference: 12, points: 53 },
    { position: 7, team: { id: 47, name: "Rennes" }, playedGames: 34, won: 14, draw: 8, lost: 12, goalsFor: 52, goalsAgainst: 48, goalDifference: 4, points: 50 },
    { position: 8, team: { id: 48, name: "Lens" }, playedGames: 34, won: 13, draw: 10, lost: 11, goalsFor: 46, goalsAgainst: 44, goalDifference: 2, points: 49 },
    { position: 9, team: { id: 49, name: "Toulouse" }, playedGames: 34, won: 12, draw: 8, lost: 14, goalsFor: 42, goalsAgainst: 50, goalDifference: -8, points: 44 },
    { position: 10, team: { id: 50, name: "Strasbourg" }, playedGames: 34, won: 10, draw: 10, lost: 14, goalsFor: 38, goalsAgainst: 48, goalDifference: -10, points: 40 },
  ],
};

const MOCK_TEAMS = {
  PL: MOCK_STANDINGS.PL.map((row) => ({
    id: row.team.id,
    name: row.team.name,
    shortName: row.team.name.slice(0, 3).toUpperCase(),
    venue: `${row.team.name} Stadium`,
    area: { name: "England" },
    clubColors: "Blue / White",
    founded: 1900 + row.team.id,
    crest: `https://crests.football-data.org/${row.team.id}.svg`,
  })),
  PD: MOCK_STANDINGS.PD.map((row) => ({
    id: row.team.id,
    name: row.team.name,
    shortName: row.team.name.slice(0, 3).toUpperCase(),
    venue: `${row.team.name} Stadium`,
    area: { name: "Spain" },
    clubColors: "Red / White",
    founded: 1900 + row.team.id,
    crest: `https://crests.football-data.org/${row.team.id}.svg`,
  })),
  BL1: MOCK_STANDINGS.BL1.map((row) => ({
    id: row.team.id,
    name: row.team.name,
    shortName: row.team.name.slice(0, 3).toUpperCase(),
    venue: `${row.team.name} Arena`,
    area: { name: "Germany" },
    clubColors: "Red / White",
    founded: 1900 + row.team.id,
    crest: `https://crests.football-data.org/${row.team.id}.svg`,
  })),
  SA: MOCK_STANDINGS.SA.map((row) => ({
    id: row.team.id,
    name: row.team.name,
    shortName: row.team.name.slice(0, 3).toUpperCase(),
    venue: `${row.team.name} Stadium`,
    area: { name: "Italy" },
    clubColors: "Blue / Black",
    founded: 1900 + row.team.id,
    crest: `https://crests.football-data.org/${row.team.id}.svg`,
  })),
  FL1: MOCK_STANDINGS.FL1.map((row) => ({
    id: row.team.id,
    name: row.team.name,
    shortName: row.team.name.slice(0, 3).toUpperCase(),
    venue: `${row.team.name} Stadium`,
    area: { name: "France" },
    clubColors: "Blue / White",
    founded: 1900 + row.team.id,
    crest: `https://crests.football-data.org/${row.team.id}.svg`,
  })),
};

const MOCK_MATCHES = [
  { id: 101, homeTeam: { name: "Manchester City" }, awayTeam: { name: "Arsenal" }, score: { fullTime: { home: 2, away: 1 } }, status: "FINISHED" },
  { id: 102, homeTeam: { name: "Liverpool" }, awayTeam: { name: "Chelsea" }, score: { fullTime: { home: 1, away: 1 } }, status: "FINISHED" },
  { id: 103, homeTeam: { name: "Tottenham" }, awayTeam: { name: "Manchester United" }, score: { fullTime: { home: 3, away: 0 } }, status: "FINISHED" },
  { id: 104, homeTeam: { name: "Newcastle" }, awayTeam: { name: "Aston Villa" }, score: { fullTime: { home: 2, away: 2 } }, status: "FINISHED" },
  { id: 105, homeTeam: { name: "West Ham" }, awayTeam: { name: "Brighton" }, status: "TIMED" },
  { id: 106, homeTeam: { name: "Barcelona" }, awayTeam: { name: "Real Madrid" }, status: "SCHEDULED" },
  { id: 107, homeTeam: { name: "Bayern Munich" }, awayTeam: { name: "Borussia Dortmund" }, score: { fullTime: { home: 4, away: 0 } }, status: "FINISHED" },
  { id: 108, homeTeam: { name: "Inter Milan" }, awayTeam: { name: "AC Milan" }, score: { fullTime: { home: 1, away: 0 } }, status: "FINISHED" },
  { id: 109, homeTeam: { name: "PSG" }, awayTeam: { name: "Marseille" }, status: "TIMED" },
  { id: 110, homeTeam: { name: "Juventus" }, awayTeam: { name: "Napoli" }, status: "SCHEDULED" },
];

function delay(ms = 400) {
  return new Promise((r) => setTimeout(r, ms));
}

function getMockStandings(leagueId) {
  const data = MOCK_STANDINGS[leagueId] || MOCK_STANDINGS.PL;
  return { standings: [{ table: data }] };
}

function getMockTeams(leagueId) {
  const teams = MOCK_TEAMS[leagueId] || MOCK_TEAMS.PL;
  return { teams };
}

function getMockMatches(leagueId) {
  let matches = MOCK_MATCHES;
  if (leagueId === "PL") {
    matches = MOCK_MATCHES.slice(0, 6);
  } else if (leagueId === "PD") {
    matches = [{ id: 106, homeTeam: { name: "Barcelona" }, awayTeam: { name: "Real Madrid" }, status: "SCHEDULED" }];
  } else {
    matches = MOCK_MATCHES.slice(6, 10);
  }
  return { matches };
}

export const getStandings = async (leagueId) => {
  await delay();
  return getMockStandings(leagueId);
};

export const getTeams = async (leagueId) => {
  await delay();
  return getMockTeams(leagueId);
};

export const getMatches = async (leagueId) => {
  await delay();
  return getMockMatches(leagueId);
};

export default api;