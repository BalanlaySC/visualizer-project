import { useEffect, useMemo, useReducer } from 'react'

import { SEARCH_ALGORITHMS } from '../../../core/types/algorithms'
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT, type PaintMode, type Theme } from '../../../core/types/common'
import { SearchActions, computeNextColsForWidth, createInitialSearchState, searchReducer } from '../application'
import { selectGridStats } from '../domain'
import { Grid } from './components/Grid'
import { Toolbar } from './components/Toolbar'

const CELL_SIZE_PX = 28

type SearchPageProps = {
  theme: Theme
}

export function SearchPage({ theme }: SearchPageProps) {
  const breakpoints = useMemo(
    () => ({ small: SMALL_BREAKPOINT, large: LARGE_BREAKPOINT }),
    [],
  )

  const [state, dispatch] = useReducer(
    searchReducer,
    undefined,
    () => createInitialSearchState({ initialWidth: window.innerWidth, breakpoints }),
  )
  const stats = useMemo(() => selectGridStats(state.grid), [state.grid])

  useEffect(() => {
    const handleResize = () => {
      const nextCols = computeNextColsForWidth(window.innerWidth, breakpoints)
      dispatch(SearchActions.colsChanged(nextCols))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoints])

  useEffect(() => {
    const handlePointerUp = () => dispatch(SearchActions.stopPainting())
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  const resetGrid = () => dispatch(SearchActions.resetGrid())

  const handleCellPointerDown = (rowIndex: number, colIndex: number) => {
    dispatch(SearchActions.startPainting())
    dispatch(SearchActions.paintCell(rowIndex, colIndex))
  }

  const handleCellPointerEnter = (rowIndex: number, colIndex: number) => {
    if (!state.isPainting) return
    dispatch(SearchActions.paintCell(rowIndex, colIndex))
  }

  return (
    <>
      <Toolbar
        theme={theme}
        algorithms={SEARCH_ALGORITHMS}
        selectedAlgorithm={state.selectedAlgorithm}
        paintMode={state.paintMode as PaintMode}
        stats={stats}
        onSelectedAlgorithmChange={(algorithm) => dispatch(SearchActions.algorithmChanged(algorithm))}
        onPaintModeChange={(paintMode) => dispatch(SearchActions.paintModeChanged(paintMode))}
        onResetGrid={resetGrid}
      />

      <Grid
        grid={state.grid}
        cols={state.cols}
        cellSize={CELL_SIZE_PX}
        theme={theme}
        onCellPointerDown={handleCellPointerDown}
        onCellPointerEnter={handleCellPointerEnter}
      />
    </>
  )
}

