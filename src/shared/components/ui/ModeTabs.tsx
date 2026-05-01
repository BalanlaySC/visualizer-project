import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { themeClasses } from '../../../core/constants/theme'
import { SMALL_BREAKPOINT, type Theme } from '../../../core/types/common'

const showMobileMenuForWidth = (width: number) => {
  return width < SMALL_BREAKPOINT
}

type ModeTabsProps<T extends string> = {
  items: readonly T[]
  active: T
  onChange: (value: T) => void
  disabledItems?: readonly T[]
  theme: Theme
}

export function ModeTabs<T extends string>({
  items,
  active,
  onChange,
  disabledItems = [],
  theme,
}: ModeTabsProps<T>) {
  const classes = themeClasses[theme]
  const disabledSet = new Set(disabledItems)
  const [isMobile, setIsMobile] = useState(() => showMobileMenuForWidth(window.innerWidth))
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const syncMobileState = () => {
      const nextIsMobile = showMobileMenuForWidth(window.innerWidth)
      setIsMobile(nextIsMobile)
      if (!nextIsMobile) setIsMobileMenuOpen(false)
    }

    syncMobileState()
    window.addEventListener('resize', syncMobileState)
    return () => window.removeEventListener('resize', syncMobileState)
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current) return
      const target = event.target as Node
      if (containerRef.current.contains(target)) return
      setIsMobileMenuOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="Toggle header modes"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className={`${isMobile ? 'inline-flex' : 'hidden'} h-10 w-10 items-center justify-center rounded-lg border transition ${classes.control}`}
      >
        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {isMobile && isMobileMenuOpen && (
        <div
          className={`absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border p-2 shadow-lg ${classes.control}`}
        >
          {items.map((item) => {
            const disabled = disabledSet.has(item)
            return (
              <button
                key={item}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (disabled) return
                  onChange(item)
                  setIsMobileMenuOpen(false)
                }}
                className={`mb-1 block w-full rounded-md border px-3 py-2 text-left text-sm font-medium transition last:mb-0 ${
                  active === item ? classes.controlActive : classes.control
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {item}
              </button>
            )
          })}
        </div>
      )}

      <div className={`flex-wrap items-center gap-2 ${isMobile ? 'hidden' : 'flex'}`}>
        {items.map((item) => {
          const disabled = disabledSet.has(item)
          return (
            <button
              key={item}
              type="button"
              disabled={disabled}
              onClick={() => onChange(item)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                active === item ? classes.controlActive : classes.control
              } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}