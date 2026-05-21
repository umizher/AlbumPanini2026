import { useState } from 'react'
import { exportTradeList, copyToClipboard, formatTradeListText } from '../utils/export'

function TradeCard({ item, onRemoveOne }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
      <span className="text-2xl">{item.parallel.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono font-bold text-white">{item.code}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${item.parallel.bg} text-white`}>
            {item.parallel.name}
          </span>
        </div>
        <p className="text-xs text-gray-400 truncate">{item.info.section} · {item.info.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-amber-400">×{item.extraQty} extra</span>
          <span className="text-xs text-blue-400 font-semibold">= {item.exchangeValue} base stickers</span>
        </div>
      </div>
      <button
        onClick={() => onRemoveOne(item.key)}
        className="text-gray-600 hover:text-red-400 text-lg p-1 transition-colors"
        title="Remove one duplicate"
      >−</button>
    </div>
  )
}

export default function TradeView({ duplicates, totalTradeValue, removeOne }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(formatTradeListText(duplicates))
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (duplicates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-5xl">🔄</p>
        <p className="text-gray-400 font-semibold">No duplicates yet</p>
        <p className="text-gray-600 text-sm">Add the same sticker twice to see it here</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="bg-blue-950/50 border border-blue-900 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Total Trade Value</p>
            <p className="text-3xl font-black text-white">{totalTradeValue}</p>
            <p className="text-xs text-blue-400">base sticker units</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">{duplicates.length} duplicate entries</p>
            <p className="text-xs text-gray-500">Sorted highest value first</p>
          </div>
        </div>
      </div>

      {/* Trade calculator hint */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Exchange Rate Guide</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {[
            ['1 Blue', '3 Base'],
            ['1 Red', '5 Base'],
            ['1 Purple', '6 Base'],
            ['1 Amazon Orange', '8 Base'],
            ['1 Green', '10 Base'],
            ['1 Black', '20 Base'],
          ].map(([a, b]) => (
            <div key={a} className="flex justify-between text-xs">
              <span className="text-gray-300">{a}</span>
              <span className="text-gray-500">=</span>
              <span className="text-emerald-400">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          {copied ? '✓ Copied!' : '📋 Copy List'}
        </button>
        <button
          onClick={() => exportTradeList(duplicates)}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          ⬇️ Export CSV
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {duplicates.map((item) => (
          <TradeCard key={`${item.key}-${item.extraQty}`} item={item} onRemoveOne={removeOne} />
        ))}
      </div>

      <div className="h-2" />
    </div>
  )
}
