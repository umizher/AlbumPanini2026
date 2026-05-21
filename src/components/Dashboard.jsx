import { TOTAL_STICKERS } from '../data/album'

function StatCard({ label, value, sub, color = 'text-white' }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-1">
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  )
}

function ProgressRing({ pct }) {
  const r = 72
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#1f2937" strokeWidth="12" />
        <circle
          cx="90" cy="90" r={r} fill="none"
          stroke="#10b981" strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-black text-white">{pct.toFixed(1)}%</p>
        <p className="text-xs text-gray-500">complete</p>
      </div>
    </div>
  )
}

export default function Dashboard({ haveAlbum, needList, duplicates, totalTradeValue, completionPct, entries }) {
  const totalDuplicates = duplicates.reduce((s, d) => s + d.extraQty, 0)

  return (
    <div className="flex flex-col gap-5">
      {/* Progress ring */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center gap-2">
        <ProgressRing pct={completionPct} />
        <p className="text-gray-400 text-sm">
          <span className="text-white font-bold">{haveAlbum.length}</span> / {TOTAL_STICKERS} stickers collected
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Have"
          value={haveAlbum.length}
          sub="unique stickers"
          color="text-emerald-400"
        />
        <StatCard
          label="Need"
          value={needList.length}
          sub="still missing"
          color="text-red-400"
        />
        <StatCard
          label="Duplicates"
          value={totalDuplicates}
          sub="available to trade"
          color="text-amber-400"
        />
        <StatCard
          label="Trade Value"
          value={`${totalTradeValue}`}
          sub="base sticker units"
          color="text-blue-400"
        />
      </div>

      {/* Tips */}
      {needList.length > 0 && totalTradeValue > 0 && (
        <div className="bg-blue-950/50 border border-blue-900 rounded-2xl p-4">
          <p className="text-blue-300 text-sm font-semibold mb-1">💡 Trade Tip</p>
          <p className="text-blue-200 text-xs">
            Your duplicates are worth <strong>{totalTradeValue}</strong> base stickers.
            You still need <strong>{needList.length}</strong> stickers.
            Use the <strong>Trade</strong> tab to see which duplicates to offer first.
          </p>
        </div>
      )}

      {needList.length === 0 && haveAlbum.length === TOTAL_STICKERS && (
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-emerald-300 font-bold text-lg">Album Complete!</p>
          <p className="text-emerald-500 text-sm">Congratulations! You collected all {TOTAL_STICKERS} stickers.</p>
        </div>
      )}
    </div>
  )
}
