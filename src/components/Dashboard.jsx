import { TOTAL_STICKERS, TOTAL_FOIL_STICKERS, COCA_COLA_STICKERS } from '../data/album'

function StatCard({ label, value, sub, color = 'text-white', badge }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        {badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-400">{badge}</span>}
      </div>
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

function MiniProgress({ label, have, total, color = 'bg-emerald-500', icon }) {
  const pct = total > 0 ? Math.round((have / total) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-lg">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">{label}</span>
          <span className="text-xs font-semibold text-gray-300">{have}/{total}</span>
        </div>
        <div className="bg-gray-800 rounded-full h-1.5">
          <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ haveAlbum, needList, duplicates, totalTradeValue, completionPct, haveFoil, haveCocaCola, needCocaCola }) {
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

      {/* Sub-progress: Foil + Coca-Cola */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Special Progress</p>
        <MiniProgress
          label="Foil / Special stickers"
          have={haveFoil.length}
          total={TOTAL_FOIL_STICKERS}
          color="bg-yellow-400"
          icon="✨"
        />
        <MiniProgress
          label="Coca-Cola Exclusives"
          have={haveCocaCola.length}
          total={COCA_COLA_STICKERS.length}
          color="bg-red-500"
          icon="🥤"
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Have" value={haveAlbum.length} sub="main album" color="text-emerald-400" />
        <StatCard label="Need" value={needList.length} sub="still missing" color="text-red-400" />
        <StatCard label="Duplicates" value={totalDuplicates} sub="available to trade" color="text-amber-400" />
        <StatCard label="Trade Value" value={totalTradeValue} sub="base sticker units" color="text-blue-400" />
      </div>

      {/* Coca-Cola status */}
      {needCocaCola.length > 0 && (
        <div className="bg-red-950/30 border border-red-900/40 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🥤</span>
            <p className="text-red-300 text-sm font-semibold">Coca-Cola Exclusives</p>
            <span className="ml-auto text-xs text-red-400">{haveCocaCola.length}/12 collected</span>
          </div>
          <p className="text-red-200 text-xs">
            Found only in <strong>specially marked Coca-Cola bottles</strong> (20 oz).
            Campaign runs April 15 – July 31, 2026. Missing: {needCocaCola.length} stickers.
          </p>
        </div>
      )}

      {/* Trade tip */}
      {needList.length > 0 && totalTradeValue > 0 && (
        <div className="bg-blue-950/50 border border-blue-900 rounded-2xl p-4">
          <p className="text-blue-300 text-sm font-semibold mb-1">💡 Trade Tip</p>
          <p className="text-blue-200 text-xs">
            Your duplicates are worth <strong>{totalTradeValue}</strong> base stickers.
            You still need <strong>{needList.length}</strong> stickers.
            Check the <strong>Trade</strong> tab to see which to offer first.
          </p>
        </div>
      )}

      {needList.length === 0 && haveAlbum.length === TOTAL_STICKERS && (
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 text-center">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-emerald-300 font-bold text-lg">Album Complete!</p>
          <p className="text-emerald-500 text-sm">Congratulations! You collected all {TOTAL_STICKERS} stickers.</p>
          {needCocaCola.length > 0 && (
            <p className="text-amber-400 text-xs mt-2">Still missing {needCocaCola.length} Coca-Cola exclusive stickers.</p>
          )}
        </div>
      )}
    </div>
  )
}
