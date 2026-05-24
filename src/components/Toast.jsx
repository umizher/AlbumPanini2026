import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onDismiss, onUndo }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, onUndo ? 4500 : 2800)
    return () => clearTimeout(t)
  }, [onDismiss, onUndo])

  const styles = {
    success: 'bg-emerald-600 border-emerald-500',
    error: 'bg-red-700 border-red-600',
    info: 'bg-gray-700 border-gray-600',
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' }

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-2xl text-sm font-semibold text-white animate-pop max-w-[90vw] ${styles[type] || styles.info}`}
      onClick={!onUndo ? onDismiss : undefined}
    >
      <span className="flex-shrink-0">{icons[type] || icons.info}</span>
      <span className="truncate">{message}</span>
      {onUndo && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onUndo(); onDismiss() }}
            className="flex-shrink-0 ml-1 px-2 py-0.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors"
          >
            Undo
          </button>
          <button onClick={onDismiss} className="flex-shrink-0 text-white/60 hover:text-white text-base leading-none">✕</button>
        </>
      )}
    </div>
  )
}
