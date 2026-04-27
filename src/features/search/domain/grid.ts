import type { SearchCellType, SearchPaintMode } from './types'

export function createInitialGrid(rows: number, cols: number): SearchCellType[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 'empty' as SearchCellType),
  )
}

function clearCellType(grid: SearchCellType[][], type: SearchCellType): void {
  for (const row of grid) {
    for (let c = 0; c < row.length; c += 1) {
      if (row[c] === type) row[c] = 'empty'
    }
  }
}

export function applyPaintToGrid(
  prev: SearchCellType[][],
  paintMode: SearchPaintMode,
  rowIndex: number,
  colIndex: number,
): SearchCellType[][] {
  const next = prev.map((row) => [...row])

  if (paintMode === 'erase') {
    next[rowIndex][colIndex] = 'empty'
    return next
  }

  if (paintMode === 'start') {
    clearCellType(next, 'start')
    next[rowIndex][colIndex] = 'start'
    return next
  }

  if (paintMode === 'end') {
    clearCellType(next, 'end')
    next[rowIndex][colIndex] = 'end'
    return next
  }

  next[rowIndex][colIndex] = 'wall'
  return next
}

