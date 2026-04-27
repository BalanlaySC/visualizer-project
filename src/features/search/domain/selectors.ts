import type { GridStats, SearchCellType } from './types'

export function selectGridStats(grid: SearchCellType[][]): GridStats {
  let walls = 0
  let startCount = 0
  let endCount = 0

  for (const row of grid) {
    for (const node of row) {
      if (node === 'wall') walls += 1
      if (node === 'start') startCount += 1
      if (node === 'end') endCount += 1
    }
  }

  return { walls, startCount, endCount }
}

