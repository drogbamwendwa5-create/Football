import axios from "axios";
import { LEAGUE_IDS, WORLD_CUP } from "../constants/leagues";

const isLocalhost = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || 
   window.location.hostname === "127.0.0.1" || 
   window.location.hostname.includes("vercel.app"));

const API_BASE = isLocalhost ? "/api" : "https://corsproxy.io/?https://api.football-data.org/v4";

const api = axios.create({
  baseURL: API_BASE,
});

// ── Auth interceptor ──────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const apiToken = import.meta.env.VITE_FOOTBALL_API_KEY || "485aafd43cb2409695838c24d67d59a6";
  if (apiToken) {
    config.headers["X-Auth-Token"] = apiToken;
  }
  return config;
});

// ── Response interceptor for Rate Limits (429) ────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      return Promise.reject(new Error("API Rate Limit Exceeded (10 requests/minute on free tier). Please wait a moment before trying again."));
    }
    return Promise.reject(error);
  }
);

// ── sessionStorage-backed cache (TTL = 15 min) ────────────────────
const CACHE_TTL = 15 * 60 * 1000;

function getCached(key) {
  try {
    const entryStr = sessionStorage.getItem("fb_cache_" + key);
    if (!entryStr) return null;
    const entry = JSON.parse(entryStr);
    if (Date.now() - entry.ts < CACHE_TTL) return entry.data;
    sessionStorage.removeItem("fb_cache_" + key);
  } catch (e) {
    // ignore storage errors
  }
  return null;
}

function setCache(key, data) {
  try {
    const entry = { data, ts: Date.now() };
    sessionStorage.setItem("fb_cache_" + key, JSON.stringify(entry));
  } catch (e) {
    // ignore storage errors
  }
}

async function cachedGet(url, params = {}) {
  const cacheKey = url + JSON.stringify(params);
  const hit = getCached(cacheKey);
  if (hit) return hit;
  const response = await api.get(url, { params });
  setCache(cacheKey, response.data);
  return response.data;
}

// ── Helpers ───────────────────────────────────────────────────────
function getSeasonParam(leagueId) {
  return leagueId === WORLD_CUP.id ? { season: WORLD_CUP.season } : {};
}

/** Small delay to stay under the free-tier 10 req/min limit */
export function delay(ms = 6500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Endpoints ─────────────────────────────────────────────────────
export const getCompetition = async (leagueId) => {
  return cachedGet(`/competitions/${leagueId}`, getSeasonParam(leagueId));
};

export const getStandings = async (leagueId) => {
  return cachedGet(`/competitions/${leagueId}/standings`, getSeasonParam(leagueId));
};

export const getTeams = async (leagueId) => {
  return cachedGet(`/competitions/${leagueId}/teams`, getSeasonParam(leagueId));
};

export const getMatches = async (leagueId, params = {}) => {
  return cachedGet(`/competitions/${leagueId}/matches`, {
    ...getSeasonParam(leagueId),
    ...params,
  });
};

export const getScorers = async (leagueId, limit = 10) => {
  return cachedGet(`/competitions/${leagueId}/scorers`, {
    ...getSeasonParam(leagueId),
    limit,
  });
};

export const getTeam = async (teamId) => {
  return cachedGet(`/teams/${teamId}`);
};

export const getTeamMatches = async (teamId, params = {}) => {
  return cachedGet(`/teams/${teamId}/matches`, params);
};

// ── Aggregate helpers ─────────────────────────────────────────────
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

/**
 * Fetch standings for all 5 domestic leagues (with delay between calls).
 * Returns a flat array of standing rows, each tagged with its league id.
 */
export const getAllLeagueStandings = async (leagueIds) => {
  const ids = leagueIds || LEAGUE_IDS.filter((id) => id !== "WC");
  const all = [];
  for (let i = 0; i < ids.length; i++) {
    if (i > 0) await delay();
    try {
      const res = await getStandings(ids[i]);
      const table = res?.standings?.[0]?.table || [];
      all.push(...table.map((r) => ({ ...r, league: ids[i] })));
    } catch {
      // skip failed league
    }
  }
  return all;
};

export default api;