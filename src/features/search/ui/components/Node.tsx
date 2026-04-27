import type { CellType, Theme } from '../../../../core/types/common'

type NodeProps = {
  cell: CellType
  rowIndex: number
  colIndex: number
  theme: Theme
  onPointerDown: (rowIndex: number, colIndex: number) => void
  onPointerEnter: (rowIndex: number, colIndex: number) => void
}

export function Node({
  cell,
  rowIndex,
  colIndex,
  theme,
  onPointerDown,
  onPointerEnter,
}: NodeProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onPointerDown={() => onPointerDown(rowIndex, colIndex)}
      onPointerEnter={() => onPointerEnter(rowIndex, colIndex)}
      className={`h-full w-full rounded-sm border transition ${
        cell === 'empty'
          ? isDark
            ? 'border-[#3A3A3A] bg-[#212121] hover:bg-[#2A2A2A]'
            : 'border-[#BFBFBF] bg-[#E5E5E5] hover:bg-[#D1D1D1]'
          : cell === 'wall'
            ? isDark
              ? 'border-[#4A4A4A] bg-[#9E9E9E]'
              : 'border-[#8A8A8A] bg-[#B0B0B0]'
            : cell === 'start'
              ? 'border-emerald-600 bg-emerald-500'
              : 'border-orange-600 bg-orange-500'
      }`}
      title={`Node [${rowIndex}, ${colIndex}]`}
      style={{ touchAction: 'none' }}
    />
  )
}

