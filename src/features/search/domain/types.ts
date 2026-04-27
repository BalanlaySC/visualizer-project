import type { CellType, PaintMode } from '../../../core/types/common'

export type SearchCellType = CellType
export type SearchPaintMode = PaintMode

export type Breakpoints = {
  small: number
  large: number
}

export type GridCoordinate = {
  rowIndex: number
  colIndex: number
}

export type GridStats = {
  walls: number
  startCount: number
  endCount: number
}

