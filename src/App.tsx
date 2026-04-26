import { useState } from 'react'

import { AppShell } from './components/Layout/AppShell'
import { ModeTabs } from './components/ui/ModeTabs'
import { ALGORITHM_DOMAINS, type AlgorithmDomain } from './core/types/algorithms'
import type { Theme } from './core/types/common'
import { ClassificationPage } from './features/classification/ClassificationPage'
import { SearchPage } from './features/search/SearchPage'

const routes = [
  ALGORITHM_DOMAINS.Search,
  ALGORITHM_DOMAINS.Classification,
  ALGORITHM_DOMAINS.Clustering,
] as const

export default function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [activeRoute, setActiveRoute] = useState<AlgorithmDomain>(ALGORITHM_DOMAINS.Search)

  return (
    <AppShell
      theme={theme}
      onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      headerContent={
        <ModeTabs
          items={routes}
          active={activeRoute}
          onChange={(value) => setActiveRoute(value as AlgorithmDomain)}
          disabledItems={[ALGORITHM_DOMAINS.Classification, ALGORITHM_DOMAINS.Clustering]}
          theme={theme}
        />
      }
    >
      {activeRoute === ALGORITHM_DOMAINS.Search && <SearchPage theme={theme} />}
      {activeRoute === ALGORITHM_DOMAINS.Classification && <ClassificationPage theme={theme} />}
      {activeRoute === ALGORITHM_DOMAINS.Clustering && (
        <p className="mt-4 text-sm">Clustering domain scaffold is ready.</p>
      )}
    </AppShell>
  )
}
