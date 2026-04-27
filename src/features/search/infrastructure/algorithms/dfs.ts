import type { SearchPathfindingAlgorithm } from '../../application/pathfindingContract'
import { coordKey, getNeighbors4, reconstructPath } from './gridGraph'

export const dfsAlgorithm: SearchPathfindingAlgorithm = {
  id: 'dfs',
  label: 'Depth-First Search',
  run: ({ grid, start, end }) => {
    const startKey = coordKey(start)
    const endKey = coordKey(end)

    const visited: { rowIndex: number; colIndex: number }[] = []
    const stack: { rowIndex: number; colIndex: number }[] = [start]
    const seen = new Set<string>([startKey])
    const cameFrom = new Map<string, string | null>([[startKey, null]])

    while (stack.length > 0) {
      const current = stack.pop()!
      const currentKey = coordKey(current)
      visited.push(current)

      if (currentKey === endKey) {
        return { visited, path: reconstructPath(cameFrom, endKey), found: true }
      }

      const neighbors = getNeighbors4(grid, current)
      for (let i = neighbors.length - 1; i >= 0; i -= 1) {
        const n = neighbors[i]
        const nk = coordKey(n)
        if (seen.has(nk)) continue
        seen.add(nk)
        cameFrom.set(nk, currentKey)
        stack.push(n)
      }
    }

    return { visited, path: [], found: false }
  },
}

