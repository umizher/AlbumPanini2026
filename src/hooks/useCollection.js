import { useState, useCallback, useMemo } from 'react'
import { ALBUM_MAP, ALBUM_STICKERS, getStickerInfo } from '../data/album'
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

    // All unique codes owned (at least 1 of any parallel)
    const ownedCodes = new Set(entries.map((e) => e.code))

    // Total entries including all parallels
    const totalOwned = entries.length

    // Stickers in album that user has (any parallel)
    const haveAlbum = ALBUM_STICKERS.filter((s) => ownedCodes.has(s.code))

    // Stickers in album that user is missing
    const needList = ALBUM_STICKERS.filter((s) => !ownedCodes.has(s.code))

    // Duplicate entries (quantity > 1 or same code with different parallels)
    // Duplicates = any quantity beyond 1 copy of any variant
    const duplicates = entries
      .filter((e) => e.quantity > 1)
      .map((e) => {
        const info = getStickerInfo(e.code)
        const parallel = getParallel(e.parallelId)
        const extraQty = e.quantity - 1
        const exchangeValue = Math.round(parallel.multiplier * info.valueMultiplier * extraQty * 10) / 10
        return { ...e, info, parallel, extraQty, exchangeValue }
      })
      .sort((a, b) => b.exchangeValue - a.exchangeValue)

    // Extra parallels (different parallel of a sticker already owned as base)
    const extraParallels = entries
      .filter((e) => {
        const info = getStickerInfo(e.code)
        const parallel = getParallel(e.parallelId)
        // It's "extra" if they have the base version AND this is a non-base parallel
        // OR if quantity > 1 regardless
        return e.parallelId !== 'base' && ownedCodes.has(e.code)
      })

    // All tradeable items (duplicates + extra parallels if you want to trade them)
    const allTradeItems = entries
      .flatMap((e) => {
        const info = getStickerInfo(e.code)
        const parallel = getParallel(e.parallelId)
        const results = []
        // All extras (quantity - 1)
        if (e.quantity > 1) {
          const extraQty = e.quantity - 1
          results.push({
            ...e,
            info,
            parallel,
            extraQty,
            exchangeValue: Math.round(parallel.multiplier * info.valueMultiplier * extraQty * 10) / 10,
            reason: 'duplicate',
          })
        }
        return results
      })
      .sort((a, b) => b.exchangeValue - a.exchangeValue)

    const totalTradeValue = allTradeItems.reduce((sum, d) => sum + d.exchangeValue, 0)

    const completionPct = Math.round((haveAlbum.length / ALBUM_STICKERS.length) * 1000) / 10

    return {
      entries,
      ownedCodes,
      haveAlbum,
      needList,
      duplicates: allTradeItems,
      totalTradeValue: Math.round(totalTradeValue * 10) / 10,
      completionPct,
      totalOwned,
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
