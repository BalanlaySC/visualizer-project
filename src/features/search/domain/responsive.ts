import type { Breakpoints } from './types'
import { SEARCH_GRID_COLS } from './constants'

export function getSearchGridColsForWidth(width: number, breakpoints: Breakpoints): number {
  if (width < breakpoints.small) return SEARCH_GRID_COLS.small
  if (width < breakpoints.large) return SEARCH_GRID_COLS.medium
  return SEARCH_GRID_COLS.large
}

