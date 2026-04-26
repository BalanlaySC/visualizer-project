import { useEffect, useMemo, useState } from 'react'

import { SEARCH_ALGORITHMS } from '../../core/types/algorithms'
import {
  LARGE_BREAKPOINT,
  SMALL_BREAKPOINT,
  type CellType,
  type PaintMode,
  type Theme,
} from '../../core/types/common'
import { Grid } from './components/Grid'

const ROWS = 12
const SMALL_SCREEN_COLS = 10
const MEDIUM_SCREEN_COLS = 20
const LARGE_SCREEN_COLS = 40
const CELL_SIZE_PX = 28

const createInitialGrid = (rows: number, cols: number) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => 'empty' as CellType))

const getColsForWidth = (width: number) => {
  if (width < SMALL_BREAKPOINT) return SMALL_SCREEN_COLS
  if (width < LARGE_BREAKPOINT) return MEDIUM_SCREEN_COLS
  return LARGE_SCREEN_COLS
}

type SearchPageProps = {
  theme: Theme
}

export function SearchPage({ theme }: SearchPageProps) {
  const [cols, setCols] = useState(() => getColsForWidth(window.innerWidth))
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('')
  const [paintMode, setPaintMode] = useState<PaintMode>('wall')
  const [grid, setGrid] = useState<CellType[][]>(createInitialGrid(ROWS, cols))
  const [isPainting, setIsPainting] = useState(false)
  const isDark = theme === 'dark'

  const stats = useMemo(() => {
    let walls = 0
    let startCount = 0
    let endCount = 0

    for (const row of grid) {
      for (const node of row) {
        if (node === 'wall') walls += 1
        if (node === 'start') startCount += 1
        if (node === 'end') endCount += 1
      }
    }

    return { walls, startCount, endCount }
  }, [grid])

  useEffect(() => {
    const handleResize = () => {
      const nextCols = getColsForWidth(window.innerWidth)

      setCols((prevCols) => {
        if (prevCols === nextCols) return prevCols
        setGrid(createInitialGrid(ROWS, nextCols))
        return nextCols
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handlePointerUp = () => setIsPainting(false)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  const clearType = (nextGrid: CellType[][], type: CellType) => {
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (nextGrid[r][c] === type) nextGrid[r][c] = 'empty'
      }
    }
  }

  const paintCell = (rowIndex: number, colIndex: number) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row])

      if (paintMode === 'erase') {
        next[rowIndex][colIndex] = 'empty'
        return next
      }

      if (paintMode === 'start') {
        clearType(next, 'start')
        next[rowIndex][colIndex] = 'start'
        return next
      }

      if (paintMode === 'end') {
        clearType(next, 'end')
        next[rowIndex][colIndex] = 'end'
        return next
      }

      next[rowIndex][colIndex] = 'wall'
      return next
    })
  }

  const resetGrid = () => setGrid(createInitialGrid(ROWS, cols))

  const handleCellPointerDown = (rowIndex: number, colIndex: number) => {
    setIsPainting(true)
    paintCell(rowIndex, colIndex)
  }

  const handleCellPointerEnter = (rowIndex: number, colIndex: number) => {
    if (!isPainting) return
    paintCell(rowIndex, colIndex)
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
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
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
            value={paintMode}
            onChange={(e) => setPaintMode(e.target.value as PaintMode)}
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
        grid={grid}
        cols={cols}
        cellSize={CELL_SIZE_PX}
        theme={theme}
        onCellPointerDown={handleCellPointerDown}
        onCellPointerEnter={handleCellPointerEnter}
      />
    </>
  )
}
