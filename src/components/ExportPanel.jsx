import { useState } from 'react'
import { exportNeedList, exportTradeList, exportFullCollection, exportJson, copyToClipboard } from '../utils/export'

export default function ExportPanel({ needList, duplicates, entries, state, importCollection, clearCollection }) {
  const [imported, setImported] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      importCollection(ev.target.result)
      setImported(true)
      setTimeout(() => setImported(false), 2000)
    }
    reader.readAsText(file)
  }

  const handleClear = () => {
    if (confirmClear) {
      clearCollection()
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 4000)
    }
  }

  const stats = {
    have: entries.length,
    need: needList.length,
    trade: duplicates.length,
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h2 className="font-bold text-white mb-1">Export & Backup</h2>
        <p className="text-xs text-gray-500 mb-4">Save your collection or share your lists with other collectors</p>

        <div className="flex flex-col gap-3">
          <ExportButton
            icon="📋"
            title="Export Need List"
            desc={`${stats.need} missing stickers → CSV`}
            onClick={() => exportNeedList(needList)}
            disabled={stats.need === 0}
          />
          <ExportButton
            icon="🔄"
            title="Export Trade List"
            desc={`${stats.trade} duplicate entries → CSV`}
            onClick={() => exportTradeList(duplicates)}
            disabled={stats.trade === 0}
          />
          <ExportButton
            icon="📦"
            title="Export Full Collection"
            desc={`${stats.have} entries → CSV`}
            onClick={() => exportFullCollection(entries)}
            disabled={stats.have === 0}
          />
          <ExportButton
            icon="💾"
            title="Backup to JSON"
            desc="Full backup — use to restore later"
            onClick={() => exportJson(state)}
            disabled={stats.have === 0}
          />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h2 className="font-bold text-white mb-1">Import Backup</h2>
        <p className="text-xs text-gray-500 mb-4">Restore a JSON backup file</p>
        <label className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl cursor-pointer transition-colors text-sm font-semibold">
          <span>📂</span>
          <span>{imported ? '✓ Imported!' : 'Choose JSON file'}</span>
          <input type="file" accept=".json" className="hidden" onChange={handleImport} />
        </label>
      </div>

      <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-5">
        <h2 className="font-bold text-red-400 mb-1">Danger Zone</h2>
        <p className="text-xs text-gray-500 mb-4">This action cannot be undone — export a backup first!</p>
        <button
          onClick={handleClear}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${confirmClear ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-800 text-red-400 hover:bg-red-900/40'}`}
        >
          {confirmClear ? '⚠️ Tap again to confirm reset' : '🗑️ Clear All Collection'}
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
        <p className="text-xs text-gray-600">Panini WC 2026 Tracker</p>
        <p className="text-xs text-gray-700">Data stored locally on your device</p>
        <p className="text-xs text-gray-700 mt-1">980 stickers · 48 teams · 12 parallel types</p>
      </div>

      <div className="h-2" />
    </div>
  )
}

function ExportButton({ icon, title, desc, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl p-4 transition-colors text-left w-full"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-semibold text-white text-sm">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      {!disabled && <span className="ml-auto text-gray-600">→</span>}
    </button>
  )
}
