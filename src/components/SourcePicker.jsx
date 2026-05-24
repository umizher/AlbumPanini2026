import { useState } from 'react'

const SOURCES = [
  { id: 'walgreens', label: 'Walgreens', icon: '🏪', border: 'border-red-600', bg: 'bg-red-950/30' },
  { id: 'costco', label: 'Costco', icon: '🏬', border: 'border-blue-600', bg: 'bg-blue-950/30' },
  { id: 'amazon', label: 'Amazon', icon: '📦', border: 'border-orange-500', bg: 'bg-orange-950/30' },
  { id: 'other', label: 'Otro', icon: '🎴', border: 'border-gray-600', bg: 'bg-gray-800' },
  { id: 'trade', label: 'Intercambio', icon: '🤝', border: 'border-emerald-600', bg: 'bg-emerald-950/30' },
]

export { SOURCES }

export default function SourcePicker({ defaultSource = null, onSelect, onCancel }) {
  const [selected, setSelected] = useState(defaultSource)
  const src = SOURCES.find((s) => s.id === selected)

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">¿De dónde viene?</h2>
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

        <button
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3.5 rounded-xl transition-colors text-base active:scale-95"
        >
          {selected ? `Continuar con ${src?.label} →` : 'Selecciona una fuente'}
        </button>
      </div>
    </div>
  )
}
