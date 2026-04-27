import type {
  SearchPathfindingAlgorithm,
  SearchPathfindingAlgorithmId,
} from './pathfindingContract'
import { astarAlgorithm, bfsAlgorithm, dfsAlgorithm, dijkstraAlgorithm } from '../infrastructure'

const algorithms: Record<SearchPathfindingAlgorithmId, SearchPathfindingAlgorithm> = {
  bfs: bfsAlgorithm,
  dfs: dfsAlgorithm,
  dijkstra: dijkstraAlgorithm,
  astar: astarAlgorithm,
}

export function getSearchAlgorithmById(id: SearchPathfindingAlgorithmId): SearchPathfindingAlgorithm {
  return algorithms[id]
}

export function listSearchAlgorithms(): SearchPathfindingAlgorithm[] {
  return Object.values(algorithms)
}

export function getSearchAlgorithmByLabel(label: string): SearchPathfindingAlgorithm | undefined {
  return Object.values(algorithms).find((a) => a.label === label)
}

