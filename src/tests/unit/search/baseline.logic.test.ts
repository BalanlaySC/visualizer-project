import { describe, expect, it } from 'vitest'

import { SEARCH_ALGORITHMS } from '../../../core/types/algorithms'
import { LARGE_BREAKPOINT, SMALL_BREAKPOINT } from '../../../core/types/common'

describe('search baseline logic invariants', () => {
  it('keeps responsive breakpoint ordering for the current grid behavior', () => {
    expect(SMALL_BREAKPOINT).toBeLessThan(LARGE_BREAKPOINT)
  })

  it('keeps the current set of search algorithms visible in the selector', () => {
    expect(SEARCH_ALGORITHMS).toEqual([
      'Breadth-First Search',
      'Depth-First Search',
      'Dijkstra',
      'A* Search',
    ])
  })
})
