import { useState } from 'react'

const SOURCES = [
  { id: 'walgreens', label: 'Walgreens', icon: '🏪', border: 'border-red-600', bg: 'bg-red-950/30' },
  { id: 'costco', label: 'Costco', icon: '🏬', border: 'border-blue-600', bg: 'bg-blue-950/30' },
  { id: 'amazon', label: 'Amazon', icon: '📦', border: 'border-orange-500', bg: 'bg-orange-950/30' },
  { id: 'other', label: 'Otro', icon: '🎴', border: 'border-gray-600', bg: 'bg-gray-800' },
  { id: 'trade', label: 'Intercambio', icon: '🤝', border: 'border-emerald-600', bg: 'bg-emerald-950/30' },
]

export { SOURCES }

// batchSize > 0 shows pack count selector (for store sources)
// defaultSource pre-selects the last used source
export default function SourcePicker({ batchSize = 0, defaultSource = null, onSelect, onCancel }) {
  const [selected, setSelected] = useState(defaultSource)
  const [packCount, setPackCount] = useState(() => Math.max(1, Math.ceil(batchSize / 7)))

  const isStore = selected && selected !== 'trade'

  const handleConfirm = () => {
    if (!selected) return
    onSelect(selected, isStore && batchSize > 0 ? packCount : 0)
  }

  const src = SOURCES.find((s) => s.id === selected)

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            {batchSize > 0 && (
              <p className="text-sm text-gray-400 uppercase tracking-widest">{batchSize} sticker{batchSize !== 1 ? 's' : ''}</p>
            )}
            <h2 className="text-xl font-bold text-white">¿De dónde viene{batchSize > 1 ? 'n' : ''}?</h2>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          {SOURCES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all active:scale-[0.98] text-left ${
                selected === s.id ? `${s.border} ${s.bg}` : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="font-semibold text-white text-base flex-1">{s.label}</span>
              {selected === s.id && <span className="text-emerald-400 text-lg">✓</span>}
            </button>
          ))}
        </div>

        {isStore && batchSize > 0 && (
          <div className="bg-gray-800 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-300">¿Cuántos sobres abriste?</p>
              <p className="text-xs text-gray-500">Actualiza el contador automáticamente</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPackCount((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-lg bg-gray-700 text-white font-bold text-xl leading-none flex items-center justify-center hover:bg-gray-600"
              >−</button>
              <span className="w-10 text-center font-bold text-white text-lg">{packCount}</span>
              <button
                onClick={() => setPackCount((p) => p + 1)}
                className="w-9 h-9 rounded-lg bg-gray-700 text-white font-bold text-xl leading-none flex items-center justify-center hover:bg-gray-600"
              >+</button>
            </div>
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3.5 rounded-xl transition-colors text-base active:scale-95"
        >
          {selected ? `Continuar con ${src?.label} →` : 'Selecciona una fuente'}
        </button>
      </div>
    </div>
  )
}
