const PACK_SOURCES = [
  { id: 'walgreens', label: 'Walgreens', icon: '🏪' },
  { id: 'costco', label: 'Costco', icon: '🏬' },
  { id: 'amazon', label: 'Amazon', icon: '📦' },
  { id: 'other', label: 'Otro', icon: '🎴' },
]

const PACK_STORAGE_KEY = 'panini-wc2026-packs'

export function loadPacks() {
  try {
    const raw = localStorage.getItem(PACK_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export function savePacks(data) {
  try { localStorage.setItem(PACK_STORAGE_KEY, JSON.stringify(data)) } catch {}
}

// packCounts: { walgreens: N, costco: N, amazon: N, other: N }
// onPackUpdate(sourceId, delta): called when user manually adjusts
// totalStickersOwned: number (haveAlbum.length + haveCocaCola.length)
export default function PackCounter({ packCounts = {}, onPackUpdate, totalStickersOwned = 0 }) {
  const totalPacks = PACK_SOURCES.reduce((sum, s) => sum + (packCounts[s.id] || 0), 0)
  const totalExpected = totalPacks * 7
  const uniqueRate = totalExpected > 0 ? Math.round((totalStickersOwned / totalExpected) * 100) : 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
      <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Sobres Abiertos</p>
      <div className="flex flex-col gap-2">
        {PACK_SOURCES.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <span className="text-lg w-7 text-center">{s.icon}</span>
            <span className="flex-1 text-sm text-gray-300">{s.label}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPackUpdate?.(s.id, -1)}
                disabled={!(packCounts[s.id] > 0)}
                className="w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-30 font-bold text-lg leading-none flex items-center justify-center transition-colors"
              >−</button>
              <span className="w-8 text-center font-bold text-white text-base">{packCounts[s.id] || 0}</span>
              <button
                onClick={() => onPackUpdate?.(s.id, 1)}
                className="w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 font-bold text-lg leading-none flex items-center justify-center transition-colors"
              >+</button>
            </div>
          </div>
        ))}
      </div>
      {totalPacks > 0 && (
        <>
          <div className="border-t border-gray-800 pt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-white">{totalPacks}</p>
              <p className="text-xs text-gray-500">sobres</p>
            </div>
            <div>
              <p className="text-lg font-bold text-amber-400">{totalExpected}</p>
              <p className="text-xs text-gray-500">esperados (×7)</p>
            </div>
            <div>
              <p className="text-lg font-bold text-emerald-400">{uniqueRate}%</p>
              <p className="text-xs text-gray-500">tasa única</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center">Caja Amazon ≈ 24 sobres · Set Costco = 40 sobres</p>
        </>
      )}
    </div>
  )
}
