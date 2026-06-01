import { useState, useMemo, useRef } from 'react'
import { TEAMS, ALBUM_STICKERS, GROUP_ORDER, COCA_COLA_STICKERS } from '../data/album'

const FILTERS = ['All', 'Have', 'Need', 'Duplicate']

function StickerDot({ sticker, quantity, onTap, onLongPress }) {
  const timerRef = useRef(null)
  const didLongPressRef = useRef(false)
  const [isPressing, setIsPressing] = useState(false)

  const startPress = () => {
    didLongPressRef.current = false
    setIsPressing(true)
    timerRef.current = setTimeout(() => {
      didLongPressRef.current = true
      setIsPressing(false)
      onLongPress?.()
    }, 500)
  }

  const cancelPress = () => {
    clearTimeout(timerRef.current)
    setIsPressing(false)
  }

  const handleClick = () => {
    if (didLongPressRef.current) return
    onTap?.()
  }

  const owned = quantity > 0
  const hasDups = quantity > 1

  const base = sticker.isCocaCola
    ? owned
      ? isPressing ? 'bg-red-900 border-red-700' : 'bg-red-700 border-red-500'
      : 'bg-red-950/50 border-red-900'
    : isPressing && owned
    ? 'bg-red-800 border-red-600'
    : hasDups
    ? 'bg-amber-500 border-amber-400'
    : owned
    ? 'bg-emerald-600 border-emerald-500'
    : 'bg-gray-800 border-gray-700'

  const label = sticker.code
  const textSize =
    label.length <= 2 ? 'text-[24px] sm:text-[28px]' :
    label.length <= 4 ? 'text-[15px] sm:text-[17px]' :
                        'text-[12px] sm:text-[14px]'

  const textColor = owned
    ? 'text-white'
    : sticker.isCocaCola ? 'text-red-300' : 'text-gray-200'

  return (
    <button
      onPointerDown={startPress}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      onPointerCancel={cancelPress}
      onClick={handleClick}
      title={`${sticker.code} — ${sticker.title}${sticker.isFoil ? ' ✨ FOIL' : ''}${sticker.isCocaCola ? ' 🥤 Coca-Cola' : ''}${owned ? ` · Quantity: ${quantity}` : ''}`}
      style={{ touchAction: 'manipulation' }}
      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg border flex items-center justify-center transition-all duration-150 cursor-pointer select-none
        ${base}
        ${sticker.isFoil ? 'ring-2 ring-yellow-400/60' : sticker.isCocaCola ? 'ring-2 ring-red-400/60' : ''}
        ${isPressing && owned ? 'scale-90 ring-2 ring-red-500/70' : 'active:scale-90'}
        ${!owned && !isPressing ? 'hover:bg-gray-700 hover:border-gray-600' : ''}
      `}
    >
      <span className={`${textColor} ${textSize} leading-none font-mono font-bold transition-colors duration-150`}>
        {label}
      </span>
      {hasDups && (
        <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-orange-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center leading-none px-0.5 shadow-lg shadow-orange-900/50">
          {quantity - 1}
        </span>
      )}
      {isPressing && owned && (
        <span className="absolute inset-0 rounded-md flex items-center justify-center pointer-events-none">
          <span className="text-[10px] text-red-300 font-bold">−</span>
        </span>
      )}
    </button>
  )
}

function TeamSection({ team, stickers, stateStickers, onTap, onLongPress }) {
  const getQuantity = (code) => {
    const entries = Object.values(stateStickers).filter((e) => e.code === code)
    return entries.reduce((s, e) => s + e.quantity, 0)
  }

  const have = stickers.filter((s) => getQuantity(s.code) > 0).length
  const pct = Math.round((have / stickers.length) * 100)
  const isComplete = have === stickers.length

  return (
    <div className={`border rounded-xl p-4 transition-colors ${isComplete ? 'bg-emerald-950/30 border-emerald-800/50' : 'bg-gray-900 border-gray-800'}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{team.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white text-base truncate">{team.name}</p>
            <span className="text-[10px] text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full font-mono shrink-0">{team.code}</span>
            {isComplete && (
              <span className="text-[10px] text-emerald-400 bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 rounded-full shrink-0">✓ Completa</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${isComplete ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={`text-sm whitespace-nowrap ${isComplete ? 'text-emerald-400 font-semibold' : 'text-gray-500'}`}>
              {have}/{stickers.length}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {stickers.map((s) => {
          const qty = getQuantity(s.code)
          return (
            <StickerDot
              key={s.code}
              sticker={s}
              quantity={qty}
              onTap={() => onTap(s)}
              onLongPress={() => onLongPress(s)}
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

  const groups = ['All', ...GROUP_ORDER]

  const getQuantity = (code) => {
    const entries = Object.values(state.stickers).filter((e) => e.code === code)
    return entries.reduce((s, e) => s + e.quantity, 0)
  }

  const handleTap = (sticker) => onAdd(sticker.code, 'base')
  const handleLongPress = (sticker) => onRemove(`${sticker.code}::base`, sticker.code)

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
  const introHave = introStickers.filter((s) => getQuantity(s.code) > 0).length
  const introComplete = introHave === introStickers.length

  return (
    <div className="flex flex-col gap-4">
      {/* Gesture hint */}
      <div className="flex items-center gap-3 px-3 py-2 bg-gray-900/60 border border-gray-800 rounded-xl text-[11px] text-gray-500">
        <span>👆 <span className="text-gray-400">Toca</span> para marcar</span>
        <span className="w-px h-3 bg-gray-700" />
        <span>✋ <span className="text-gray-400">Mantén</span> para quitar</span>
        <span className="w-px h-3 bg-gray-700" />
        <span className="text-orange-400 font-mono font-bold">1</span><span> = sobra para cambio</span>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar equipo..."
        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-emerald-500 transition-colors"
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
            {g === 'All' ? 'Todos' : `Grupo ${g}`}
          </button>
        ))}
      </div>

      {/* Intro section (FWC + Museum) */}
      {(filter === 'All' || filter === 'Have' || filter === 'Need') && groupFilter === 'All' && !search && (
        <div className={`border rounded-xl p-4 transition-colors ${introComplete ? 'bg-emerald-950/30 border-emerald-800/50' : 'bg-gray-900 border-gray-800'}`}>
          <div className="flex items-center gap-2 mb-3">
            <p className="font-semibold text-white text-base">🌍 Opening & FIFA Museum</p>
            <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">00 · FWC1–FWC19</span>
            {introComplete && (
              <span className="text-[10px] text-emerald-400 bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 rounded-full">✓ Completa</span>
            )}
            <span className={`text-xs ml-auto ${introComplete ? 'text-emerald-400 font-semibold' : 'text-gray-500'}`}>
              {introHave}/{introStickers.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {introStickers.map((s) => {
              const qty = getQuantity(s.code)
              return (
                <StickerDot
                  key={s.code}
                  sticker={s}
                  quantity={qty}
                  onTap={() => handleTap(s)}
                  onLongPress={() => handleLongPress(s)}
                />
              )
            })}
          </div>
          <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded ring-2 ring-yellow-400/60 bg-gray-800" />
            = FOIL sticker
          </p>
        </div>
      )}

      {/* Coca-Cola exclusive section */}
      {(filter === 'All' || filter === 'Have' || filter === 'Need') && groupFilter === 'All' && !search && (
        <div className="bg-red-950/20 border border-red-900/40 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🥤</span>
            <p className="font-semibold text-white text-base">Coca-Cola Exclusivos</p>
            <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full ml-1">CC1–CC12</span>
          </div>
          <p className="text-sm text-red-400/70 mb-3">Solo en botellas Coca-Cola 20oz · No en sobres estándar</p>
          <div className="flex flex-wrap gap-1.5">
            {COCA_COLA_STICKERS.map((s) => {
              const qty = getQuantity(s.code)
              return (
                <div key={s.code} className="flex flex-col items-center gap-0.5">
                  <StickerDot
                    sticker={s}
                    quantity={qty}
                    onTap={() => handleTap(s)}
                    onLongPress={() => handleLongPress(s)}
                  />
                  <span className="text-[8px] text-red-500/70 font-mono">{s.code}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1">
            {COCA_COLA_STICKERS.map((s) => {
              const have = getQuantity(s.code) > 0
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
        <p className="text-gray-500 text-center py-8">Ningún equipo coincide con el filtro</p>
      ) : (
        teamSections.map(({ team, stickers }) => (
          <TeamSection
            key={team.code}
            team={team}
            stickers={stickers}
            stateStickers={state.stickers}
            onTap={handleTap}
            onLongPress={handleLongPress}
          />
        ))
      )}

      <div className="h-2" />
    </div>
  )
}
