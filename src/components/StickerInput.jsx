import { useState, useRef } from 'react'
import { getStickerInfo, ALBUM_MAP, COCA_COLA_MAP } from '../data/album'
import { getParallel } from '../data/parallels'
import TypeSelector from './TypeSelector'

export default function StickerInput({ onAdd, onRemove, recentlyAdded = [], state }) {
  const [code, setCode] = useState('')
  const [pending, setPending] = useState(null)
  const [mode, setMode] = useState('add') // 'add' | 'remove'
  const [removeResult, setRemoveResult] = useState(null)
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return

    if (mode === 'remove') {
      // Find all entries for this code
      const owned = Object.values(state.stickers).filter((s) => s.code === trimmed)
      if (owned.length === 0) {
        setRemoveResult({ ok: false, msg: `${trimmed} not found in your collection` })
        return
      }
      if (owned.length === 1) {
        onRemove(owned[0].key)
        setRemoveResult({ ok: true, msg: `${trimmed} removed` })
      } else {
        // Multiple parallels — remove the base one first, or show picker
        onRemove(owned[0].key)
        setRemoveResult({ ok: true, msg: `${trimmed} (${getParallel(owned[0].parallelId).name}) removed` })
      }
      setCode('')
      setTimeout(() => { inputRef.current?.focus(); setRemoveResult(null) }, 2000)
      return
    }

    setPending(trimmed)
  }

  const handleSelect = (parallelId) => {
    onAdd(pending, parallelId)
    setPending(null)
    setCode('')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const upper = code.trim().toUpperCase()
  const info = upper.length > 1 ? getStickerInfo(upper) : null
  const isKnownAlbum = upper.length > 1 && !!ALBUM_MAP[upper]
  const isKnownCC = upper.length > 1 && !!COCA_COLA_MAP[upper]
  const isKnown = isKnownAlbum || isKnownCC

  // In remove mode, check if the code is in collection
  const ownedEntries = upper.length > 1
    ? Object.values(state.stickers).filter((s) => s.code === upper)
    : []
  const isOwned = ownedEntries.length > 0

  const isRemove = mode === 'remove'

  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-2 bg-gray-900 border border-gray-800 rounded-2xl p-2">
        <button
          onClick={() => { setMode('add'); setCode(''); setRemoveResult(null) }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${!isRemove ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <span>➕</span> Add sticker
        </button>
        <button
          onClick={() => { setMode('remove'); setCode(''); setRemoveResult(null) }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${isRemove ? 'bg-red-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <span>➖</span> Remove sticker
        </button>
      </div>

      <div className={`rounded-2xl p-5 border ${isRemove ? 'bg-gray-900 border-red-900/50' : 'bg-gray-900 border-gray-800'}`}>
        <h2 className="text-base font-semibold text-gray-300 mb-4">
          {isRemove ? '🗑️ Remove Sticker' : 'Add Sticker'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setRemoveResult(null) }}
              placeholder="e.g. BRA5, FWC1, MUS3, CC1…"
              className={`w-full bg-gray-800 border-2 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-gray-600 outline-none transition-colors uppercase ${isRemove ? 'border-gray-700 focus:border-red-500' : 'border-gray-700 focus:border-emerald-500'}`}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
            {code && (
              <button
                type="button"
                onClick={() => setCode('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg"
              >✕</button>
            )}
          </div>

          {/* Info tag */}
          {info && upper.length > 2 && !removeResult && (
            <div className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
              isRemove
                ? isOwned ? 'bg-red-950 text-red-300' : 'bg-gray-800 text-gray-500'
                : isKnownCC ? 'bg-red-950 text-red-300'
                : isKnownAlbum ? 'bg-emerald-950 text-emerald-400'
                : 'bg-amber-950 text-amber-400'
            }`}>
              <span>
                {isRemove
                  ? isOwned ? '🗑️' : '✕'
                  : isKnown ? (isKnownCC ? '🥤' : '✓') : '?'}
              </span>
              <span>
                {isRemove
                  ? isOwned
                    ? `In your collection — ${ownedEntries.map(e => `${getParallel(e.parallelId).name} ×${e.quantity}`).join(', ')}`
                    : 'Not in your collection'
                  : isKnownCC
                  ? `Coca-Cola Exclusive · ${info.title} (${info.teamCode})`
                  : isKnownAlbum
                  ? `${info.section} · ${info.title}${info.isFoil ? ' ✨ FOIL' : info.isSpecial ? ' (special)' : ''}`
                  : 'Unknown code — will be added as custom'}
              </span>
            </div>
          )}

          {/* Remove result feedback */}
          {removeResult && (
            <div className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${removeResult.ok ? 'bg-emerald-950 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>
              <span>{removeResult.ok ? '✓' : '✕'}</span>
              <span>{removeResult.msg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!code.trim() || (isRemove && !isOwned && upper.length > 2)}
            className={`w-full disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-xl transition-colors text-base active:scale-95 ${isRemove ? 'bg-red-700 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-500'}`}
          >
            {isRemove ? '🗑️ Remove →' : 'Add Sticker →'}
          </button>
        </form>
      </div>

      {/* Recently added list */}
      {!isRemove && recentlyAdded.length > 0 && (
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Recently Added</h3>
          <div className="flex flex-col gap-2">
            {recentlyAdded.slice(0, 8).map(({ code, parallelId, parallel, info, addedAt }, i) => (
              <div key={`${code}-${addedAt}-${i}`} className="flex items-center gap-3 animate-pop">
                <span className="text-lg">{parallel.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-mono font-bold text-white text-sm">{code}</span>
                  <span className="text-gray-500 text-xs ml-2">{info?.section}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${parallel.bg} text-white`}>{parallel.name}</span>
                <button
                  onClick={() => {
                    const key = `${code}::${parallelId}`
                    onRemove(key)
                  }}
                  className="text-gray-600 hover:text-red-400 transition-colors text-base leading-none px-1"
                  title="Undo / remove this sticker"
                >↩</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {pending && (
        <TypeSelector code={pending} onSelect={handleSelect} onCancel={() => { setPending(null); inputRef.current?.focus() }} />
      )}
    </div>
  )
}
