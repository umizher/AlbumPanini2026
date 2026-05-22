import { useState, useRef } from 'react'
import { getStickerInfo, ALBUM_MAP, COCA_COLA_MAP } from '../data/album'
import { getParallel } from '../data/parallels'
import TypeSelector from './TypeSelector'

function ParallelPicker({ code, entries, onSelect, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Remove which variant?</p>
            <h2 className="text-xl font-bold text-white">{code}</h2>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        <div className="flex flex-col gap-2">
          {entries.map((entry) => {
            const p = getParallel(entry.parallelId)
            return (
              <button
                key={entry.key}
                onClick={() => onSelect(entry)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 ${p.border} bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all text-left`}
              >
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.rarity} · ×{p.multiplier} · {entry.quantity} owned</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PasteOrTradeModal({ code, parallelId, onPaste, onTrade, onCancel }) {
  const parallel = getParallel(parallelId)
  const info = getStickerInfo(code)
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">New sticker</p>
            <h2 className="text-xl font-bold text-white">{code}</h2>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-lg">{parallel.emoji}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${parallel.bg} text-white`}>{parallel.name}</span>
          {info?.title && <span className="text-xs text-gray-400 truncate">{info.title}</span>}
        </div>

        <p className="text-sm font-semibold text-gray-300 mb-3">What do you want to do with this sticker?</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onPaste}
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-emerald-700 bg-emerald-950/30 hover:bg-emerald-950/60 active:scale-[0.98] transition-all text-left"
          >
            <span className="text-2xl">📌</span>
            <div>
              <p className="font-semibold text-white">Paste in album</p>
              <p className="text-xs text-gray-400">It's new — I need this one for my album</p>
            </div>
          </button>

          <button
            onClick={onTrade}
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-amber-700 bg-amber-950/30 hover:bg-amber-950/60 active:scale-[0.98] transition-all text-left"
          >
            <span className="text-2xl">🔄</span>
            <div>
              <p className="font-semibold text-white">Set for trade</p>
              <p className="text-xs text-gray-400">Already have it pasted — this one's for exchange</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function StickerInput({ onAdd, onRemove, recentlyAdded = [], state, externalPending = false, onToast }) {
  const [code, setCode] = useState('')
  const [batch, setBatch] = useState(null)
  const [pendingIntent, setPendingIntent] = useState(null) // { code, parallelId, queue, total }
  const [pendingRemoveEntries, setPendingRemoveEntries] = useState(null)
  const [mode, setMode] = useState('add')
  const inputRef = useRef(null)

  const advanceQueue = (queue, total) => {
    if (queue.length > 0) {
      setBatch({ queue, total })
    } else {
      setBatch(null)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const raw = code.trim().toUpperCase()
    if (!raw) return

    if (mode === 'remove') {
      const owned = Object.values(state.stickers).filter((s) => s.code === raw)
      if (owned.length === 0) {
        onToast?.(`${raw} not in collection`, 'error')
        return
      }
      if (owned.length === 1) {
        onRemove(owned[0].key, raw)
      } else {
        setPendingRemoveEntries({ code: raw, entries: owned })
      }
      setCode('')
      setTimeout(() => inputRef.current?.focus(), 100)
      return
    }

    if (externalPending) return

    const codes = raw.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean)
    if (codes.length === 0) return
    setBatch({ queue: codes, total: codes.length })
    setCode('')
  }

  // After parallel is selected: check if code is already in collection
  const handleBatchSelect = (parallelId) => {
    const currentCode = batch.queue[0]
    const remaining = batch.queue.slice(1)
    const isAlreadyOwned = Object.values(state.stickers).some((e) => e.code === currentCode)

    if (isAlreadyOwned) {
      // Already have one → this is a duplicate, add directly to trade pile
      onAdd(currentCode, parallelId)
      advanceQueue(remaining, batch.total)
    } else {
      // First time seeing this code → ask: paste or trade?
      setBatch(null)
      setPendingIntent({ code: currentCode, parallelId, queue: remaining, total: batch.total })
    }
  }

  const handlePaste = () => {
    const { code: c, parallelId, queue, total } = pendingIntent
    onAdd(c, parallelId) // qty 1 → album
    setPendingIntent(null)
    advanceQueue(queue, total)
  }

  const handleTrade = () => {
    const { code: c, parallelId, queue, total } = pendingIntent
    onAdd(c, parallelId) // first copy (album)
    onAdd(c, parallelId) // second copy → spare for trade
    setPendingIntent(null)
    advanceQueue(queue, total)
  }

  const handleCancelIntent = () => {
    const { queue, total } = pendingIntent
    setPendingIntent(null)
    advanceQueue(queue, total)
  }

  const handleRemoveEntry = (entry) => {
    onRemove(entry.key, `${entry.code} (${getParallel(entry.parallelId).name})`)
    setPendingRemoveEntries(null)
    setCode('')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const upper = code.trim().toUpperCase()
  const rawCodes = upper.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean)
  const isBatch = rawCodes.length > 1
  const primaryCode = rawCodes[0] || ''
  const info = primaryCode.length > 0 ? getStickerInfo(primaryCode) : null
  const isKnownAlbum = primaryCode.length > 0 && !!ALBUM_MAP[primaryCode]
  const isKnownCC = primaryCode.length > 0 && !!COCA_COLA_MAP[primaryCode]
  const isKnown = isKnownAlbum || isKnownCC
  const isRemove = mode === 'remove'
  const ownedEntries = primaryCode.length > 0 && isRemove
    ? Object.values(state.stickers).filter((s) => s.code === primaryCode)
    : []
  const isOwned = ownedEntries.length > 0

  const canSubmit = upper.length > 0 && !(externalPending && !isRemove) && (!isRemove || isOwned)

  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-2 bg-gray-900 border border-gray-800 rounded-2xl p-2">
        <button
          onClick={() => { setMode('add'); setCode('') }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${!isRemove ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          ➕ Add sticker
        </button>
        <button
          onClick={() => { setMode('remove'); setCode('') }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${isRemove ? 'bg-red-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          ➖ Remove sticker
        </button>
      </div>

      {/* External pending banner */}
      {externalPending && !isRemove && (
        <div className="bg-blue-950/50 border border-blue-900 rounded-xl p-3 text-xs text-blue-300 flex items-center gap-2">
          <span>⏳</span>
          <span>Select the parallel type in the panel above to add the sticker from your wishlist.</span>
        </div>
      )}

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
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. BRA5, FWC1, FWC12, CC1…"
              className={`w-full bg-gray-800 border-2 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-gray-600 outline-none transition-colors uppercase ${isRemove ? 'border-gray-700 focus:border-red-500' : 'border-gray-700 focus:border-emerald-500'}`}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              disabled={externalPending && !isRemove}
            />
            {code && (
              <button type="button" onClick={() => setCode('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg">✕</button>
            )}
          </div>

          {/* Info tag */}
          {upper.length > 0 && !isRemove && (
            isBatch ? (
              <div className="text-xs px-3 py-2 rounded-lg flex items-center gap-2 bg-emerald-950 text-emerald-400">
                <span>📦</span>
                <span>{rawCodes.length} stickers: {rawCodes.join(', ')}</span>
              </div>
            ) : info && primaryCode.length > 0 ? (
              <div className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
                isKnownCC ? 'bg-red-950 text-red-300'
                : isKnownAlbum ? 'bg-emerald-950 text-emerald-400'
                : 'bg-amber-950 text-amber-400'
              }`}>
                <span>{isKnown ? (isKnownCC ? '🥤' : '✓') : '?'}</span>
                <span className="flex-1 truncate">
                  {isKnownCC
                    ? `Coca-Cola Exclusive · ${info.title} (${info.teamCode})`
                    : isKnownAlbum
                    ? `${info.section} · ${info.title}${info.isFoil ? ' ✨ FOIL' : info.isSpecial ? ' · special' : ''}`
                    : 'Unknown code — will be saved as custom'}
                </span>
              </div>
            ) : null
          )}
          {/* Remove info tag */}
          {upper.length > 0 && isRemove && info && (
            <div className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
              isOwned ? 'bg-red-950 text-red-300' : 'bg-gray-800 text-gray-500'
            }`}>
              <span>{isOwned ? '🗑️' : '✕'}</span>
              <span className="flex-1 truncate">
                {isOwned
                  ? `In collection — ${ownedEntries.map((e) => `${getParallel(e.parallelId).name} ×${e.quantity}`).join(', ')}`
                  : 'Not in your collection'}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-xl transition-colors text-base active:scale-95 ${isRemove ? 'bg-red-700 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-500'}`}
          >
            {isRemove ? '🗑️ Remove →' : externalPending ? 'Select parallel type above ↑' : isBatch ? `Add ${rawCodes.length} Stickers →` : 'Add Sticker →'}
          </button>
        </form>
      </div>

      {/* Recently added */}
      {!isRemove && recentlyAdded.length > 0 && (
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Recently Added</h3>
          <div className="flex flex-col gap-2">
            {recentlyAdded.slice(0, 8).map(({ code: c, parallelId, parallel, info: si, addedAt }, i) => (
              <div key={`${c}-${addedAt}-${i}`} className="flex items-center gap-3 animate-pop">
                <span className="text-lg">{parallel.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-mono font-bold text-white text-sm">{c}</span>
                  <span className="text-gray-500 text-xs ml-2">{si?.section}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${parallel.bg} text-white`}>{parallel.name}</span>
                <button
                  onClick={() => onRemove(`${c}::${parallelId}`, c)}
                  className="text-gray-600 hover:text-red-400 transition-colors text-base leading-none px-1 flex-shrink-0"
                  title="Undo"
                >↩</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parallel type selector (batch flow) */}
      {batch && !externalPending && (
        <TypeSelector
          code={batch.queue[0]}
          progress={batch.total > 1 ? `${batch.total - batch.queue.length + 1} of ${batch.total}` : null}
          onSelect={handleBatchSelect}
          onCancel={() => { setBatch(null); setCode(''); setTimeout(() => inputRef.current?.focus(), 100) }}
        />
      )}

      {/* Paste or trade decision (only for new stickers) */}
      {pendingIntent && (
        <PasteOrTradeModal
          code={pendingIntent.code}
          parallelId={pendingIntent.parallelId}
          onPaste={handlePaste}
          onTrade={handleTrade}
          onCancel={handleCancelIntent}
        />
      )}

      {/* Parallel picker for remove with multiple variants */}
      {pendingRemoveEntries && (
        <ParallelPicker
          code={pendingRemoveEntries.code}
          entries={pendingRemoveEntries.entries}
          onSelect={handleRemoveEntry}
          onCancel={() => setPendingRemoveEntries(null)}
        />
      )}
    </div>
  )
}
