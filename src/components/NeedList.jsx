import { useState } from 'react'
import { exportNeedList, copyToClipboard, formatNeedListText } from '../utils/export'
import { TEAMS } from '../data/album'

export default function NeedList({ needList, totalTradeValue }) {
  const [copied, setCopied] = useState(false)
  const [groupBy, setGroupBy] = useState('team')
  const [search, setSearch] = useState('')

  const handleCopy = async () => {
    const ok = await copyToClipboard(formatNeedListText(needList))
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const filtered = search
    ? needList.filter(
        (s) =>
          s.code.includes(search.toUpperCase()) ||
          s.section.toLowerCase().includes(search.toLowerCase()) ||
          s.title.toLowerCase().includes(search.toLowerCase())
      )
    : needList

  // Group stickers
  const grouped = {}
  filtered.forEach((s) => {
    const key = groupBy === 'team' ? s.section : s.sectionCode === 'FWC' ? 'Intro' : s.confederation || 'Other'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(s)
  })

  if (needList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-5xl">🎉</p>
        <p className="text-emerald-400 font-bold text-lg">Album Complete!</p>
        <p className="text-gray-500 text-base">You have all stickers in your collection</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="bg-red-950/40 border border-red-900/50 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-red-400 uppercase tracking-wider mb-1">Missing Stickers</p>
            <p className="text-3xl font-black text-white">{needList.length}</p>
            <p className="text-sm text-red-400">still needed</p>
          </div>
          {totalTradeValue > 0 && (
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Trade budget</p>
              <p className="text-xl font-bold text-blue-400">{totalTradeValue}</p>
              <p className="text-sm text-gray-500">base units</p>
            </div>
          )}
        </div>
      </div>

      {/* Completion hint */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">💡 How to Complete Fastest</p>
        <ol className="text-sm text-gray-400 space-y-1.5 list-decimal list-inside">
          <li>Trade your <span className="text-amber-400">highest-value duplicates</span> first for rare/special stickers</li>
          <li>Use lower-value duplicates for base stickers you're missing</li>
          <li>Buy packs to fill gaps — each pack averages 5 random stickers</li>
          <li>Focus on completing full teams to unlock set bonuses</li>
        </ol>
      </div>

      {/* Search + group controls */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search code, team, player..."
        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-emerald-500"
      />

      <div className="flex gap-2">
        <button
          onClick={() => setGroupBy('team')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${groupBy === 'team' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400'}`}
        >
          By Team
        </button>
        <button
          onClick={() => setGroupBy('conf')}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${groupBy === 'conf' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400'}`}
        >
          By Confederation
        </button>
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
          onClick={() => exportNeedList(needList)}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          ⬇️ Export CSV
        </button>
      </div>

      {/* Empty search result */}
      {filtered.length === 0 && search && (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <p className="text-3xl">🔍</p>
          <p className="text-gray-400 text-base">No stickers match &ldquo;{search}&rdquo;</p>
        </div>
      )}

      {/* Groups */}
      {Object.entries(grouped).map(([section, stickers]) => {
        const team = TEAMS.find((t) => t.name === section || t.code === section)
        return (
          <div key={section} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              {team && <span className="text-xl">{team.flag}</span>}
              <div className="flex-1">
                <span className="font-semibold text-white text-base">{section}</span>
                <span className="text-gray-500 text-sm ml-2">{stickers.length} missing</span>
              </div>
            </div>
            <div className="divide-y divide-gray-800/50">
              {stickers.map((s) => (
                <div key={s.code} className="flex items-center gap-3 px-4 py-2.5">
                  <span className={`text-base font-mono font-bold ${s.isSpecial ? 'text-yellow-400' : 'text-gray-400'}`}>{s.code}</span>
                  <span className="text-base text-gray-300 flex-1">{s.title}</span>
                  {s.isSpecial && <span className="text-sm text-yellow-500">★ special</span>}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div className="h-2" />
    </div>
  )
}
