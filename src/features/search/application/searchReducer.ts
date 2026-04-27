import { SEARCH_GRID_ROWS, applyPaintToGrid, createInitialGrid } from '../domain'
import type { SearchAppAction } from './searchActions'
import type { SearchAppState } from './searchState'

export function searchReducer(state: SearchAppState, action: SearchAppAction): SearchAppState {
  switch (action.type) {
    case 'algorithm/changed':
      return { ...state, selectedAlgorithm: action.algorithm }
    case 'paintMode/changed':
      return { ...state, paintMode: action.paintMode }
    case 'painting/started':
      return { ...state, isPainting: true }
    case 'painting/stopped':
      return { ...state, isPainting: false }
    case 'viewport/colsChanged': {
      if (action.cols === state.cols) return state
      return {
        ...state,
        cols: action.cols,
        grid: createInitialGrid(SEARCH_GRID_ROWS, action.cols),
      }
    }
    case 'grid/reset':
      return { ...state, grid: createInitialGrid(SEARCH_GRID_ROWS, state.cols) }
    case 'grid/painted':
      return {
        ...state,
        grid: applyPaintToGrid(state.grid, state.paintMode, action.rowIndex, action.colIndex),
      }
    default: {
      const _exhaustive: never = action
      void _exhaustive
      return state
    }
  }
}

