import type { PaintMode, Theme } from '../../../../core/types/common'
import type { GridStats } from '../../domain'

type ToolbarProps = {
  theme: Theme
  algorithms: readonly string[]
  selectedAlgorithm: string
  paintMode: PaintMode
  stats: GridStats
  onSelectedAlgorithmChange: (algorithm: string) => void
  onPaintModeChange: (paintMode: PaintMode) => void
  onResetGrid: () => void
}

export function Toolbar({
  theme,
  algorithms,
  selectedAlgorithm,
  paintMode,
  stats,
  onSelectedAlgorithmChange,
  onPaintModeChange,
  onResetGrid,
}: ToolbarProps) {
  const isDark = theme === 'dark'

  return (
    <section
      className={`mb-4 mt-4 grid gap-3 rounded-xl border p-3 md:grid-cols-2 lg:grid-cols-4 ${
        isDark ? 'border-[#2B2B2B] bg-[#212121]' : 'border-[#C9C9C9] bg-[#D1D1D1]'
      }`}
    >
      <label className="flex flex-col gap-2 text-sm">
        <span className={isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}>Selected Algorithm</span>
        <select
          value={selectedAlgorithm}
          onChange={(e) => onSelectedAlgorithmChange(e.target.value)}
          className={`rounded-lg border px-3 py-2 outline-none ring-[#98C379] focus:ring ${
            isDark
              ? 'border-[#3A3A3A] bg-[#2A2A2A] text-[#E0E0E0]'
              : 'border-[#C9C9C9] bg-[#E5E5E5] text-[#000000]'
          }`}
        >
          <option value="" disabled>
            Select an algorithm
          </option>
          {algorithms.map((algorithm) => (
            <option key={algorithm} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className={isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}>
          Node Tool - Click or hold and drag to paint
        </span>
        <select
          value={paintMode}
          onChange={(e) => onPaintModeChange(e.target.value as PaintMode)}
          className={`rounded-lg border px-3 py-2 outline-none ring-[#98C379] focus:ring ${
            isDark
              ? 'border-[#3A3A3A] bg-[#2A2A2A] text-[#E0E0E0]'
              : 'border-[#C9C9C9] bg-[#E5E5E5] text-[#000000]'
          }`}
        >
          <option value="wall">Draw Walls</option>
          <option value="start">Set Start Node</option>
          <option value="end">Set End Node</option>
          <option value="erase">Erase Node</option>
        </select>
      </label>

      <div
        className={`rounded-lg border px-3 py-2 text-sm ${
          isDark ? 'border-[#3A3A3A] bg-[#2A2A2A]' : 'border-[#C9C9C9] bg-[#E5E5E5] text-[#000000]'
        }`}
      >
        <p className={isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}>Grid Stats</p>
        <p className={`mt-1 ${isDark ? 'text-[#E0E0E0]' : 'text-[#000000]'}`}>
          Walls: {stats.walls} | Start: {stats.startCount} | End: {stats.endCount}
        </p>
      </div>

      <button
        type="button"
        onClick={onResetGrid}
        className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
          isDark
            ? 'border-[#C05C65]/70 bg-[#C05C65]/15 text-[#9E9E9E] hover:bg-[#C05C65]/25'
            : 'border-[#E06C75]/70 bg-[#E06C75]/15 text-[#4A4A4A] hover:bg-[#E06C75]/25'
        }`}
      >
        Reset Grid
      </button>
    </section>
  )
}

