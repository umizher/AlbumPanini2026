import { useState } from 'react'
import { TEAMS, ALBUM_STICKERS, CONFEDERATION_ORDER } from '../data/album'
import { getParallel } from '../data/parallels'

const FILTERS = ['All', 'Have', 'Need', 'Duplicate']

function StickerDot({ sticker, owned, parallel }) {
  const base =
    owned === 'have'
      ? `bg-emerald-600 border-emerald-500`
      : owned === 'dup'
      ? `bg-amber-500 border-amber-400`
      : 'bg-gray-800 border-gray-700'

  return (
    <div
      title={`${sticker.code} — ${sticker.title}${parallel ? ` (${parallel.name})` : ''}`}
      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md border flex items-center justify-center text-xs font-mono font-bold transition-all ${base} ${sticker.isSpecial ? 'ring-1 ring-yellow-500/50' : ''}`}
    >
      <span className={`${owned === 'have' || owned === 'dup' ? 'text-white' : 'text-gray-600'} text-[9px] sm:text-[10px] leading-none`}>
        {sticker.position || sticker.code.replace(/[A-Z]/g, '')}
      </span>
    </div>
  )
}

function TeamSection({ team, stickers, ownedCodes, stateStickers }) {
  const have = stickers.filter((s) => ownedCodes.has(s.code)).length
  const pct = Math.round((have / stickers.length) * 100)

  const getOwnership = (code) => {
    const entries = Object.values(stateStickers).filter((e) => e.code === code)
    if (!entries.length) return { status: 'none', parallel: null }
    const total = entries.reduce((s, e) => s + e.quantity, 0)
    const topParallel = entries.sort((a, b) => getParallel(b.parallelId).multiplier - getParallel(a.parallelId).multiplier)[0]
    return {
      status: total > 1 || entries.length > 1 ? 'dup' : 'have',
      parallel: getParallel(topParallel.parallelId),
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{team.flag}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate">{team.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 bg-gray-800 rounded-full h-1.5">
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{have}/{stickers.length}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {stickers.map((s) => {
          const { status, parallel } = getOwnership(s.code)
          return <StickerDot key={s.code} sticker={s} owned={status} parallel={parallel} />
        })}
      </div>
    </div>
  )
}

export default function AlbumGrid({ ownedCodes, state }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [confFilter, setConfFilter] = useState('All')

  const confs = ['All', ...CONFEDERATION_ORDER]

  const teamSections = TEAMS.map((team) => {
    const stickers = ALBUM_STICKERS.filter((s) => s.teamCode === team.code)
    const have = stickers.filter((s) => ownedCodes.has(s.code)).length
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Have' && have > 0) ||
      (filter === 'Need' && have < stickers.length) ||
      (filter === 'Duplicate' &&
        stickers.some((s) => {
          const entries = Object.values(state.stickers).filter((e) => e.code === s.code)
          return entries.some((e) => e.quantity > 1) || entries.length > 1
        }))
    const matchesConf = confFilter === 'All' || team.confederation === confFilter
    const matchesSearch = !search || team.name.toLowerCase().includes(search.toLowerCase()) || team.code.includes(search.toUpperCase())
    return { team, stickers, matchesFilter, matchesConf, matchesSearch }
  }).filter((s) => s.matchesFilter && s.matchesConf && s.matchesSearch)

  const introStickers = ALBUM_STICKERS.filter((s) => !s.teamCode)

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search team..."
        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-emerald-500"
      />

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === f ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            {f}
          </button>
        ))}
        <div className="w-px bg-gray-700" />
        {confs.map((c) => (
          <button
            key={c}
            onClick={() => setConfFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${confFilter === c ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Intro section */}
      {(filter === 'All' || filter === 'Have' || filter === 'Need') && confFilter === 'All' && !search && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="font-semibold text-white text-sm mb-3">🌍 Introduction & Museum</p>
          <div className="flex flex-wrap gap-1">
            {introStickers.map((s) => {
              const entries = Object.values(state.stickers).filter((e) => e.code === s.code)
              const status = entries.length ? (entries.reduce((sum, e) => sum + e.quantity, 0) > 1 ? 'dup' : 'have') : 'none'
              return <StickerDot key={s.code} sticker={s} owned={status} parallel={null} />
            })}
          </div>
        </div>
      )}

      {/* Team sections */}
      {teamSections.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No teams match this filter</p>
      ) : (
        teamSections.map(({ team, stickers }) => (
          <TeamSection
            key={team.code}
            team={team}
            stickers={stickers}
            ownedCodes={ownedCodes}
            stateStickers={state.stickers}
          />
        ))
      )}

      <div className="h-2" />
    </div>
  )
}
