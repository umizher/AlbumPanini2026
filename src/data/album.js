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

// Special intro stickers
const INTRO_STICKERS = [
  ...Array.from({ length: 9 }, (_, i) => ({
    code: `OPN${i + 1}`,
    section: 'Opening',
    sectionCode: 'OPN',
    title: i === 0 ? 'Album Cover' : i === 1 ? 'FIFA World Cup 2026 Logo' : i === 2 ? 'Trophy' : i === 3 ? 'Mascot' : `Opening ${i + 1}`,
    isSpecial: true,
    teamCode: null,
    position: i + 1,
    valueMultiplier: 2,
  })),
  ...Array.from({ length: 11 }, (_, i) => ({
    code: `MUS${i + 1}`,
    section: 'FIFA Museum',
    sectionCode: 'MUS',
    title: `FIFA Museum ${i + 1}`,
    isSpecial: i < 3,
    teamCode: null,
    position: i + 1,
    valueMultiplier: i < 3 ? 2 : 1.2,
  })),
]

// Sticker positions per team (20 total)
const TEAM_POSITIONS = [
  { pos: 1, label: 'Team Badge', isSpecial: true, valueMultiplier: 2.5 },
  { pos: 2, label: 'Team Photo', isSpecial: false, valueMultiplier: 1.5 },
  ...Array.from({ length: 18 }, (_, i) => ({
    pos: i + 3,
    label: `Player ${i + 1}`,
    isSpecial: false,
    valueMultiplier: 1,
  })),
]

const generateTeamStickers = () => {
  const stickers = []
  TEAMS.forEach((team) => {
    TEAM_POSITIONS.forEach(({ pos, label, isSpecial, valueMultiplier }) => {
      stickers.push({
        code: `${team.code}${pos}`,
        section: team.name,
        sectionCode: team.code,
        title: label,
        isSpecial,
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

export const ALBUM_STICKERS = [...INTRO_STICKERS, ...generateTeamStickers()]
export const ALBUM_MAP = Object.fromEntries(ALBUM_STICKERS.map((s) => [s.code, s]))
export const TOTAL_STICKERS = ALBUM_STICKERS.length

export const CONFEDERATION_ORDER = ['CONCACAF', 'CONMEBOL', 'UEFA', 'AFC', 'CAF', 'OFC']

export const getTeam = (code) => TEAMS.find((t) => t.code === code)

export const getStickerInfo = (code) => {
  const upper = code.toUpperCase().trim()
  return ALBUM_MAP[upper] || {
    code: upper,
    section: 'Unknown',
    sectionCode: 'UNK',
    title: upper,
    isSpecial: false,
    teamCode: null,
    position: null,
    valueMultiplier: 1,
  }
}
