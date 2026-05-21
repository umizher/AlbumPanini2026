import { getStickerInfo } from '../data/album'
import { getParallel } from '../data/parallels'

const escapeCsv = (val) => {
  const s = String(val ?? '')
  return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s
}

const toCsv = (rows) => rows.map((r) => r.map(escapeCsv).join(',')).join('\n')

const download = (filename, content, mime = 'text/csv;charset=utf-8;') => {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export const exportNeedList = (needList) => {
  const headers = ['Code', 'Section', 'Position', 'Title', 'Special']
  const rows = needList.map((s) => [s.code, s.section, s.position ?? '', s.title, s.isSpecial ? 'Yes' : 'No'])
  download('panini-wc2026-need.csv', toCsv([headers, ...rows]))
}

export const exportTradeList = (tradeItems) => {
  const headers = ['Code', 'Parallel', 'Section', 'Title', 'Extras', 'Exchange Value (base units)']
  const rows = tradeItems.map((item) => [
    item.code,
    item.parallel.name,
    item.info.section,
    item.info.title,
    item.extraQty,
    item.exchangeValue,
  ])
  download('panini-wc2026-for-trade.csv', toCsv([headers, ...rows]))
}

export const exportFullCollection = (entries) => {
  const headers = ['Code', 'Parallel', 'Quantity', 'Section', 'Title', 'Added At']
  const rows = entries.map((e) => {
    const info = getStickerInfo(e.code)
    const parallel = getParallel(e.parallelId)
    return [e.code, parallel.name, e.quantity, info.section, info.title, new Date(e.addedAt).toLocaleDateString()]
  })
  download('panini-wc2026-collection.csv', toCsv([headers, ...rows]))
}

export const exportJson = (state) => {
  download('panini-wc2026-backup.json', JSON.stringify(state, null, 2), 'application/json')
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export const formatNeedListText = (needList) =>
  needList.map((s) => `${s.code} - ${s.section}: ${s.title}`).join('\n')

export const formatTradeListText = (tradeItems) =>
  tradeItems.map((t) => `${t.code} (${t.parallel.name}) x${t.extraQty} = ${t.exchangeValue} base`).join('\n')
