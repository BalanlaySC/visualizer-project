import { describe, expect, it } from 'vitest'

import { SearchActions, createInitialSearchState, searchReducer } from '../../../features/search/application'
import { selectGridStats } from '../../../features/search/domain'

describe('search application reducer', () => {
  it('resets grid back to empty with current cols', () => {
    const state0 = createInitialSearchState({
      initialWidth: 9999,
      breakpoints: { small: 700, large: 1080 },
    })

    const state1 = searchReducer(state0, SearchActions.paintCell(0, 0))
    expect(selectGridStats(state1.grid).walls).toBe(1)

    const state2 = searchReducer(state1, SearchActions.resetGrid())
    expect(selectGridStats(state2.grid)).toEqual({ walls: 0, startCount: 0, endCount: 0 })
  })

  it('changes cols via explicit transition and recreates grid', () => {
    const state0 = createInitialSearchState({
      initialWidth: 9999,
      breakpoints: { small: 700, large: 1080 },
    })

    const state1 = searchReducer(state0, SearchActions.colsChanged(10))
    expect(state1.cols).toBe(10)
    expect(state1.grid[0]).toHaveLength(10)
  })
})

