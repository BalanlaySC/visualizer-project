import { describe, expect, it } from 'vitest'

import { createInitialGrid } from '../../../features/search/domain'
import { listSearchAlgorithms } from '../../../features/search/application'

describe('search infrastructure algorithms', () => {
  it('all algorithms conform to the contract surface', () => {
    const labels = listSearchAlgorithms().map((a) => a.label)
    expect(labels).toEqual(['Breadth-First Search', 'Depth-First Search', 'Dijkstra', 'A* Search'])
  })

  it('finds a shortest path on an empty grid from start to end', () => {
    const grid = createInitialGrid(3, 3)
    const start = { rowIndex: 0, colIndex: 0 }
    const end = { rowIndex: 0, colIndex: 2 }

    for (const algorithm of listSearchAlgorithms()) {
      const result = algorithm.run({ grid, start, end })
      expect(result.found).toBe(true)
      expect(result.path[0]).toEqual(start)
      expect(result.path[result.path.length - 1]).toEqual(end)

      // Manhattan distance 2 => nodes count is 3 including endpoints.
      // DFS is not guaranteed to produce a shortest path; the others should.
      if (algorithm.id === 'dfs') {
        expect(result.path.length).toBeGreaterThanOrEqual(3)
      } else {
        expect(result.path.length).toBe(3)
      }
    }
  })

  it('returns found=false and empty path when no route exists', () => {
    const grid = createInitialGrid(3, 3)
    const start = { rowIndex: 0, colIndex: 0 }
    const end = { rowIndex: 0, colIndex: 2 }

    // Block the only route by walling the middle and surrounding
    grid[0][1] = 'wall'
    grid[1][0] = 'wall'
    grid[1][1] = 'wall'
    grid[1][2] = 'wall'

    for (const algorithm of listSearchAlgorithms()) {
      const result = algorithm.run({ grid, start, end })
      expect(result.found).toBe(false)
      expect(result.path).toEqual([])
      expect(result.visited.length).toBeGreaterThan(0)
    }
  })
})

