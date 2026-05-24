import { useState, useMemo } from 'react'
import { TEAMS, ALBUM_STICKERS, GROUP_ORDER, COCA_COLA_STICKERS } from '../data/album'
import { getParallel } from '../data/parallels'
import TypeSelector from './TypeSelector'

const FILTERS = ['All', 'Have', 'Need', 'Duplicate']

function StickerDot({ sticker, owned, parallel, onClick }) {
  const base =
    sticker.isCocaCola
      ? owned === 'have' || owned === 'dup'
        ? 'bg-red-700 border-red-500'
        : 'bg-red-950/50 border-red-900'
      : owned === 'have'
      ? 'bg-emerald-600 border-emerald-500'
      : owned === 'dup'
      ? 'bg-amber-500 border-amber-400'
      : 'bg-gray-800 border-gray-700'

  const label = sticker.position != null
    ? sticker.position
    : sticker.code.replace(/[A-Z]/g, '') || sticker.code

  return (
    <button
      onClick={onClick}
      title={`${sticker.code} — ${sticker.title}${parallel ? ` (${parallel.name})` : ''}${sticker.isFoil ? ' ✨ FOIL' : ''}${sticker.isCocaCola ? ' 🥤 Coca-Cola' : ''}`}
      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md border flex items-center justify-center transition-all active:scale-90 cursor-pointer ${base} ${sticker.isFoil ? 'ring-2 ring-yellow-400/60' : sticker.isCocaCola ? 'ring-2 ring-red-400/60' : ''}`}
    >
      <span className={`${owned === 'have' || owned === 'dup' ? 'text-white' : sticker.isCocaCola ? 'text-red-700' : 'text-gray-600'} text-[16px] sm:text-[18px] leading-none font-mono font-bold`}>
        {label}
      </span>
    </button>
  )
}

function StickerActionModal({ sticker, stateStickers, onAddSticker, onRemove, onClose }) {
  const entries = Object.values(stateStickers).filter((e) => e.code === sticker.code)
  const totalQty = entries.reduce((s, e) => s + e.quantity, 0)
  const isOwned = entries.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl font-black text-white font-mono">{sticker.code}</span>
              {sticker.isFoil && <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">✨ FOIL</span>}
              {sticker.isCocaCola && <span className="text-xs bg-red-400/20 text-red-400 px-2 py-0.5 rounded-full">🥤 Coca-Cola</span>}
              {sticker.isSpecial && !sticker.isFoil && <span className="text-xs bg-purple-400/20 text-purple-400 px-2 py-0.5 rounded-full">★ Special</span>}
            </div>
            <p className="text-sm text-gray-300 mt-0.5">{sticker.title}</p>
            <p className="text-xs text-gray-500">{sticker.section}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none ml-3">✕</button>
        </div>

        {/* Owned status */}
        <div className={`rounded-xl px-4 py-3 mb-4 ${isOwned ? 'bg-emerald-950/40 border border-emerald-800' : 'bg-gray-800 border border-gray-700'}`}>
          {isOwned ? (
            <div>
              <p className="text-sm text-emerald-400 font-semibold mb-1">In your collection ({totalQty} total)</p>
              <div className="flex flex-wrap gap-1.5">
                {entries.map((e) => {
                  const p = getParallel(e.parallelId)
                  return (
                    <span key={e.key} className={`text-xs px-2 py-0.5 rounded-full ${p.bg} text-white`}>
                      {p.name} ×{e.quantity}
                    </span>
                  )
                })}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Not in your collection yet</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onAddSticker}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] transition-all text-left"
          >
            <span className="text-xl">➕</span>
            <div>
              <p className="font-semibold text-white text-base">Add this sticker</p>
              <p className="text-sm text-emerald-300">Select parallel type</p>
            </div>
          </button>

          {entries.map((entry) => {
            const p = getParallel(entry.parallelId)
            return (
              <button
                key={entry.key}
                onClick={() => { onRemove(entry.key, `${sticker.code} (${p.name})`); onClose() }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-800 hover:bg-red-900/30 border border-gray-700 hover:border-red-800 active:scale-[0.98] transition-all text-left"
              >
                <span className="text-xl">{p.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white text-base">Remove {p.name}</p>
                  <p className="text-sm text-gray-400">{entry.quantity} in collection — removes one</p>
                </div>
                <span className="text-red-500 text-lg">−</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TeamSection({ team, stickers, ownedCodes, stateStickers, onStickerClick }) {
  const have = stickers.filter((s) => ownedCodes.has(s.code)).length
  const pct = Math.round((have / stickers.length) * 100)

  const getOwnership = (code) => {
    const entries = Object.values(stateStickers).filter((e) => e.code === code)
    if (!entries.length) return { status: 'none', parallel: null }
    const total = entries.reduce((s, e) => s + e.quantity, 0)
    const topParallel = [...entries].sort((a, b) => getParallel(b.parallelId).multiplier - getParallel(a.parallelId).multiplier)[0]
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
          <p className="font-semibold text-white text-base truncate">{team.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 bg-gray-800 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">{have}/{stickers.length}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {stickers.map((s) => {
          const { status, parallel } = getOwnership(s.code)
          return (
            <StickerDot
              key={s.code}
              sticker={s}
              owned={status}
              parallel={parallel}
              onClick={() => onStickerClick(s)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function AlbumGrid({ ownedCodes, state, onAdd, onRemove }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [groupFilter, setGroupFilter] = useState('All')
  const [activeSticker, setActiveSticker] = useState(null)
  const [pendingTypeSelect, setPendingTypeSelect] = useState(null)

  const groups = ['All', ...GROUP_ORDER]

  const teamSections = useMemo(() => TEAMS.map((team) => {
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
    const matchesGroup = groupFilter === 'All' || team.group === groupFilter
    const matchesSearch = !search || team.name.toLowerCase().includes(search.toLowerCase()) || team.code.includes(search.toUpperCase())
    return { team, stickers, matchesFilter, matchesGroup, matchesSearch }
  }).filter((s) => s.matchesFilter && s.matchesGroup && s.matchesSearch), [filter, search, groupFilter, state.stickers, ownedCodes])

  const introStickers = useMemo(() => ALBUM_STICKERS.filter((s) => !s.teamCode), [])

  const getIntroOwnership = (code) => {
    const entries = Object.values(state.stickers).filter((e) => e.code === code)
    if (!entries.length) return { status: 'none', parallel: null }
    const total = entries.reduce((s, e) => s + e.quantity, 0)
    return { status: total > 1 || entries.length > 1 ? 'dup' : 'have', parallel: null }
  }

  const handleStickerClick = (sticker) => setActiveSticker(sticker)

  const handleAddSticker = () => {
    const code = activeSticker.code
    setActiveSticker(null)
    setPendingTypeSelect(code)
  }

  const handleTypeSelect = (parallelId) => {
    const code = pendingTypeSelect
    setPendingTypeSelect(null)
    onAdd(code, parallelId)
  }

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
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setGroupFilter(g)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${groupFilter === g ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            {g === 'All' ? 'All' : `Grupo ${g}`}
          </button>
        ))}
      </div>

      {/* Intro section (FWC + Museum) */}
      {(filter === 'All' || filter === 'Have' || filter === 'Need') && groupFilter === 'All' && !search && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <p className="font-semibold text-white text-base">🌍 Opening & FIFA Museum</p>
            <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">00 · FWC1–FWC20</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {introStickers.map((s) => {
              const { status } = getIntroOwnership(s.code)
              return (
                <StickerDot
                  key={s.code}
                  sticker={s}
                  owned={status}
                  parallel={null}
                  onClick={() => handleStickerClick(s)}
                />
              )
            })}
          </div>
          <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-sm ring-2 ring-yellow-400/60 bg-gray-800" /> = FOIL sticker · tap any dot to add/remove
          </p>
        </div>
      )}

      {/* Coca-Cola exclusive section */}
      {(filter === 'All' || filter === 'Have' || filter === 'Need') && groupFilter === 'All' && !search && (
        <div className="bg-red-950/20 border border-red-900/40 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🥤</span>
            <p className="font-semibold text-white text-base">Coca-Cola Exclusives</p>
            <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full ml-1">CC1–CC12</span>
          </div>
          <p className="text-sm text-red-400/70 mb-3">Only from Coca-Cola 20oz bottles · Not in standard packs</p>
          <div className="flex flex-wrap gap-1">
            {COCA_COLA_STICKERS.map((s) => {
              const entries = Object.values(state.stickers).filter((e) => e.code === s.code)
              const status = entries.length ? (entries.reduce((sum, e) => sum + e.quantity, 0) > 1 ? 'dup' : 'have') : 'none'
              return (
                <div key={s.code} className="flex flex-col items-center gap-0.5">
                  <StickerDot sticker={s} owned={status} parallel={null} onClick={() => handleStickerClick(s)} />
                  <span className="text-[8px] text-red-500/70 font-mono">{s.code}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1">
            {COCA_COLA_STICKERS.map((s) => {
              const entries = Object.values(state.stickers).filter((e) => e.code === s.code)
              const have = entries.length > 0
              return (
                <div key={s.code} className={`flex items-center gap-2 text-sm px-2 py-1 rounded-lg ${have ? 'bg-red-900/30 text-red-300' : 'text-gray-600'}`}>
                  <span>{s.flag}</span>
                  <span className="font-mono text-[10px] text-red-400/70">{s.code}</span>
                  <span className="truncate">{s.player}</span>
                  {have && <span className="ml-auto text-green-400">✓</span>}
                </div>
              )
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
            onStickerClick={handleStickerClick}
          />
        ))
      )}

      <div className="h-2" />

      {/* Sticker action modal */}
      {activeSticker && (
        <StickerActionModal
          sticker={activeSticker}
          stateStickers={state.stickers}
          onAddSticker={handleAddSticker}
          onRemove={onRemove}
          onClose={() => setActiveSticker(null)}
        />
      )}

      {/* Type selector after tapping add in modal */}
      {pendingTypeSelect && (
        <TypeSelector
          code={pendingTypeSelect}
          onSelect={handleTypeSelect}
          onCancel={() => setPendingTypeSelect(null)}
        />
      )}
    </div>
  )
}
