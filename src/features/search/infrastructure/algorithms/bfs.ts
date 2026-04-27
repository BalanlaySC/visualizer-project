import type { SearchPathfindingAlgorithm } from '../../application/pathfindingContract'
import { coordKey, getNeighbors4, reconstructPath } from './gridGraph'

export const bfsAlgorithm: SearchPathfindingAlgorithm = {
  id: 'bfs',
  label: 'Breadth-First Search',
  run: ({ grid, start, end }) => {
    const startKey = coordKey(start)
    const endKey = coordKey(end)

    const visited: { rowIndex: number; colIndex: number }[] = []
    const queue: { rowIndex: number; colIndex: number }[] = [start]
    const seen = new Set<string>([startKey])
    const cameFrom = new Map<string, string | null>([[startKey, null]])

    while (queue.length > 0) {
      const current = queue.shift()!
      const currentKey = coordKey(current)
      visited.push(current)

      if (currentKey === endKey) {
        return { visited, path: reconstructPath(cameFrom, endKey), found: true }
      }

      for (const n of getNeighbors4(grid, current)) {
        const nk = coordKey(n)
        if (seen.has(nk)) continue
        seen.add(nk)
        cameFrom.set(nk, currentKey)
        queue.push(n)
      }
    }

    return { visited, path: [], found: false }
  },
}

