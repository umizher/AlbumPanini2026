import { useState, useCallback, useMemo } from 'react'
import { ALBUM_MAP, ALBUM_STICKERS, COCA_COLA_STICKERS, COCA_COLA_MAP, getStickerInfo } from '../data/album'
import { getParallel } from '../data/parallels'

const STORAGE_KEY = 'panini-wc2026-v1'

export const makeKey = (code, parallelId) => `${code}::${parallelId}`

// MUS1–MUS11 were renamed to FWC10–FWC20 — migrate saved data automatically
const migrateMUStoFWC = (state) => {
  const hasLegacy = Object.values(state.stickers).some((e) => /^MUS\d+$/.test(e.code))
  if (!hasLegacy) return state
  const remap = {}
  for (let i = 1; i <= 11; i++) remap[`MUS${i}`] = `FWC${i + 9}`
  const migrated = {}
  Object.values(state.stickers).forEach((entry) => {
    const newCode = remap[entry.code] || entry.code
    const newKey = `${newCode}::${entry.parallelId}`
    migrated[newKey] = { ...entry, code: newCode, key: newKey }
  })
  return { ...state, stickers: migrated }
}

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { stickers: {} }
    const state = JSON.parse(raw)
    const migrated = migrateMUStoFWC(state)
    if (migrated !== state) saveState(migrated)
    return migrated
  } catch {
    return { stickers: {} }
  }
}

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function useCollection() {
  const [state, setState] = useState(() => loadState())

  const update = useCallback((fn) => {
    setState((prev) => {
      const next = fn(prev)
      saveState(next)
      return next
    })
  }, [])

  const addSticker = useCallback(
    (code, parallelId = 'base') => {
      const upper = code.toUpperCase().trim()
      update((prev) => {
        const key = makeKey(upper, parallelId)
        const existing = prev.stickers[key]
        return {
          ...prev,
          stickers: {
            ...prev.stickers,
            [key]: existing
              ? { ...existing, quantity: existing.quantity + 1 }
              : {
                  key,
                  code: upper,
                  parallelId,
                  quantity: 1,
                  addedAt: Date.now(),
                },
          },
        }
      })
    },
    [update]
  )

  const removeOne = useCallback(
    (key) => {
      update((prev) => {
        const entry = prev.stickers[key]
        if (!entry) return prev
        if (entry.quantity <= 1) {
          const { [key]: _, ...rest } = prev.stickers
          return { ...prev, stickers: rest }
        }
        return {
          ...prev,
          stickers: { ...prev.stickers, [key]: { ...entry, quantity: entry.quantity - 1 } },
        }
      })
    },
    [update]
  )

  const removeAll = useCallback(
    (key) => {
      update((prev) => {
        const { [key]: _, ...rest } = prev.stickers
        return { ...prev, stickers: rest }
      })
    },
    [update]
  )

  const clearCollection = useCallback(() => {
    update(() => ({ stickers: {} }))
  }, [update])

  const importCollection = useCallback(
    (data) => {
      try {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data
        if (parsed && parsed.stickers) {
          // Normalise all codes to uppercase
          const normalised = {}
          Object.values(parsed.stickers).forEach((entry) => {
            if (!entry || !entry.code) return
            const upper = entry.code.toUpperCase().trim()
            const key = `${upper}::${entry.parallelId || 'base'}`
            normalised[key] = { ...entry, code: upper, key }
          })
          update(() => ({ stickers: normalised }))
        }
      } catch {}
    },
    [update]
  )

  const computed = useMemo(() => {
    const entries = Object.values(state.stickers)
    const ownedCodes = new Set(entries.map((e) => e.code))

    // Main album (980 stickers)
    const haveAlbum = ALBUM_STICKERS.filter((s) => ownedCodes.has(s.code))
    const needList = ALBUM_STICKERS.filter((s) => !ownedCodes.has(s.code))

    // Foil stickers (special) within main album
    const haveFoil = haveAlbum.filter((s) => s.isFoil)

    // Coca-Cola exclusives (12 stickers, separate from 980)
    const haveCocaCola = COCA_COLA_STICKERS.filter((s) => ownedCodes.has(s.code))
    const needCocaCola = COCA_COLA_STICKERS.filter((s) => !ownedCodes.has(s.code))

    // All tradeable items — group by code for cross-parallel duplicate detection.
    // Example: CC1::base×1 + CC1::blue×1 = 2 total → 1 spare (keep the blue for album).
    const byCode = {}
    entries.forEach((entry) => {
      if (!byCode[entry.code]) byCode[entry.code] = []
      byCode[entry.code].push(entry)
    })

    const allTradeItems = []
    Object.values(byCode).forEach((codeEntries) => {
      const totalQty = codeEntries.reduce((sum, e) => sum + e.quantity, 0)
      if (totalQty <= 1) return

      // Sort highest multiplier first — keep the most valuable copy for the album
      const sorted = [...codeEntries].sort(
        (a, b) => getParallel(b.parallelId).multiplier - getParallel(a.parallelId).multiplier
      )

      let spare = totalQty - 1
      sorted.forEach((entry, idx) => {
        if (spare <= 0) return
        const keepForAlbum = idx === 0 ? 1 : 0 // keep 1 of the best parallel for the album
        const available = entry.quantity - keepForAlbum
        if (available <= 0) return
        const extraQty = Math.min(available, spare)
        spare -= extraQty
        if (extraQty <= 0) return
        const parallel = getParallel(entry.parallelId)
        const info = getStickerInfo(entry.code)
        allTradeItems.push({
          ...entry,
          info,
          parallel,
          extraQty,
          exchangeValue: Math.round(parallel.multiplier * info.valueMultiplier * extraQty * 10) / 10,
        })
      })
    })
    allTradeItems.sort((a, b) => b.exchangeValue - a.exchangeValue)

    const totalTradeValue = allTradeItems.reduce((sum, d) => sum + d.exchangeValue, 0)
    const completionPct = Math.round((haveAlbum.length / ALBUM_STICKERS.length) * 1000) / 10

    return {
      entries,
      ownedCodes,
      haveAlbum,
      needList,
      haveFoil,
      haveCocaCola,
      needCocaCola,
      duplicates: allTradeItems,
      totalTradeValue: Math.round(totalTradeValue * 10) / 10,
      completionPct,
      totalOwned: entries.length,
    }
  }, [state.stickers])

  return {
    state,
    addSticker,
    removeOne,
    removeAll,
    clearCollection,
    importCollection,
    ...computed,
  }
}
