import type { SearchCellType, SearchPaintMode } from '../domain'

export type SearchAppState = {
  selectedAlgorithm: string
  paintMode: SearchPaintMode
  cols: number
  grid: SearchCellType[][]
  isPainting: boolean
}

