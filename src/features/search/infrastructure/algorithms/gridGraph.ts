import type { SearchCellType } from '../../domain'
import type { GridCoordinate } from '../../application/pathfindingContract'

export function coordKey(coord: GridCoordinate): string {
  return `${coord.rowIndex},${coord.colIndex}`
}

export function inBounds(grid: SearchCellType[][], coord: GridCoordinate): boolean {
  return (
    coord.rowIndex >= 0 &&
    coord.rowIndex < grid.length &&
    coord.colIndex >= 0 &&
    coord.colIndex < (grid[0]?.length ?? 0)
  )
}

export function isWalkable(cell: SearchCellType): boolean {
  return cell !== 'wall'
}

export function getNeighbors4(grid: SearchCellType[][], coord: GridCoordinate): GridCoordinate[] {
  const candidates: GridCoordinate[] = [
    { rowIndex: coord.rowIndex - 1, colIndex: coord.colIndex },
    { rowIndex: coord.rowIndex + 1, colIndex: coord.colIndex },
    { rowIndex: coord.rowIndex, colIndex: coord.colIndex - 1 },
    { rowIndex: coord.rowIndex, colIndex: coord.colIndex + 1 },
  ]

  return candidates.filter((c) => inBounds(grid, c) && isWalkable(grid[c.rowIndex][c.colIndex]))
}

export function reconstructPath(
  cameFrom: Map<string, string | null>,
  endKey: string,
): GridCoordinate[] {
  const pathKeys: string[] = []
  let current: string | null | undefined = endKey

  while (current) {
    pathKeys.push(current)
    current = cameFrom.get(current)
  }

  pathKeys.reverse()
  return pathKeys.map((k) => {
    const [r, c] = k.split(',').map((n) => Number(n))
    return { rowIndex: r, colIndex: c }
  })
}

export function manhattan(a: GridCoordinate, b: GridCoordinate): number {
  return Math.abs(a.rowIndex - b.rowIndex) + Math.abs(a.colIndex - b.colIndex)
}

