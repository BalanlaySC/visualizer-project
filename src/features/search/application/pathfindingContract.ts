import type { SearchCellType } from '../domain'

export type GridCoordinate = {
  rowIndex: number
  colIndex: number
}

export type PathfindingProblem = {
  grid: SearchCellType[][]
  start: GridCoordinate
  end: GridCoordinate
}

export type PathfindingResult = {
  visited: GridCoordinate[]
  path: GridCoordinate[]
  found: boolean
}

export type SearchPathfindingAlgorithmId = 'bfs' | 'dfs' | 'dijkstra' | 'astar'

export type SearchPathfindingAlgorithm = {
  id: SearchPathfindingAlgorithmId
  label: string
  run: (problem: PathfindingProblem) => PathfindingResult
}

