import { useState, useRef } from 'react'
import { getStickerInfo, ALBUM_MAP } from '../data/album'
import TypeSelector from './TypeSelector'

export default function StickerInput({ onAdd, recentlyAdded = [] }) {
  const [code, setCode] = useState('')
  const [pending, setPending] = useState(null)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return
    setError('')
    setPending(trimmed)
  }

  const handleSelect = (parallelId) => {
    onAdd(pending, parallelId)
    setPending(null)
    setCode('')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleCancel = () => {
    setPending(null)
    inputRef.current?.focus()
  }

  const info = code.trim() ? getStickerInfo(code.trim().toUpperCase()) : null
  const isKnown = code.trim() ? !!ALBUM_MAP[code.trim().toUpperCase()] : false

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
        <h2 className="text-base font-semibold text-gray-300 mb-4">Add Sticker</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setError('') }}
              placeholder="e.g. BRA5 or USA12 or OPN1"
              className="w-full bg-gray-800 border-2 border-gray-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-lg font-mono text-white placeholder-gray-600 outline-none transition-colors uppercase"
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

          {info && code.trim().length > 2 && (
            <div className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${isKnown ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
              <span>{isKnown ? '✓' : '?'}</span>
              <span>
                {isKnown
                  ? `${info.section} · ${info.title}${info.isSpecial ? ' (special)' : ''}`
                  : 'Unknown code — will be added as custom'}
              </span>
            </div>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!code.trim()}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-xl transition-colors text-base active:scale-95"
          >
            Add Sticker →
          </button>
        </form>
      </div>

      {recentlyAdded.length > 0 && (
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
              </div>
            ))}
          </div>
        </div>
      )}

      {pending && (
        <TypeSelector code={pending} onSelect={handleSelect} onCancel={handleCancel} />
      )}
    </div>
  )
}
