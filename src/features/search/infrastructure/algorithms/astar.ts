import type { SearchPathfindingAlgorithm } from '../../application/pathfindingContract'
import { MinPriorityQueue } from './priorityQueue'
import { coordKey, getNeighbors4, manhattan, reconstructPath } from './gridGraph'

export const astarAlgorithm: SearchPathfindingAlgorithm = {
  id: 'astar',
  label: 'A* Search',
  run: ({ grid, start, end }) => {
    const startKey = coordKey(start)
    const endKey = coordKey(end)

    const visited: { rowIndex: number; colIndex: number }[] = []
    const open = new MinPriorityQueue<{ rowIndex: number; colIndex: number }>()

    const gScore = new Map<string, number>([[startKey, 0]])
    const cameFrom = new Map<string, string | null>([[startKey, null]])
    const closed = new Set<string>()

    open.push(start, manhattan(start, end))

    while (open.size > 0) {
      const current = open.pop()!
      const currentKey = coordKey(current)
      if (closed.has(currentKey)) continue
      closed.add(currentKey)
      visited.push(current)

      if (currentKey === endKey) {
        return { visited, path: reconstructPath(cameFrom, endKey), found: true }
      }

      const baseG = gScore.get(currentKey) ?? Number.POSITIVE_INFINITY
      for (const n of getNeighbors4(grid, current)) {
        const nk = coordKey(n)
        const tentativeG = baseG + 1
        if (tentativeG < (gScore.get(nk) ?? Number.POSITIVE_INFINITY)) {
          gScore.set(nk, tentativeG)
          cameFrom.set(nk, currentKey)
          const f = tentativeG + manhattan(n, end)
          open.push(n, f)
        }
      }
    }

    return { visited, path: [], found: false }
  },
}

