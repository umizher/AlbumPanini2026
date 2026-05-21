import { PARALLEL_LIST } from '../data/parallels'

export default function TypeSelector({ code, onSelect, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onCancel}>
      <div
        className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl p-5 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Adding sticker</p>
            <h2 className="text-xl font-bold text-white">{code}</h2>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>

        <p className="text-sm text-gray-400 mb-3">Select parallel type:</p>

        <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
          {PARALLEL_LIST.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 ${p.border} bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all text-left`}
            >
              <span className="text-2xl">{p.emoji}</span>
              <div className="min-w-0">
                <p className="font-semibold text-white text-sm leading-tight">{p.name}</p>
                <p className="text-xs text-gray-400 truncate">{p.rarity} · ×{p.multiplier}</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Multiplier = exchange value relative to 1 base sticker
        </p>
      </div>
    </div>
  )
}
