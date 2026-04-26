export type Theme = 'light' | 'dark'

export const SMALL_BREAKPOINT = 700
export const LARGE_BREAKPOINT = 1080

export type Coordinate = {
  row: number
  col: number
}

export type Point = Coordinate

export type CellType = 'empty' | 'wall' | 'start' | 'end'
export type PaintMode = 'wall' | 'start' | 'end' | 'erase'
