import type { Breakpoints } from '../domain'
import { SEARCH_GRID_ROWS, createInitialGrid, getSearchGridColsForWidth } from '../domain'
import type { SearchAppState } from './searchState'

export type SearchControllerConfig = {
  breakpoints: Breakpoints
  initialWidth: number
}

export function createInitialSearchState(config: SearchControllerConfig): SearchAppState {
  const cols = getSearchGridColsForWidth(config.initialWidth, config.breakpoints)

  return {
    selectedAlgorithm: '',
    paintMode: 'wall',
    cols,
    grid: createInitialGrid(SEARCH_GRID_ROWS, cols),
    isPainting: false,
  }
}

export function computeNextColsForWidth(
  width: number,
  breakpoints: Breakpoints,
): number {
  return getSearchGridColsForWidth(width, breakpoints)
}

