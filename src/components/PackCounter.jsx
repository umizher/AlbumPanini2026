const PACK_STORAGE_KEY = 'panini-wc2026-packs'

export function loadPacks() {
  try {
    const raw = localStorage.getItem(PACK_STORAGE_KEY)
    if (!raw) return 0
    const parsed = JSON.parse(raw)
    // Migrate from old per-source object format
    if (typeof parsed === 'object' && parsed !== null) {
      return Object.values(parsed).reduce((s, n) => s + (typeof n === 'number' ? n : 0), 0)
    }
    return typeof parsed === 'number' ? parsed : 0
  } catch { return 0 }
}

export function savePacks(count) {
  try { localStorage.setItem(PACK_STORAGE_KEY, JSON.stringify(count)) } catch {}
}

export default function PackCounter({ packCount = 0, onPackUpdate, totalStickersOwned = 0 }) {
  const totalExpected = packCount * 7
  const uniqueRate = totalExpected > 0 ? Math.round((totalStickersOwned / totalExpected) * 100) : 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
      <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Sobres Abiertos</p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onPackUpdate?.(-1)}
          disabled={packCount === 0}
          className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-30 font-bold text-xl leading-none flex items-center justify-center transition-colors"
        >−</button>
        <div className="text-center min-w-[4rem]">
          <p className="text-3xl font-black text-white">{packCount}</p>
          <p className="text-xs text-gray-500">sobres</p>
        </div>
        <button
          onClick={() => onPackUpdate?.(1)}
          className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 font-bold text-xl leading-none flex items-center justify-center transition-colors"
        >+</button>
      </div>
      {packCount > 0 && (
        <>
          <div className="border-t border-gray-800 pt-3 grid grid-cols-2 gap-2 text-center">
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
