import { CLASSIFICATION_ALGORITHMS } from '../../core/types/algorithms'
import type { Theme } from '../../core/types/common'

type ClassificationPageProps = {
  theme: Theme
}

export function ClassificationPage({ theme }: ClassificationPageProps) {
  const isDark = theme === 'dark'

  return (
    <section
      className={`mt-4 rounded-xl border p-4 ${
        isDark ? 'border-[#2B2B2B] bg-[#212121]' : 'border-[#C9C9C9] bg-[#D1D1D1]'
      }`}
    >
      <h2 className={`text-lg font-semibold ${isDark ? 'text-[#E0E0E0]' : 'text-[#000000]'}`}>
        Classification
      </h2>
      <p className={`mt-2 text-sm ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
        This domain is scaffolded and ready for model-specific visualizers.
      </p>
      <ul className="mt-3 list-inside list-disc text-sm">
        {CLASSIFICATION_ALGORITHMS.map((algorithm) => (
          <li key={algorithm}>{algorithm}</li>
        ))}
      </ul>
    </section>
  )
}
