import axios from "axios";
import { LEAGUE_IDS, WORLD_CUP } from "../constants/leagues";

const api = axios.create({
  baseURL: "/api",
});

function getSeasonParam(leagueId) {
  return leagueId === WORLD_CUP.id ? { season: WORLD_CUP.season } : {};
}

export const getCompetition = async (leagueId) => {
  const response = await api.get(`/competitions/${leagueId}`, {
    params: getSeasonParam(leagueId),
  });
  return response.data;
};

export const getStandings = async (leagueId) => {
  const response = await api.get(`/competitions/${leagueId}/standings`, {
    params: getSeasonParam(leagueId),
  });
  return response.data;
};

export const getTeams = async (leagueId) => {
  const response = await api.get(`/competitions/${leagueId}/teams`, {
    params: getSeasonParam(leagueId),
  });
  return response.data;
};

export const getMatches = async (leagueId, params = {}) => {
  const response = await api.get(`/competitions/${leagueId}/matches`, {
    params: { ...getSeasonParam(leagueId), ...params },
  });
  return response.data;
};

export const getTeam = async (teamId) => {
  const response = await api.get(`/teams/${teamId}`);
  return response.data;
};

export const getTeamsAcrossLeagues = async (leagueIds = LEAGUE_IDS) => {
  const results = await Promise.all(
    leagueIds.map((leagueId) =>
      getTeams(leagueId).catch(() => ({ teams: [] }))
    )
  );
  return results.flatMap((data) => data.teams || []);
};

export const findTeamById = async (teamId) => {
  try {
    return await getTeam(teamId);
  } catch {
    const teams = await getTeamsAcrossLeagues();
    return teams.find((team) => team.id === Number(teamId)) || null;
  }
};

export default api;
