import type { SearchPaintMode } from '../domain'

export type SearchAppAction =
  | { type: 'algorithm/changed'; algorithm: string }
  | { type: 'paintMode/changed'; paintMode: SearchPaintMode }
  | { type: 'grid/reset' }
  | { type: 'grid/painted'; rowIndex: number; colIndex: number }
  | { type: 'painting/started' }
  | { type: 'painting/stopped' }
  | { type: 'viewport/colsChanged'; cols: number }

export const SearchActions = {
  algorithmChanged: (algorithm: string): SearchAppAction => ({ type: 'algorithm/changed', algorithm }),
  paintModeChanged: (paintMode: SearchPaintMode): SearchAppAction => ({ type: 'paintMode/changed', paintMode }),
  resetGrid: (): SearchAppAction => ({ type: 'grid/reset' }),
  paintCell: (rowIndex: number, colIndex: number): SearchAppAction => ({
    type: 'grid/painted',
    rowIndex,
    colIndex,
  }),
  startPainting: (): SearchAppAction => ({ type: 'painting/started' }),
  stopPainting: (): SearchAppAction => ({ type: 'painting/stopped' }),
  colsChanged: (cols: number): SearchAppAction => ({ type: 'viewport/colsChanged', cols }),
} as const

