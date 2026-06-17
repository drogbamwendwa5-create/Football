export const LEAGUES = [
  { id: "PL", name: "Premier League", region: "England" },
  { id: "PD", name: "La Liga", region: "Spain" },
  { id: "BL1", name: "Bundesliga", region: "Germany" },
  { id: "SA", name: "Serie A", region: "Italy" },
  { id: "FL1", name: "Ligue 1", region: "France" },
  { id: "WC", name: "World Cup", region: "International" },
];

export const LEAGUE_IDS = LEAGUES.map((league) => league.id);

export const LEAGUE_NAMES = Object.fromEntries(
  LEAGUES.map((league) => [league.id, league.name])
);

export const WORLD_CUP = {
  id: "WC",
  name: "FIFA World Cup",
  season: 2026,
};
