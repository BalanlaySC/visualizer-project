import type { ReactNode } from 'react'

import { themeClasses } from '../../../core/constants/theme'
import type { Theme } from '../../../core/types/common'
import { ThemeToggle } from '../theme/ThemeToggle'

type AppShellProps = {
  theme: Theme
  title?: string
  headerContent?: ReactNode
  onToggleTheme: () => void
  children: ReactNode
}

export function AppShell({
  theme,
  title = 'Visualizer Project',
  headerContent,
  onToggleTheme,
  children,
}: AppShellProps) {
  const classes = themeClasses[theme]

  return (
    <div className={`min-h-screen ${classes.app}`}>
      <header className={`border-b backdrop-blur ${classes.header}`}>
        <nav className="mx-auto flex min-h-14 w-full min-w-[360px] items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-3">
            <p
              className={`text-2xl font-bold uppercase tracking-[0.12em] sm:whitespace-nowrap ${classes.titleText}`}
            >
              <span className="sm:hidden">
                Visualizer
                <br />
                Project
              </span>
              <span className="hidden sm:inline">{title}</span>
            </p>
            {headerContent}
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>
      </header>
      <main className="mx-auto w-full min-w-[360px] px-4 pb-8 sm:px-6">{children}</main>
    </div>
  )
}