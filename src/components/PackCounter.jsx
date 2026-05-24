import { useState, useCallback } from 'react'

const STORAGE_KEY = 'panini-wc2026-packs'

const SOURCES = [
  { id: 'walgreens', label: 'Walgreens', icon: '🏪' },
  { id: 'costco', label: 'Costco', icon: '🏬' },
  { id: 'amazon', label: 'Amazon', icon: '📦' },
  { id: 'other', label: 'Other', icon: '🎴' },
]

function loadPacks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function savePacks(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

export default function PackCounter({ totalStickersOwned }) {
  const totalCollected = totalStickersOwned
  const [packs, setPacks] = useState(() => loadPacks())

  const update = useCallback((id, delta) => {
    setPacks((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }
      savePacks(next)
      return next
    })
  }, [])

  const totalPacks = SOURCES.reduce((sum, s) => sum + (packs[s.id] || 0), 0)
  const totalExpected = totalPacks * 7
  const uniqueRate = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3">
      <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Packs Opened</p>
      <div className="flex flex-col gap-2">
        {SOURCES.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <span className="text-lg w-7 text-center">{s.icon}</span>
            <span className="flex-1 text-sm text-gray-300">{s.label}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => update(s.id, -1)}
                disabled={!packs[s.id]}
                className="w-8 h-8 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-30 font-bold text-lg leading-none flex items-center justify-center transition-colors"
              >−</button>
              <span className="w-8 text-center font-bold text-white text-base">{packs[s.id] || 0}</span>
              <button
                onClick={() => update(s.id, 1)}
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
              <p className="text-xs text-gray-500">packs</p>
            </div>
            <div>
              <p className="text-lg font-bold text-amber-400">{totalExpected}</p>
              <p className="text-xs text-gray-500">expected (×7)</p>
            </div>
            <div>
              <p className="text-lg font-bold text-emerald-400">{uniqueRate}%</p>
              <p className="text-xs text-gray-500">unique rate</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center">Amazon box ≈ 24 packs · Costco set = 40 packs</p>
        </>
      )}
    </div>
  )
}
