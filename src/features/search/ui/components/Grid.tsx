import type { CellType, Theme } from '../../../../core/types/common'
import { Node } from './Node'

type GridProps = {
  grid: CellType[][]
  cols: number
  cellSize: number
  theme: Theme
  onCellPointerDown: (rowIndex: number, colIndex: number) => void
  onCellPointerEnter: (rowIndex: number, colIndex: number) => void
}

export function Grid({
  grid,
  cols,
  cellSize,
  theme,
  onCellPointerDown,
  onCellPointerEnter,
}: GridProps) {
  const isDark = theme === 'dark'

  return (
    <section
      className={`overflow-auto rounded-xl border p-4 ${
        isDark ? 'border-[#2B2B2B] bg-[#212121]' : 'border-[#C9C9C9] bg-[#D1D1D1]'
      }`}
    >
      <div
        className="mx-auto grid w-fit gap-1"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridAutoRows: `${cellSize}px`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Node
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              theme={theme}
              onPointerDown={onCellPointerDown}
              onPointerEnter={onCellPointerEnter}
            />
          )),
        )}
      </div>
    </section>
  )
}

