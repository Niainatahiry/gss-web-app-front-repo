import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function SearchFiltersDrawer({ open, onClose, children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose()
      return
    }

    if (event.key !== 'Tab') return

    const focusables = panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR)
    if (!focusables?.length) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      <aside
        id="search-filters"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Filtres de recherche"
        aria-hidden={!open}
        inert={!open}
        onKeyDown={handleKeyDown}
        className={cn(
          'fixed inset-y-0 left-0 z-[60] w-[min(320px,88vw)] overflow-y-auto overscroll-contain rounded-none border-r border-white/10 bg-primary-700 p-5 shadow-e4 outline-none scrollbar-slim transition-transform duration-300 ease-material',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {children}
      </aside>
    </>
  )
}

export default SearchFiltersDrawer
