export const TEAMS = [
  // CONCACAF (hosts + 3 more)
  { code: 'USA', name: 'United States', flag: '🇺🇸', confederation: 'CONCACAF' },
  { code: 'CAN', name: 'Canada', flag: '🇨🇦', confederation: 'CONCACAF' },
  { code: 'MEX', name: 'Mexico', flag: '🇲🇽', confederation: 'CONCACAF' },
  { code: 'PAN', name: 'Panama', flag: '🇵🇦', confederation: 'CONCACAF' },
  { code: 'CRC', name: 'Costa Rica', flag: '🇨🇷', confederation: 'CONCACAF' },
  { code: 'JAM', name: 'Jamaica', flag: '🇯🇲', confederation: 'CONCACAF' },
  // CONMEBOL
  { code: 'BRA', name: 'Brazil', flag: '🇧🇷', confederation: 'CONMEBOL' },
  { code: 'ARG', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL' },
  { code: 'URU', name: 'Uruguay', flag: '🇺🇾', confederation: 'CONMEBOL' },
  { code: 'COL', name: 'Colombia', flag: '🇨🇴', confederation: 'CONMEBOL' },
  { code: 'ECU', name: 'Ecuador', flag: '🇪🇨', confederation: 'CONMEBOL' },
  { code: 'VEN', name: 'Venezuela', flag: '🇻🇪', confederation: 'CONMEBOL' },
  // UEFA
  { code: 'FRA', name: 'France', flag: '🇫🇷', confederation: 'UEFA' },
  { code: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA' },
  { code: 'ESP', name: 'Spain', flag: '🇪🇸', confederation: 'UEFA' },
  { code: 'GER', name: 'Germany', flag: '🇩🇪', confederation: 'UEFA' },
  { code: 'POR', name: 'Portugal', flag: '🇵🇹', confederation: 'UEFA' },
  { code: 'NED', name: 'Netherlands', flag: '🇳🇱', confederation: 'UEFA' },
  { code: 'BEL', name: 'Belgium', flag: '🇧🇪', confederation: 'UEFA' },
  { code: 'ITA', name: 'Italy', flag: '🇮🇹', confederation: 'UEFA' },
  { code: 'CRO', name: 'Croatia', flag: '🇭🇷', confederation: 'UEFA' },
  { code: 'POL', name: 'Poland', flag: '🇵🇱', confederation: 'UEFA' },
  { code: 'SUI', name: 'Switzerland', flag: '🇨🇭', confederation: 'UEFA' },
  { code: 'DEN', name: 'Denmark', flag: '🇩🇰', confederation: 'UEFA' },
  { code: 'AUT', name: 'Austria', flag: '🇦🇹', confederation: 'UEFA' },
  { code: 'SRB', name: 'Serbia', flag: '🇷🇸', confederation: 'UEFA' },
  { code: 'SCO', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA' },
  { code: 'ROU', name: 'Romania', flag: '🇷🇴', confederation: 'UEFA' },
  // AFC
  { code: 'JPN', name: 'Japan', flag: '🇯🇵', confederation: 'AFC' },
  { code: 'KOR', name: 'South Korea', flag: '🇰🇷', confederation: 'AFC' },
  { code: 'IRN', name: 'Iran', flag: '🇮🇷', confederation: 'AFC' },
  { code: 'AUS', name: 'Australia', flag: '🇦🇺', confederation: 'AFC' },
  { code: 'KSA', name: 'Saudi Arabia', flag: '🇸🇦', confederation: 'AFC' },
  { code: 'IRQ', name: 'Iraq', flag: '🇮🇶', confederation: 'AFC' },
  { code: 'JOR', name: 'Jordan', flag: '🇯🇴', confederation: 'AFC' },
  { code: 'IDN', name: 'Indonesia', flag: '🇮🇩', confederation: 'AFC' },
  // CAF
  { code: 'MAR', name: 'Morocco', flag: '🇲🇦', confederation: 'CAF' },
  { code: 'SEN', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF' },
  { code: 'EGY', name: 'Egypt', flag: '🇪🇬', confederation: 'CAF' },
  { code: 'NGA', name: 'Nigeria', flag: '🇳🇬', confederation: 'CAF' },
  { code: 'ALG', name: 'Algeria', flag: '🇩🇿', confederation: 'CAF' },
  { code: 'CMR', name: 'Cameroon', flag: '🇨🇲', confederation: 'CAF' },
  { code: 'RSA', name: 'South Africa', flag: '🇿🇦', confederation: 'CAF' },
  { code: 'MLI', name: 'Mali', flag: '🇲🇱', confederation: 'CAF' },
  { code: 'GHA', name: 'Ghana', flag: '🇬🇭', confederation: 'CAF' },
  // OFC
  { code: 'NZL', name: 'New Zealand', flag: '🇳🇿', confederation: 'OFC' },
  // Playoff qualifiers
  { code: 'UKR', name: 'Ukraine', flag: '🇺🇦', confederation: 'UEFA' },
  { code: 'PAR', name: 'Paraguay', flag: '🇵🇾', confederation: 'CONMEBOL' },
]

// Opening stickers — real codes: FWC1–FWC9 (all FOIL)
const FWC_TITLES = [
  'Panini Logo',
  'Official Emblem',
  'Official Mascot',
  'Official Slogan',
  'Official Ball',
  'Host Country — Canada',
  'Host Country — Mexico',
  'Host Country — USA',
  'Trophy',
]

// FIFA Museum stickers — FWC10–FWC20 (continuation of FWC series)
const MUS_TITLES = [
  'Uruguay 1930 & 1950',
  'Italy 1934 & 1938',
  'Brazil 1958, 1962 & 1970',
  'England 1966',
  'West Germany 1954 & 1974',
  'Argentina 1978 & 1986',
  'Italy 1982 & 2006',
  'Germany 1990 & 2014',
  'Brazil 1994 & 2002',
  'France 1998 & 2018',
  'Spain 2010 & Argentina 2022',
]

const INTRO_STICKERS = [
  ...FWC_TITLES.map((title, i) => ({
    code: `FWC${i + 1}`,
    section: 'Opening',
    sectionCode: 'FWC',
    title,
    isSpecial: true,
    isFoil: true,
    teamCode: null,
    position: i + 1,
    valueMultiplier: 2,
  })),
  ...MUS_TITLES.map((title, i) => ({
    code: `FWC${i + 10}`,
    section: 'FIFA Museum',
    sectionCode: 'FWC',
    title,
    isSpecial: i < 3,
    isFoil: false,
    teamCode: null,
    position: i + 1,
    valueMultiplier: i < 3 ? 2 : 1.2,
  })),
]

// Coca-Cola exclusive stickers — 12 total, obtained from Coca-Cola bottles
// Campaign: April 15 – July 31, 2026 · NOT counted in the 980 album stickers
export const COCA_COLA_STICKERS = [
  { code: 'CC1',  player: 'Lamine Yamal',      team: 'ESP', flag: '🇪🇸' },
  { code: 'CC2',  player: 'Joshua Kimmich',     team: 'GER', flag: '🇩🇪' },
  { code: 'CC3',  player: 'Harry Kane',         team: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'CC4',  player: 'Santiago Giménez',   team: 'MEX', flag: '🇲🇽' },
  { code: 'CC5',  player: 'Antonee Robinson',   team: 'USA', flag: '🇺🇸' },
  { code: 'CC6',  player: 'Jefferson Lerma',    team: 'COL', flag: '🇨🇴' },
  { code: 'CC7',  player: 'Edson Álvarez',      team: 'MEX', flag: '🇲🇽' },
  { code: 'CC8',  player: 'Virgil van Dijk',    team: 'NED', flag: '🇳🇱' },
  { code: 'CC9',  player: 'Alphonso Davies',    team: 'CAN', flag: '🇨🇦' },
  { code: 'CC10', player: 'Weston McKennie',    team: 'USA', flag: '🇺🇸' },
  { code: 'CC11', player: 'Lautaro Martínez',   team: 'ARG', flag: '🇦🇷' },
  { code: 'CC12', player: 'Gabriel Magalhães',  team: 'BRA', flag: '🇧🇷' },
].map((s) => ({
  ...s,
  section: 'Coca-Cola Exclusive',
  sectionCode: 'CC',
  title: s.player,
  isSpecial: true,
  isFoil: false,
  isCocaCola: true,
  teamCode: s.team,
  position: parseInt(s.code.replace('CC', '')),
  valueMultiplier: 3,
}))

export const COCA_COLA_MAP = Object.fromEntries(COCA_COLA_STICKERS.map((s) => [s.code, s]))

// Sticker positions per team (20 total)
const TEAM_POSITIONS = [
  { pos: 1, label: 'Team Badge', isSpecial: true, isFoil: true, valueMultiplier: 2.5 },
  { pos: 2, label: 'Team Photo', isSpecial: false, isFoil: false, valueMultiplier: 1.5 },
  ...Array.from({ length: 18 }, (_, i) => ({
    pos: i + 3,
    label: `Player ${i + 1}`,
    isSpecial: false,
    isFoil: false,
    valueMultiplier: 1,
  })),
]

const generateTeamStickers = () => {
  const stickers = []
  TEAMS.forEach((team) => {
    TEAM_POSITIONS.forEach(({ pos, label, isSpecial, isFoil, valueMultiplier }) => {
      stickers.push({
        code: `${team.code}${pos}`,
        section: team.name,
        sectionCode: team.code,
        title: label,
        isSpecial,
        isFoil,
        isCocaCola: false,
        teamCode: team.code,
        teamName: team.name,
        flag: team.flag,
        confederation: team.confederation,
        position: pos,
        valueMultiplier,
      })
    })
  })
  return stickers
}

// Main album: 20 FWC (FWC1–FWC20) + 48×20 = 980 stickers
export const ALBUM_STICKERS = [...INTRO_STICKERS, ...generateTeamStickers()]
export const ALBUM_MAP = Object.fromEntries(ALBUM_STICKERS.map((s) => [s.code, s]))
export const TOTAL_STICKERS = ALBUM_STICKERS.length // 980

// All stickers including Coca-Cola exclusives
export const ALL_STICKERS_MAP = { ...ALBUM_MAP, ...COCA_COLA_MAP }
export const TOTAL_FOIL_STICKERS = ALBUM_STICKERS.filter((s) => s.isFoil).length // 57

export const CONFEDERATION_ORDER = ['CONCACAF', 'CONMEBOL', 'UEFA', 'AFC', 'CAF', 'OFC']

export const getTeam = (code) => TEAMS.find((t) => t.code === code)

export const getStickerInfo = (code) => {
  if (!code) return {
    code: '',
    section: 'Unknown',
    sectionCode: 'UNK',
    title: '',
    isSpecial: false,
    isFoil: false,
    isCocaCola: false,
    teamCode: null,
    position: null,
    valueMultiplier: 1,
  }
  const upper = code.toUpperCase().trim()
  return ALL_STICKERS_MAP[upper] || {
    code: upper,
    section: 'Unknown',
    sectionCode: 'UNK',
    title: upper,
    isSpecial: false,
    isFoil: false,
    isCocaCola: false,
    teamCode: null,
    position: null,
    valueMultiplier: 1,
  }
}
