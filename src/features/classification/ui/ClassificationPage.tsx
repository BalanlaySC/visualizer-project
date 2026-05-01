import { useCallback, useReducer } from 'react'
import type { Theme } from '../../../core/types/common'
import {
  classificationReducer,
  initialClassificationState,
  ClassificationActions,
  canTrain,
  getTrainingStatus,
} from '../application'
import { CLASSIFICATION_ALGORITHMS } from '../domain'

type ClassificationPageProps = {
  theme: Theme
}

export function ClassificationPage({ theme }: ClassificationPageProps) {
  const [state, dispatch] = useReducer(classificationReducer, initialClassificationState)
  const trainingStatus = getTrainingStatus(state)

  const handleAlgorithmChange = useCallback(
    (algorithmId: string) => {
      dispatch(ClassificationActions.algorithmChanged(algorithmId as 'KNN' | 'DecisionTree' | 'NaiveBayes'))
    },
    []
  )

  const handleModeChange = useCallback(
    (mode: 'train' | 'predict' | 'visualize') => {
      dispatch(ClassificationActions.modeChanged(mode))
    },
    []
  )

  const handleAddSampleData = useCallback(() => {
    const samplePoints = [
      { id: '1', features: [1.0, 2.0], label: 'A' },
      { id: '2', features: [1.5, 1.8], label: 'A' },
      { id: '3', features: [1.2, 2.1], label: 'A' },
      { id: '4', features: [5.0, 5.0], label: 'B' },
      { id: '5', features: [5.5, 5.2], label: 'B' },
      { id: '6', features: [5.1, 4.8], label: 'B' },
    ]
    samplePoints.forEach((point) => {
      dispatch(ClassificationActions.addDataPoint({
        ...point,
        features: point.features as number[],
      }))
    })
  }, [])

  const handleTrain = useCallback(() => {
    if (!canTrain(state)) return
    dispatch(ClassificationActions.startTraining())
    // Simulate training with mock accuracy
    setTimeout(() => {
      const mockAccuracy = 0.85 + Math.random() * 0.1
      dispatch(ClassificationActions.completeTraining(mockAccuracy))
    }, 1000)
  }, [state])

  const handleClear = useCallback(() => {
    dispatch(ClassificationActions.clearDataset())
  }, [])

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

      {/* Algorithm Selection */}
      <div className="mt-4">
        <label className={`text-sm font-medium ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
          Algorithm:
        </label>
        <select
          value={state.algorithm}
          onChange={(e) => handleAlgorithmChange(e.target.value)}
          className={`mt-1 w-full rounded-md border px-3 py-2 text-sm ${
            isDark
              ? 'border-[#404040] bg-[#2B2B2B] text-[#E0E0E0]'
              : 'border-[#C9C9C9] bg-white text-[#000000]'
          }`}
        >
          {CLASSIFICATION_ALGORITHMS.map((algo) => (
            <option key={algo.id} value={algo.id}>
              {algo.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mode Selection */}
      <div className="mt-4">
        <label className={`text-sm font-medium ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
          Mode:
        </label>
        <div className="mt-1 flex gap-2">
          {(['train', 'predict', 'visualize'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`rounded-md px-3 py-1 text-sm capitalize ${
                state.mode === mode
                  ? isDark
                    ? 'bg-[#404040] text-[#E0E0E0]'
                    : 'bg-[#C9C9C9] text-[#000000]'
                  : isDark
                    ? 'bg-[#2B2B2B] text-[#9E9E9E] hover:bg-[#353535]'
                    : 'bg-[#E8E8E8] text-[#4A4A4A] hover:bg-[#D5D5D5]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Info */}
      <div className="mt-4">
        <p className={`text-sm ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
          Data points: {state.dataset.length}
        </p>
        <p className={`text-sm ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
          Status: {trainingStatus.message}
        </p>
        {state.classifier.state === 'trained' && state.classifier.accuracy && (
          <p className={`text-sm ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
            Accuracy: {(state.classifier.accuracy * 100).toFixed(1)}%
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleAddSampleData}
          className={`rounded-md px-3 py-1 text-sm ${
            isDark
              ? 'bg-[#404040] text-[#E0E0E0] hover:bg-[#4A4A4A]'
              : 'bg-[#C9C9C9] text-[#000000] hover:bg-[#B5B5B5]'
          }`}
        >
          Add Sample Data
        </button>
        <button
          onClick={handleTrain}
          disabled={!trainingStatus.canTrain || state.classifier.state === 'training'}
          className={`rounded-md px-3 py-1 text-sm ${
            trainingStatus.canTrain && state.classifier.state !== 'training'
              ? isDark
                ? 'bg-[#1B5E20] text-[#E0E0E0] hover:bg-[#2E7D32]'
                : 'bg-[#4CAF50] text-white hover:bg-[#45A049]'
              : isDark
                ? 'bg-[#2B2B2B] text-[#666666]'
                : 'bg-[#E8E8E8] text-[#999999]'
          }`}
        >
          {state.classifier.state === 'training' ? 'Training...' : 'Train'}
        </button>
        <button
          onClick={handleClear}
          disabled={state.dataset.length === 0}
          className={`rounded-md px-3 py-1 text-sm ${
            state.dataset.length > 0
              ? isDark
                ? 'bg-[#B71C1C] text-[#E0E0E0] hover:bg-[#C62828]'
                : 'bg-[#F44336] text-white hover:bg-[#E53935]'
              : isDark
                ? 'bg-[#2B2B2B] text-[#666666]'
                : 'bg-[#E8E8E8] text-[#999999]'
          }`}
        >
          Clear
        </button>
      </div>

      {/* Predictions Display */}
      {state.predictions.length > 0 && (
        <div className="mt-4">
          <h3 className={`text-sm font-medium ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
            Predictions:
          </h3>
          <ul className={`mt-2 list-inside list-disc text-sm ${isDark ? 'text-[#9E9E9E]' : 'text-[#4A4A4A]'}`}>
            {state.predictions.map((pred, index) => (
              <li key={index}>
                Point {pred.dataPointId}: {pred.predictedLabel} ({(pred.confidence * 100).toFixed(1)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}