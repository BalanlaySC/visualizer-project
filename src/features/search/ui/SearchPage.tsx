import { useEffect, useMemo, useReducer } from 'react'

import { SEARCH_ALGORITHMS } from '../../../core/types/algorithms'
import {
  LARGE_BREAKPOINT,
  SMALL_BREAKPOINT,
  type PaintMode,
  type Theme,
} from '../../../core/types/common'
import { SearchActions, computeNextColsForWidth, createInitialSearchState, searchReducer } from '../application'
import { selectGridStats } from '../domain'
import { Grid } from './components/Grid'

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
  const isDark = theme === 'dark'

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
      <section
        className={`mb-4 mt-4 grid gap-3 rounded-xl border p-3 md:grid-cols-2 lg:grid-cols-4 ${
          isDark ? 'border-[#2B2B2B] bg-[#212121]' : 'border-[#C9C9C9] bg-[#D1D1D1]'
        }`}
      >
        <label className="flex flex-col gap-2 text-sm">
          <span className={isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}>Selected Algorithm</span>
          <select
            value={state.selectedAlgorithm}
            onChange={(e) => dispatch(SearchActions.algorithmChanged(e.target.value))}
            className={`rounded-lg border px-3 py-2 outline-none ring-[#98C379] focus:ring ${
              isDark
                ? 'border-[#3A3A3A] bg-[#2A2A2A] text-[#E0E0E0]'
                : 'border-[#C9C9C9] bg-[#E5E5E5] text-[#000000]'
            }`}
          >
            <option value="" disabled>
              Select an algorithm
            </option>
            {SEARCH_ALGORITHMS.map((algorithm) => (
              <option key={algorithm} value={algorithm}>
                {algorithm}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className={isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}>
            Node Tool - Click or hold and drag to paint
          </span>
          <select
            value={state.paintMode as PaintMode}
            onChange={(e) => dispatch(SearchActions.paintModeChanged(e.target.value as PaintMode))}
            className={`rounded-lg border px-3 py-2 outline-none ring-[#98C379] focus:ring ${
              isDark
                ? 'border-[#3A3A3A] bg-[#2A2A2A] text-[#E0E0E0]'
                : 'border-[#C9C9C9] bg-[#E5E5E5] text-[#000000]'
            }`}
          >
            <option value="wall">Draw Walls</option>
            <option value="start">Set Start Node</option>
            <option value="end">Set End Node</option>
            <option value="erase">Erase Node</option>
          </select>
        </label>

        <div
          className={`rounded-lg border px-3 py-2 text-sm ${
            isDark
              ? 'border-[#3A3A3A] bg-[#2A2A2A]'
              : 'border-[#C9C9C9] bg-[#E5E5E5] text-[#000000]'
          }`}
        >
          <p className={isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}>Grid Stats</p>
          <p className={`mt-1 ${isDark ? 'text-[#E0E0E0]' : 'text-[#000000]'}`}>
            Walls: {stats.walls} | Start: {stats.startCount} | End: {stats.endCount}
          </p>
        </div>

        <button
          type="button"
          onClick={resetGrid}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            isDark
              ? 'border-[#C05C65]/70 bg-[#C05C65]/15 text-[#9E9E9E] hover:bg-[#C05C65]/25'
              : 'border-[#E06C75]/70 bg-[#E06C75]/15 text-[#4A4A4A] hover:bg-[#E06C75]/25'
          }`}
        >
          Reset Grid
        </button>
      </section>

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

