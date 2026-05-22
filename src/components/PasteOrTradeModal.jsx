import { getStickerInfo } from '../data/album'
import { getParallel } from '../data/parallels'

export default function PasteOrTradeModal({ code, parallelId, onPaste, onTrade, onCancel }) {
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
