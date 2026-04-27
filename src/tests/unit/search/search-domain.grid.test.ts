import { describe, expect, it } from 'vitest'

import { applyPaintToGrid, createInitialGrid, selectGridStats } from '../../../features/search/domain'

describe('search domain grid rules', () => {
  it('creates an empty grid of the requested shape', () => {
    const grid = createInitialGrid(2, 3)
    expect(grid).toHaveLength(2)
    expect(grid[0]).toHaveLength(3)
    expect(selectGridStats(grid)).toEqual({ walls: 0, startCount: 0, endCount: 0 })
  })

  it('keeps exactly one start cell when painting start twice', () => {
    const grid0 = createInitialGrid(2, 3)
    const grid1 = applyPaintToGrid(grid0, 'start', 0, 0)
    const grid2 = applyPaintToGrid(grid1, 'start', 0, 1)

    expect(selectGridStats(grid2).startCount).toBe(1)
  })

  it('keeps exactly one end cell when painting end twice', () => {
    const grid0 = createInitialGrid(2, 3)
    const grid1 = applyPaintToGrid(grid0, 'end', 0, 0)
    const grid2 = applyPaintToGrid(grid1, 'end', 1, 2)

    expect(selectGridStats(grid2).endCount).toBe(1)
  })

  it('erases a painted cell back to empty', () => {
    const grid0 = createInitialGrid(2, 3)
    const grid1 = applyPaintToGrid(grid0, 'wall', 1, 1)
    expect(selectGridStats(grid1).walls).toBe(1)

    const grid2 = applyPaintToGrid(grid1, 'erase', 1, 1)
    expect(selectGridStats(grid2)).toEqual({ walls: 0, startCount: 0, endCount: 0 })
  })
})

