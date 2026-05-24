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
            <p className="text-sm text-gray-400 uppercase tracking-widest">Got a new sticker!</p>
            <h2 className="text-xl font-bold text-white">{code}</h2>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">{parallel.emoji}</span>
          <span className={`text-sm px-2 py-0.5 rounded-full ${parallel.bg} text-white`}>{parallel.name}</span>
          {info?.title && <span className="text-sm text-gray-400 truncate">{info.title}</span>}
        </div>

        {parallel.multiplier >= 8 && (
          <div className="mb-4 bg-orange-950/50 border border-orange-700 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span className="text-xl">{parallel.multiplier >= 20 ? '💎' : '🔥'}</span>
            <div>
              <p className="text-sm font-bold text-orange-300">
                {parallel.multiplier >= 20 ? 'Ultra Rare!' : 'High Value Parallel!'}
              </p>
              <p className="text-xs text-orange-400/80">
                Worth {parallel.multiplier}× a base sticker — check eBay before trading
              </p>
            </div>
          </div>
        )}

        <p className="text-base font-semibold text-gray-300 mb-3">Is this for your album or for trading?</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onPaste}
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-emerald-700 bg-emerald-950/30 hover:bg-emerald-950/60 active:scale-[0.98] transition-all text-left"
          >
            <span className="text-2xl">📌</span>
            <div>
              <p className="font-semibold text-white text-base">Paste in album</p>
              <p className="text-sm text-gray-400">I need this one — adding it to my album</p>
            </div>
          </button>

          <button
            onClick={onTrade}
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-amber-700 bg-amber-950/30 hover:bg-amber-950/60 active:scale-[0.98] transition-all text-left"
          >
            <span className="text-2xl">🔄</span>
            <div>
              <p className="font-semibold text-white text-base">Set for trade</p>
              <p className="text-sm text-gray-400">I already have this one — keep it for trading</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
