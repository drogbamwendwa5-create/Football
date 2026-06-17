const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'assets', 'crests');
fs.mkdirSync(dir, { recursive: true });

const teams = [
  { id: 1, abbr: 'MCI', color: '#6CABDD' },
  { id: 2, abbr: 'ARS', color: '#EF0107' },
  { id: 3, abbr: 'LIV', color: '#C8102E' },
  { id: 4, abbr: 'AVL', color: '#95BFE5' },
  { id: 5, abbr: 'TOT', color: '#132257' },
  { id: 6, abbr: 'CHE', color: '#034694' },
  { id: 7, abbr: 'NEW', color: '#241F20' },
  { id: 8, abbr: 'MUN', color: '#DA291C' },
  { id: 9, abbr: 'WHU', color: '#7A263A' },
  { id: 10, abbr: 'BHA', color: '#0057B8' },
  { id: 11, abbr: 'RMA', color: '#FEBE10' },
  { id: 12, abbr: 'BAR', color: '#A50044' },
  { id: 13, abbr: 'ATM', color: '#CB3524' },
  { id: 14, abbr: 'GIR', color: '#CE2636' },
  { id: 15, abbr: 'RSO', color: '#143C8B' },
  { id: 16, abbr: 'ATH', color: '#EE2523' },
  { id: 17, abbr: 'SEV', color: '#D4021D' },
  { id: 18, abbr: 'VIL', color: '#FEE600' },
  { id: 19, abbr: 'VAL', color: '#FF7C00' },
  { id: 20, abbr: 'BET', color: '#00954C' },
  { id: 21, abbr: 'BAY', color: '#DC052D' },
  { id: 22, abbr: 'BVB', color: '#FDE100' },
  { id: 23, abbr: 'RBL', color: '#DD0741' },
  { id: 24, abbr: 'B04', color: '#E32221' },
  { id: 25, abbr: 'SGE', color: '#E1000F' },
  { id: 26, abbr: 'VFB', color: '#E32219' },
  { id: 27, abbr: 'SCF', color: '#E4032E' },
  { id: 28, abbr: 'WOB', color: '#65B32E' },
  { id: 29, abbr: 'M05', color: '#C3141E' },
  { id: 30, abbr: 'BMG', color: '#000000' },
  { id: 31, abbr: 'INT', color: '#0068A8' },
  { id: 32, abbr: 'ACM', color: '#FB090B' },
  { id: 33, abbr: 'JUV', color: '#000000' },
  { id: 34, abbr: 'NAP', color: '#0080C6' },
  { id: 35, abbr: 'ROM', color: '#8E1F2F' },
  { id: 36, abbr: 'LAZ', color: '#87D8F7' },
  { id: 37, abbr: 'ATA', color: '#1E71B8' },
  { id: 38, abbr: 'FIO', color: '#6B32A8' },
  { id: 39, abbr: 'BOL', color: '#1A2F48' },
  { id: 40, abbr: 'TOR', color: '#8A1E3B' },
  { id: 41, abbr: 'PSG', color: '#004170' },
  { id: 42, abbr: 'MON', color: '#E1192D' },
  { id: 43, abbr: 'OLM', color: '#2FAEE0' },
  { id: 44, abbr: 'LIL', color: '#E2001A' },
  { id: 45, abbr: 'NIC', color: '#000000' },
  { id: 46, abbr: 'LYO', color: '#1A3F8B' },
  { id: 47, abbr: 'REN', color: '#E3001B' },
  { id: 48, abbr: 'LEN', color: '#E2001A' },
  { id: 49, abbr: 'TOU', color: '#97C3E0' },
  { id: 50, abbr: 'STR', color: '#C7122F' },
];

teams.forEach(team => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="g${team.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${team.color}" />
      <stop offset="100%" stop-color="${team.color}" stop-opacity="0.75" />
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="56" fill="url(#g${team.id})" stroke="#ffffff" stroke-width="4"/>
  <circle cx="60" cy="60" r="46" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  <text x="60" y="72" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="900" font-size="32" letter-spacing="2">${team.abbr}</text>
  <text x="60" y="96" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="700" font-size="12" opacity="0.85">ID ${team.id}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${team.id}.svg`), svg.trim());
});

console.log(`Generated ${teams.length} crest SVGs in ${dir}`);