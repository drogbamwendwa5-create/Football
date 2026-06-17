export function predictMatch(homeTeam, awayTeam) {
  const homeStrength = (homeTeam.winrate || 0) + (homeTeam.avgGoals || 0);
  const awayStrength = (awayTeam.winrate || 0) + (awayTeam.avgGoals || 0);
  const total = homeStrength + awayStrength;

  if (total === 0) {
    return {
      homeProb: "33.3",
      awayProb: "33.3",
      drawProb: "33.3",
    };
  }

  const homeProb = (homeStrength / total) * 100;
  const awayProb = (awayStrength / total) * 100;
  const drawProb = Math.max(0, 100 - homeProb - awayProb);

  return {
    homeProb: homeProb.toFixed(1),
    awayProb: awayProb.toFixed(1),
    drawProb: drawProb.toFixed(1),
  };
}