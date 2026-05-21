import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2800)
    return () => clearTimeout(t)
  }, [onDismiss])

  const styles = {
    success: 'bg-emerald-600 border-emerald-500',
    error: 'bg-red-700 border-red-600',
    info: 'bg-gray-700 border-gray-600',
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' }

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-2xl border shadow-2xl text-sm font-semibold text-white animate-pop whitespace-nowrap max-w-[90vw] ${styles[type] || styles.info}`}
      onClick={onDismiss}
    >
      <span>{icons[type] || icons.info}</span>
      <span className="truncate">{message}</span>
    </div>
  )
}
