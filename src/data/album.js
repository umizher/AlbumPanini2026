export const TEAMS = [
  // Group A
  { code: 'MEX', name: 'Mexico',        flag: '🇲🇽', group: 'A' },
  { code: 'RSA', name: 'South Africa',  flag: '🇿🇦', group: 'A' },
  { code: 'KOR', name: 'South Korea',   flag: '🇰🇷', group: 'A' },
  { code: 'CZE', name: 'Czech Republic',flag: '🇨🇿', group: 'A' },
  // Group B
  { code: 'CAN', name: 'Canada',        flag: '🇨🇦', group: 'B' },
  { code: 'BIH', name: 'Bosnia',        flag: '🇧🇦', group: 'B' },
  { code: 'QAT', name: 'Qatar',         flag: '🇶🇦', group: 'B' },
  { code: 'SUI', name: 'Switzerland',   flag: '🇨🇭', group: 'B' },
  // Group C
  { code: 'BRA', name: 'Brazil',        flag: '🇧🇷', group: 'C' },
  { code: 'MAR', name: 'Morocco',       flag: '🇲🇦', group: 'C' },
  { code: 'HTI', name: 'Haiti',         flag: '🇭🇹', group: 'C' },
  { code: 'SCO', name: 'Scotland',      flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  // Group D
  { code: 'USA', name: 'United States', flag: '🇺🇸', group: 'D' },
  { code: 'PAR', name: 'Paraguay',      flag: '🇵🇾', group: 'D' },
  { code: 'AUS', name: 'Australia',     flag: '🇦🇺', group: 'D' },
  { code: 'TUR', name: 'Turkey',        flag: '🇹🇷', group: 'D' },
  // Group E
  { code: 'GER', name: 'Germany',       flag: '🇩🇪', group: 'E' },
  { code: 'CUW', name: 'Curaçao',       flag: '🇨🇼', group: 'E' },
  { code: 'CIV', name: "Côte d'Ivoire", flag: '🇨🇮', group: 'E' },
  { code: 'ECU', name: 'Ecuador',       flag: '🇪🇨', group: 'E' },
  // Group F
  { code: 'NED', name: 'Netherlands',   flag: '🇳🇱', group: 'F' },
  { code: 'JPN', name: 'Japan',         flag: '🇯🇵', group: 'F' },
  { code: 'SWE', name: 'Sweden',        flag: '🇸🇪', group: 'F' },
  { code: 'TUN', name: 'Tunisia',       flag: '🇹🇳', group: 'F' },
  // Group G
  { code: 'BEL', name: 'Belgium',       flag: '🇧🇪', group: 'G' },
  { code: 'EGY', name: 'Egypt',         flag: '🇪🇬', group: 'G' },
  { code: 'IRN', name: 'Iran',          flag: '🇮🇷', group: 'G' },
  { code: 'NZL', name: 'New Zealand',   flag: '🇳🇿', group: 'G' },
  // Group H
  { code: 'ESP', name: 'Spain',         flag: '🇪🇸', group: 'H' },
  { code: 'CPV', name: 'Cape Verde',    flag: '🇨🇻', group: 'H' },
  { code: 'KSA', name: 'Saudi Arabia',  flag: '🇸🇦', group: 'H' },
  { code: 'URU', name: 'Uruguay',       flag: '🇺🇾', group: 'H' },
  // Group I
  { code: 'FRA', name: 'France',        flag: '🇫🇷', group: 'I' },
  { code: 'SEN', name: 'Senegal',       flag: '🇸🇳', group: 'I' },
  { code: 'IRQ', name: 'Iraq',          flag: '🇮🇶', group: 'I' },
  { code: 'NOR', name: 'Norway',        flag: '🇳🇴', group: 'I' },
  // Group J
  { code: 'ARG', name: 'Argentina',     flag: '🇦🇷', group: 'J' },
  { code: 'ALG', name: 'Algeria',       flag: '🇩🇿', group: 'J' },
  { code: 'AUT', name: 'Austria',       flag: '🇦🇹', group: 'J' },
  { code: 'JOR', name: 'Jordan',        flag: '🇯🇴', group: 'J' },
  // Group K
  { code: 'POR', name: 'Portugal',      flag: '🇵🇹', group: 'K' },
  { code: 'COD', name: 'DR Congo',      flag: '🇨🇩', group: 'K' },
  { code: 'UZB', name: 'Uzbekistan',    flag: '🇺🇿', group: 'K' },
  { code: 'COL', name: 'Colombia',      flag: '🇨🇴', group: 'K' },
  // Group L
  { code: 'ENG', name: 'England',       flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
  { code: 'CRO', name: 'Croatia',       flag: '🇭🇷', group: 'L' },
  { code: 'GHA', name: 'Ghana',         flag: '🇬🇭', group: 'L' },
  { code: 'PAN', name: 'Panama',        flag: '🇵🇦', group: 'L' },
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
  {
    code: '00',
    section: 'Opening',
    sectionCode: 'FWC',
    title: 'FIFA World Cup 2026',
    isSpecial: false,
    isFoil: false,
    teamCode: null,
    position: null,
    valueMultiplier: 1,
  },
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
    position: i + 10,
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
        group: team.group,
        position: pos,
        valueMultiplier,
      })
    })
  })
  return stickers
}

// Main album: sticker 00 + 20 FWC (FWC1–FWC20) + 48×20 = 981 stickers
export const ALBUM_STICKERS = [...INTRO_STICKERS, ...generateTeamStickers()]
export const ALBUM_MAP = Object.fromEntries(ALBUM_STICKERS.map((s) => [s.code, s]))
export const TOTAL_STICKERS = ALBUM_STICKERS.length

// All stickers including Coca-Cola exclusives
export const ALL_STICKERS_MAP = { ...ALBUM_MAP, ...COCA_COLA_MAP }
export const TOTAL_FOIL_STICKERS = ALBUM_STICKERS.filter((s) => s.isFoil).length

export const GROUP_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

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
