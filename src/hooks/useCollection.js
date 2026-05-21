import { useState, useCallback, useMemo } from 'react'
import { ALBUM_MAP, ALBUM_STICKERS, COCA_COLA_STICKERS, COCA_COLA_MAP, getStickerInfo } from '../data/album'
import { getParallel } from '../data/parallels'

const STORAGE_KEY = 'panini-wc2026-v1'

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { stickers: {} }
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
        const key = `${upper}::${parallelId}`
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
          update(() => parsed)
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

    // All tradeable items (duplicates: quantity > 1)
    const allTradeItems = entries
      .flatMap((e) => {
        const info = getStickerInfo(e.code)
        const parallel = getParallel(e.parallelId)
        if (e.quantity > 1) {
          const extraQty = e.quantity - 1
          return [{
            ...e,
            info,
            parallel,
            extraQty,
            exchangeValue: Math.round(parallel.multiplier * info.valueMultiplier * extraQty * 10) / 10,
          }]
        }
        return []
      })
      .sort((a, b) => b.exchangeValue - a.exchangeValue)

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
