import { useState, useCallback } from 'react'
import { useCollection } from './hooks/useCollection'
import { getStickerInfo, TOTAL_STICKERS } from './data/album'
import { getParallel } from './data/parallels'
import Dashboard from './components/Dashboard'
import StickerInput from './components/StickerInput'
import AlbumGrid from './components/AlbumGrid'
import TradeView from './components/TradeView'
import NeedList from './components/NeedList'
import ExportPanel from './components/ExportPanel'
import TypeSelector from './components/TypeSelector'
import Toast from './components/Toast'
import { loadPacks, savePacks } from './components/PackCounter'

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
  const [toast, setToast] = useState(null)
  const [packCount, setPackCount] = useState(() => loadPacks())

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  const {
    state,
    addSticker,
    removeOne,
    clearCollection: clearCollectionBase,
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

  const clearCollection = useCallback(() => {
    clearCollectionBase()
    setRecentlyAdded([])
    showToast('Collection cleared', 'info')
  }, [clearCollectionBase, showToast])

  const handlePackUpdate = useCallback((delta) => {
    setPackCount((prev) => {
      const next = Math.max(0, prev + delta)
      savePacks(next)
      return next
    })
  }, [])

  const handleAdd = useCallback(
    (code, parallelId) => {
      addSticker(code, parallelId)
      const info = getStickerInfo(code)
      const parallel = getParallel(parallelId)
      setRecentlyAdded((prev) => [{ code, parallelId, parallel, info, addedAt: Date.now() }, ...prev.slice(0, 19)])
      if (parallel.multiplier >= 20) {
        showToast(`💎 ${code} — Ultra Rare ${parallel.name}! Check eBay price`, 'success')
      } else if (parallel.multiplier >= 8) {
        showToast(`🔥 ${code} added — High Value ${parallel.name}! Worth ${parallel.multiplier}× base`, 'success')
      } else {
        showToast(`${code} added (${parallel.name})`)
      }
    },
    [addSticker, showToast]
  )

  const handleRemove = useCallback(
    (key, label) => {
      const [code, parallelId] = key.split('::')
      removeOne(key)
      if (label) {
        setToast({
          message: `${label} removed`,
          type: 'info',
          onUndo: () => addSticker(code, parallelId || 'base'),
        })
      }
    },
    [removeOne, addSticker]
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
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismissToast} onUndo={toast.onUndo} />}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="text-base font-black text-white leading-tight">Panini WC 2026</h1>
              <p className="text-xs text-emerald-500">{completionPct.toFixed(1)}% · {haveAlbum.length}/{TOTAL_STICKERS}</p>
            </div>
          </div>
          <button
            onClick={() => { setPendingFromNeed(null); setActiveTab('add') }}
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
            clearCollection={clearCollection}
            packCount={packCount}
            onPackUpdate={handlePackUpdate}
          />
        )}
        {activeTab === 'add' && (
          <StickerInput
            onAdd={handleAdd}
            onRemove={handleRemove}
            recentlyAdded={recentlyAdded}
            state={state}
            externalPending={!!pendingFromNeed}
            onToast={showToast}
            onPackUpdate={handlePackUpdate}
          />
        )}
        {activeTab === 'album' && (
          <AlbumGrid
            ownedCodes={ownedCodes}
            state={state}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        )}
        {activeTab === 'trade' && (
          <TradeView
            duplicates={duplicates}
            totalTradeValue={totalTradeValue}
            removeOne={handleRemove}
            addSticker={handleAdd}
            onToast={showToast}
          />
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
            onToast={showToast}
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
              <span className="text-xs font-semibold">{tab.label}</span>
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
