import type {
  ClassificationAlgorithmType,
  ClassificationMode,
  DataPoint,
  FeatureVector,
} from '../domain'

export type ClassificationAppAction =
  | { type: 'algorithm/changed'; algorithm: ClassificationAlgorithmType }
  | { type: 'mode/changed'; mode: ClassificationMode }
  | { type: 'datapoint/added'; point: DataPoint }
  | { type: 'datapoint/removed'; pointId: string }
  | { type: 'datapoint/updated'; pointId: string; features: FeatureVector; label: string }
  | { type: 'dataset/cleared' }
  | { type: 'training/started' }
  | { type: 'training/completed'; accuracy: number }
  | { type: 'training/failed'; error: string }
  | { type: 'prediction/made'; prediction: { dataPointId: string; predictedLabel: string; confidence: number } }
  | { type: 'kValue/changed'; k: number }
  | { type: 'featureNames/changed'; names: string[] }

export const ClassificationActions = {
  algorithmChanged: (algorithm: ClassificationAlgorithmType): ClassificationAppAction => ({
    type: 'algorithm/changed',
    algorithm,
  }),
  modeChanged: (mode: ClassificationMode): ClassificationAppAction => ({
    type: 'mode/changed',
    mode,
  }),
  addDataPoint: (point: DataPoint): ClassificationAppAction => ({
    type: 'datapoint/added',
    point,
  }),
  removeDataPoint: (pointId: string): ClassificationAppAction => ({
    type: 'datapoint/removed',
    pointId,
  }),
  updateDataPoint: (pointId: string, features: FeatureVector, label: string): ClassificationAppAction => ({
    type: 'datapoint/updated',
    pointId,
    features,
    label,
  }),
  clearDataset: (): ClassificationAppAction => ({
    type: 'dataset/cleared',
  }),
  startTraining: (): ClassificationAppAction => ({
    type: 'training/started',
  }),
  completeTraining: (accuracy: number): ClassificationAppAction => ({
    type: 'training/completed',
    accuracy,
  }),
  failTraining: (error: string): ClassificationAppAction => ({
    type: 'training/failed',
    error,
  }),
  makePrediction: (prediction: { dataPointId: string; predictedLabel: string; confidence: number }): ClassificationAppAction => ({
    type: 'prediction/made',
    prediction,
  }),
  kValueChanged: (k: number): ClassificationAppAction => ({
    type: 'kValue/changed',
    k,
  }),
  featureNamesChanged: (names: string[]): ClassificationAppAction => ({
    type: 'featureNames/changed',
    names,
  }),
} as const