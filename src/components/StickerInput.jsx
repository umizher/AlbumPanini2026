import { useState, useRef } from 'react'
import { getStickerInfo, ALBUM_MAP, COCA_COLA_MAP } from '../data/album'
import { getParallel } from '../data/parallels'
import { makeKey } from '../hooks/useCollection'
import TypeSelector from './TypeSelector'
import PasteOrTradeModal from './PasteOrTradeModal'
import SourcePicker, { SOURCES } from './SourcePicker'

const STORE_SOURCES = SOURCES.filter((s) => s.id !== 'trade')

function ParallelPicker({ code, entries, onSelect, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">¿Cuál variante quitar?</p>
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
                  <p className="text-sm text-gray-400">{p.rarity} · ×{p.multiplier} · {entry.quantity} en colección</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function StickerInput({ onAdd, onRemove, recentlyAdded = [], state, externalPending = false, onToast, onPackUpdate }) {
  const [code, setCode] = useState('')
  const [mode, setMode] = useState('add') // 'add' | 'pack' | 'remove'

  // Shared batch processing
  const [batch, setBatch] = useState(null)
  const [batchSource, setBatchSource] = useState(null)
  const [pendingIntent, setPendingIntent] = useState(null)
  const [pendingRemoveEntries, setPendingRemoveEntries] = useState(null)

  // Source memory (persists across mode switches)
  const [lastSource, setLastSource] = useState(null)

  // Add mode: SourcePicker modal after submit
  const [pendingSource, setPendingSource] = useState(false)

  // Pack mode phases: 'source' | 'input'
  const [packPhase, setPackPhase] = useState('source')
  const [packSource, setPackSource] = useState(null)

  // Pack stats tracked via ref to avoid stale closure issues
  const packStatsRef = useRef({ news: 0, dupes: 0 })

  const inputRef = useRef(null)
  const packInputRef = useRef(null)

  const getSourceMeta = (id) => SOURCES.find((s) => s.id === id)

  // ── Queue advancement — handles end-of-batch for both modes ──
  const advanceQueue = (queue, total) => {
    if (queue.length > 0) {
      setBatch({ queue, total })
    } else {
      setBatch(null)
      if (mode === 'pack') {
        const src = getSourceMeta(packSource)
        const { news, dupes } = packStatsRef.current
        onToast?.(
          `📦 ${src?.label ?? 'Sobre'} · ${news} nueva${news !== 1 ? 's' : ''} · ${dupes} repetida${dupes !== 1 ? 's' : ''}`,
          'success'
        )
        setPackPhase('source')
        setPackSource(null)
      } else {
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }
  }

  // ── Mode switch — resets all transient state ──
  const switchMode = (newMode) => {
    setMode(newMode)
    setCode('')
    setBatch(null)
    setPendingSource(false)
    setPendingIntent(null)
    if (newMode === 'pack') setPackPhase('source')
  }

  // ── REMOVE mode ──
  const handleSubmitRemove = (e) => {
    e.preventDefault()
    const raw = code.trim().toUpperCase()
    if (!raw) return
    const owned = Object.values(state.stickers).filter((s) => s.code === raw)
    if (owned.length === 0) { onToast?.(`${raw} no está en tu colección`, 'error'); return }
    if (owned.length === 1) { onRemove(owned[0].key, raw) }
    else { setPendingRemoveEntries({ code: raw, entries: owned }) }
    setCode('')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // ── ADD mode ──
  const handleSubmitAdd = (e) => {
    e.preventDefault()
    if (externalPending) return
    const raw = code.trim().toUpperCase()
    if (!raw) return
    const codes = raw.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean)
    if (codes.length === 0) return
    setBatch({ queue: codes, total: codes.length })
    setPendingSource(true)
    setCode('')
  }

  const handleAddSourceSelect = (source) => {
    setBatchSource(source)
    setLastSource(source)
    setPendingSource(false)
  }

  // ── PACK mode ──
  const handlePackSourceSelect = (sourceId) => {
    setPackSource(sourceId)
    setLastSource(sourceId)
    onPackUpdate?.(sourceId, 1) // always +1 pack, no question asked
    setPackPhase('input')
    setTimeout(() => packInputRef.current?.focus(), 100)
  }

  const handlePackSubmit = (e) => {
    e.preventDefault()
    const raw = code.trim().toUpperCase()
    if (!raw) return
    const codes = raw.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean)
    if (codes.length === 0) return
    packStatsRef.current = { news: 0, dupes: 0 }
    setBatchSource(packSource)
    setBatch({ queue: codes, total: codes.length })
    setCode('')
  }

  // ── Shared batch/intent handlers ──
  const handleBatchSelect = (parallelId) => {
    const currentCode = batch.queue[0]
    const remaining = batch.queue.slice(1)
    const isAlreadyOwned = Object.values(state.stickers).some((e) => e.code === currentCode)
    const source = batchSource

    if (isAlreadyOwned) {
      packStatsRef.current.dupes++
      onAdd(currentCode, parallelId, source)
      advanceQueue(remaining, batch.total)
    } else {
      packStatsRef.current.news++
      setBatch(null)
      setPendingIntent({ code: currentCode, parallelId, queue: remaining, total: batch.total, source })
    }
  }

  const handlePaste = () => {
    const { code: c, parallelId, queue, total, source } = pendingIntent
    onAdd(c, parallelId, source)
    setPendingIntent(null)
    advanceQueue(queue, total)
  }

  const handleTrade = () => {
    const { code: c, parallelId, queue, total, source } = pendingIntent
    onAdd(c, parallelId, source)
    onAdd(c, parallelId, source)
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

  // ── Computed display values ──
  const upper = code.trim().toUpperCase()
  const rawCodes = upper.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean)
  const isBatch = rawCodes.length > 1
  const primaryCode = rawCodes[0] || ''
  const info = primaryCode.length > 0 ? getStickerInfo(primaryCode) : null
  const isKnownAlbum = primaryCode.length > 0 && !!ALBUM_MAP[primaryCode]
  const isKnownCC = primaryCode.length > 0 && !!COCA_COLA_MAP[primaryCode]
  const isKnown = isKnownAlbum || isKnownCC
  const ownedEntries = mode === 'remove' && primaryCode
    ? Object.values(state.stickers).filter((s) => s.code === primaryCode)
    : []
  const isOwned = ownedEntries.length > 0

  return (
    <div className="flex flex-col gap-4">

      {/* ── 3-tab mode toggle ── */}
      <div className="flex gap-1.5 bg-gray-900 border border-gray-800 rounded-2xl p-1.5">
        <button
          onClick={() => switchMode('add')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${mode === 'add' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          ➕ Agregar
        </button>
        <button
          onClick={() => switchMode('pack')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${mode === 'pack' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          📦 Sobre
        </button>
        <button
          onClick={() => switchMode('remove')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${mode === 'remove' ? 'bg-red-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
          ➖ Quitar
        </button>
      </div>

      {/* ── PACK MODE ── */}
      {mode === 'pack' && (
        <>
          {/* Phase: source selection (inline, no modal) */}
          {packPhase === 'source' && (
            <div className="bg-gray-900 border border-blue-900/50 rounded-2xl p-5">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-3 font-semibold">📦 Abrir sobre — ¿De dónde?</p>
              <div className="flex flex-col gap-2">
                {STORE_SOURCES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handlePackSourceSelect(s.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all active:scale-[0.98] text-left ${
                      lastSource === s.id
                        ? `${s.border} ${s.bg}`
                        : 'border-gray-700 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <span className="font-semibold text-white text-base flex-1">{s.label}</span>
                    {lastSource === s.id
                      ? <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full">Última usada</span>
                      : null}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Phase: code input (only shown when no batch or intent active) */}
          {packPhase === 'input' && !batch && !pendingIntent && (
            <div className="bg-gray-900 border border-blue-900/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{getSourceMeta(packSource)?.icon}</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Sobre abierto · +1 al contador</p>
                  <p className="text-base font-bold text-white">{getSourceMeta(packSource)?.label}</p>
                </div>
                <button
                  onClick={() => { setPackPhase('source'); setPackSource(null) }}
                  className="text-xs text-gray-500 hover:text-gray-300 underline"
                >
                  Cambiar
                </button>
              </div>

              <form onSubmit={handlePackSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    ref={packInputRef}
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="BRA5 MEX3 ARG1 FWC2 … (7 códigos)"
                    className="w-full bg-gray-800 border-2 border-blue-900 focus:border-blue-500 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-gray-600 outline-none transition-colors uppercase"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                  />
                  {code && (
                    <button type="button" onClick={() => setCode('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg">✕</button>
                  )}
                </div>

                {rawCodes.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-950/40 rounded-lg">
                    <span className="text-blue-400 font-bold text-base">{rawCodes.length}</span>
                    <span className="text-blue-300 text-sm">código{rawCodes.length !== 1 ? 's' : ''} ingresado{rawCodes.length !== 1 ? 's' : ''}</span>
                    {rawCodes.length === 7 && <span className="ml-auto text-emerald-400 text-sm font-semibold">✓ Sobre completo</span>}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={rawCodes.length === 0}
                  className="w-full disabled:bg-gray-700 disabled:text-gray-500 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors text-base active:scale-95"
                >
                  {rawCodes.length > 0 ? `Procesar ${rawCodes.length} baraja${rawCodes.length !== 1 ? 's' : ''} →` : 'Ingresa los códigos arriba'}
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {/* ── ADD MODE ── */}
      {mode === 'add' && (
        <>
          {externalPending && (
            <div className="bg-blue-950/50 border border-blue-900 rounded-xl p-3 flex items-center gap-2">
              <span>⏳</span>
              <span className="text-sm text-blue-300">Selecciona el tipo de paralelo en el panel de arriba.</span>
            </div>
          )}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-base font-semibold text-gray-300 mb-4">Agregar Baraja</h2>
            <form onSubmit={handleSubmitAdd} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ej. BRA5, FWC1, CC1…"
                  className="w-full bg-gray-800 border-2 border-gray-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-gray-600 outline-none transition-colors uppercase"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  disabled={externalPending}
                />
                {code && <button type="button" onClick={() => setCode('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg">✕</button>}
              </div>

              {upper.length > 0 && (
                isBatch ? (
                  <div className="text-sm px-3 py-2 rounded-lg flex items-center gap-2 bg-emerald-950 text-emerald-400">
                    <span>📦</span><span>{rawCodes.length} stickers: {rawCodes.join(', ')}</span>
                  </div>
                ) : info && primaryCode ? (
                  <div className={`text-sm px-3 py-2 rounded-lg flex items-center gap-2 ${isKnownCC ? 'bg-red-950 text-red-300' : isKnownAlbum ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                    <span>{isKnown ? (isKnownCC ? '🥤' : '✓') : '?'}</span>
                    <span className="flex-1 truncate">
                      {isKnownCC
                        ? `Coca-Cola · ${info.title}`
                        : isKnownAlbum
                        ? `${info.section} · ${info.title}${info.isFoil ? ' ✨' : ''}`
                        : 'Código desconocido — se guarda como custom'}
                    </span>
                  </div>
                ) : null
              )}

              <button
                type="submit"
                disabled={upper.length === 0 || externalPending}
                className="w-full disabled:bg-gray-700 disabled:text-gray-500 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-colors text-base active:scale-95"
              >
                {externalPending ? 'Selecciona paralelo arriba ↑' : isBatch ? `Agregar ${rawCodes.length} barajas →` : 'Agregar →'}
              </button>
            </form>
          </div>
        </>
      )}

      {/* ── REMOVE MODE ── */}
      {mode === 'remove' && (
        <div className="bg-gray-900 border border-red-900/50 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-gray-300 mb-4">🗑️ Quitar Baraja</h2>
          <form onSubmit={handleSubmitRemove} className="flex flex-col gap-3">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ej. BRA5"
                className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-gray-600 outline-none transition-colors uppercase"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
              />
              {code && <button type="button" onClick={() => setCode('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg">✕</button>}
            </div>
            {upper.length > 0 && info && (
              <div className={`text-sm px-3 py-2 rounded-lg flex items-center gap-2 ${isOwned ? 'bg-red-950 text-red-300' : 'bg-gray-800 text-gray-500'}`}>
                <span>{isOwned ? '🗑️' : '✕'}</span>
                <span className="flex-1 truncate">
                  {isOwned
                    ? `En colección — ${ownedEntries.map((e) => `${getParallel(e.parallelId).name} ×${e.quantity}`).join(', ')}`
                    : 'No está en tu colección'}
                </span>
              </div>
            )}
            <button
              type="submit"
              disabled={upper.length === 0 || !isOwned}
              className="w-full disabled:bg-gray-700 disabled:text-gray-500 bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors text-base active:scale-95"
            >
              🗑️ Quitar →
            </button>
          </form>
        </div>
      )}

      {/* ── Recently added (add + pack modes) ── */}
      {mode !== 'remove' && recentlyAdded.length > 0 && (
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h3 className="text-base font-semibold text-gray-400 mb-3">Recién Agregadas</h3>
          <div className="flex flex-col gap-2">
            {recentlyAdded.slice(0, 8).map(({ code: c, parallelId, parallel, info: si, addedAt }, i) => (
              <div key={`${c}-${addedAt}-${i}`} className="flex items-center gap-3 animate-pop">
                <span className="text-lg">{parallel.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-mono font-bold text-white text-base">{c}</span>
                  <span className="text-gray-500 text-sm ml-2">{si?.section}</span>
                </div>
                <span className={`text-sm px-2 py-0.5 rounded-full ${parallel.bg} text-white`}>{parallel.name}</span>
                <button
                  onClick={() => onRemove(makeKey(c, parallelId), c)}
                  className="text-gray-600 hover:text-red-400 transition-colors text-base leading-none px-1 flex-shrink-0"
                  title="Deshacer"
                >↩</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SourcePicker modal (add mode only, after submit) ── */}
      {batch && pendingSource && !externalPending && (
        <SourcePicker
          defaultSource={lastSource}
          onSelect={handleAddSourceSelect}
          onCancel={() => { setBatch(null); setCode(''); setPendingSource(false); setTimeout(() => inputRef.current?.focus(), 100) }}
        />
      )}

      {/* ── TypeSelector (shared for add + pack processing) ── */}
      {batch && !pendingSource && !externalPending && (
        <TypeSelector
          code={batch.queue[0]}
          progress={batch.total > 1 ? `${batch.total - batch.queue.length + 1} de ${batch.total}` : null}
          onSelect={handleBatchSelect}
          onCancel={() => { setBatch(null); setCode('') }}
        />
      )}

      {/* ── PasteOrTradeModal ── */}
      {pendingIntent && (
        <PasteOrTradeModal
          code={pendingIntent.code}
          parallelId={pendingIntent.parallelId}
          onPaste={handlePaste}
          onTrade={handleTrade}
          onCancel={handleCancelIntent}
        />
      )}

      {/* ── ParallelPicker for multi-variant remove ── */}
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
