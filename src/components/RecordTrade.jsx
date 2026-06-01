import { useState } from 'react'

export default function RecordTrade({ duplicates, onRemoveOne, onClose, onToast }) {
  const [givingKeys, setGivingKeys] = useState(new Set())

  const toggleGiving = (key) => {
    setGivingKeys((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const canComplete = givingKeys.size > 0

  const handleComplete = () => {
    if (!canComplete) return
    givingKeys.forEach((key) => onRemoveOne(key))
    onToast?.(`Trade recorded! Gave ${givingKeys.size} sticker${givingKeys.size !== 1 ? 's' : ''}`, 'success')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-gray-900 rounded-t-2xl sm:rounded-2xl max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Record a Trade</p>
            <h2 className="text-xl font-bold text-white">Select stickers you gave</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">✕</button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            Mark stickers as traded away — they will be removed from your duplicates.
            Add the stickers you received via the Album grid.
          </p>

          {duplicates.length === 0 ? (
            <p className="text-gray-500 text-base py-3 text-center">
              No tradeable stickers yet — add duplicates first.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {duplicates.map((item) => {
                const selected = givingKeys.has(item.key)
                const ebayBase = `panini world cup 2026 ${item.code} ${item.info?.title ?? ''}`
                const ebaySoldUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(ebayBase)}&LH_Sold=1&LH_Complete=1`
                const ebayActiveUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(ebayBase)}`
                return (
                  <div
                    key={item.key}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      selected
                        ? 'border-emerald-500 bg-emerald-950/30'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <button
                      onClick={() => toggleGiving(item.key)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left active:scale-[0.98]"
                    >
                      <span className="text-xl flex-shrink-0">{item.parallel.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-white text-base">{item.code}</span>
                          <span className={`text-sm px-1.5 py-0.5 rounded-full ${item.parallel.bg} text-white`}>
                            {item.parallel.name}
                          </span>
                          <span className="text-sm text-amber-400">×{item.extraQty} available</span>
                        </div>
                        <p className="text-sm text-gray-400 truncate mt-0.5">{item.info?.title}</p>
                        <p className="text-sm text-blue-400">= {item.exchangeValue} base value</p>
                      </div>
                      <span className={`text-xl flex-shrink-0 ${selected ? 'text-emerald-400' : 'text-gray-700'}`}>
                        {selected ? '✓' : '○'}
                      </span>
                    </button>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <a href={ebaySoldUrl} target="_blank" rel="noopener noreferrer"
                         className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-blue-900/50 text-blue-300 hover:bg-blue-800 whitespace-nowrap text-center"
                         onClick={(e) => e.stopPropagation()}>
                        💰 Sold
                      </a>
                      <a href={ebayActiveUrl} target="_blank" rel="noopener noreferrer"
                         className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 whitespace-nowrap text-center"
                         onClick={(e) => e.stopPropagation()}>
                        🛒 Active
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <button
            onClick={handleComplete}
            disabled={!canComplete}
            className="w-full disabled:bg-gray-700 disabled:text-gray-500 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl transition-colors text-base active:scale-95"
          >
            {canComplete
              ? `Confirm Trade — Give ${givingKeys.size} sticker${givingKeys.size !== 1 ? 's' : ''}`
              : 'Select stickers to give'}
          </button>

          <div className="h-1" />
        </div>
      </div>
    </div>
  )
}
