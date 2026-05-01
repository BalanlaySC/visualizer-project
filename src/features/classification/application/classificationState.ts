import type {
  ClassificationAlgorithmType,
  ClassificationMode,
  Classifier,
  DataPoint,
  Prediction,
} from '../domain'

export type ClassificationAppState = {
  algorithm: ClassificationAlgorithmType
  mode: ClassificationMode
  classifier: Classifier
  dataset: DataPoint[]
  predictions: Prediction[]
  featureNames: string[]
  kValue: number
  selectedDataPointId: string | null
}

export const initialClassificationState: ClassificationAppState = {
  algorithm: 'KNN',
  mode: 'train',
  classifier: {
    algorithm: 'KNN',
    state: 'idle',
  },
  dataset: [],
  predictions: [],
  featureNames: ['Feature 1', 'Feature 2'],
  kValue: 3,
  selectedDataPointId: null,
}

export function createDataPoint(
  id: string,
  features: number[],
  label: string
): DataPoint {
  return { id, features, label }
}

export function createPrediction(
  dataPointId: string,
  predictedLabel: string,
  confidence: number
): Prediction {
  return { dataPointId, predictedLabel, confidence }
}