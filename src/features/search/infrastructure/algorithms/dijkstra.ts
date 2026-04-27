import type { SearchPathfindingAlgorithm } from '../../application/pathfindingContract'
import { MinPriorityQueue } from './priorityQueue'
import { coordKey, getNeighbors4, reconstructPath } from './gridGraph'

export const dijkstraAlgorithm: SearchPathfindingAlgorithm = {
  id: 'dijkstra',
  label: 'Dijkstra',
  run: ({ grid, start, end }) => {
    const startKey = coordKey(start)
    const endKey = coordKey(end)

    const visited: { rowIndex: number; colIndex: number }[] = []
    const pq = new MinPriorityQueue<{ rowIndex: number; colIndex: number }>()

    const dist = new Map<string, number>([[startKey, 0]])
    const cameFrom = new Map<string, string | null>([[startKey, null]])
    const settled = new Set<string>()

    pq.push(start, 0)

    while (pq.size > 0) {
      const current = pq.pop()!
      const currentKey = coordKey(current)
      if (settled.has(currentKey)) continue
      settled.add(currentKey)
      visited.push(current)

      if (currentKey === endKey) {
        return { visited, path: reconstructPath(cameFrom, endKey), found: true }
      }

      const base = dist.get(currentKey) ?? Number.POSITIVE_INFINITY
      for (const n of getNeighbors4(grid, current)) {
        const nk = coordKey(n)
        const nextDist = base + 1
        if (nextDist < (dist.get(nk) ?? Number.POSITIVE_INFINITY)) {
          dist.set(nk, nextDist)
          cameFrom.set(nk, currentKey)
          pq.push(n, nextDist)
        }
      }
    }

    return { visited, path: [], found: false }
  },
}

