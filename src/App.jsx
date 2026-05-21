import { useState, useCallback, useMemo } from 'react'
import { useCollection } from './hooks/useCollection'
import { getStickerInfo } from './data/album'
import { getParallel } from './data/parallels'
import Dashboard from './components/Dashboard'
import StickerInput from './components/StickerInput'
import AlbumGrid from './components/AlbumGrid'
import TradeView from './components/TradeView'
import NeedList from './components/NeedList'
import ExportPanel from './components/ExportPanel'
import TypeSelector from './components/TypeSelector'

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'add', label: 'Add', icon: '➕' },
  { id: 'album', label: 'Album', icon: '📖' },
  { id: 'trade', label: 'Trade', icon: '🔄' },
  { id: 'need', label: 'Need', icon: '📋' },
  { id: 'export', label: 'Export', icon: '⬇️' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [recentlyAdded, setRecentlyAdded] = useState([])
  const [pendingFromNeed, setPendingFromNeed] = useState(null)

  const {
    state,
    addSticker,
    removeOne,
    removeAll,
    clearCollection,
    importCollection,
    haveAlbum,
    needList,
    duplicates,
    totalTradeValue,
    completionPct,
    entries,
    ownedCodes,
    haveFoil,
    haveCocaCola,
    needCocaCola,
  } = useCollection()

  const handleAdd = useCallback(
    (code, parallelId) => {
      addSticker(code, parallelId)
      const info = getStickerInfo(code)
      const parallel = getParallel(parallelId)
      setRecentlyAdded((prev) => [{ code, parallelId, parallel, info, addedAt: Date.now() }, ...prev.slice(0, 19)])
    },
    [addSticker]
  )

  const handleAddFromNeed = useCallback((code) => {
    setPendingFromNeed(code)
    setActiveTab('add')
  }, [])

  const handleNeedTypeSelect = useCallback(
    (parallelId) => {
      if (pendingFromNeed) {
        handleAdd(pendingFromNeed, parallelId)
        setPendingFromNeed(null)
      }
    },
    [pendingFromNeed, handleAdd]
  )

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="text-base font-black text-white leading-tight">Panini WC 2026</h1>
              <p className="text-xs text-emerald-500">{completionPct.toFixed(1)}% · {haveAlbum.length}/980</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('add')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors active:scale-95"
          >
            + Add
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-4 pb-safe">
        {activeTab === 'home' && (
          <Dashboard
            haveAlbum={haveAlbum}
            needList={needList}
            duplicates={duplicates}
            totalTradeValue={totalTradeValue}
            completionPct={completionPct}
            haveFoil={haveFoil}
            haveCocaCola={haveCocaCola}
            needCocaCola={needCocaCola}
            entries={entries}
          />
        )}
        {activeTab === 'add' && (
          <StickerInput onAdd={handleAdd} onRemove={removeOne} recentlyAdded={recentlyAdded} state={state} />
        )}
        {activeTab === 'album' && (
          <AlbumGrid ownedCodes={ownedCodes} state={state} />
        )}
        {activeTab === 'trade' && (
          <TradeView duplicates={duplicates} totalTradeValue={totalTradeValue} removeOne={removeOne} />
        )}
        {activeTab === 'need' && (
          <NeedList needList={needList} totalTradeValue={totalTradeValue} onAdd={handleAddFromNeed} />
        )}
        {activeTab === 'export' && (
          <ExportPanel
            needList={needList}
            duplicates={duplicates}
            entries={entries}
            state={state}
            importCollection={importCollection}
            clearCollection={clearCollection}
          />
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur border-t border-gray-800 safe-bottom">
        <div className="max-w-2xl mx-auto flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 transition-colors ${
                activeTab === tab.id ? 'text-emerald-400' : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Pending type selector from Need list */}
      {pendingFromNeed && (
        <TypeSelector
          code={pendingFromNeed}
          onSelect={handleNeedTypeSelect}
          onCancel={() => setPendingFromNeed(null)}
        />
      )}
    </div>
  )
}
