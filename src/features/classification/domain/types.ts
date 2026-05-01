import type { AlgorithmDomain } from '../../../core/types/algorithms'

export type ClassificationAlgorithmType = 'KNN' | 'DecisionTree' | 'NaiveBayes'

export type ClassificationAlgorithm = {
  id: ClassificationAlgorithmType
  name: string
  domain: AlgorithmDomain
}

export type FeatureVector = number[]

export type DataPoint = {
  id: string
  features: FeatureVector
  label: string
}

export type TrainingDataset = {
  points: DataPoint[]
  featureNames: string[]
}

export type Prediction = {
  dataPointId: string
  predictedLabel: string
  confidence: number
}

export type ClassifierState = 'idle' | 'training' | 'trained' | 'error'

export type Classifier = {
  algorithm: ClassificationAlgorithmType
  state: ClassifierState
  accuracy?: number
  lastTrainedAt?: number
}

export type ClassificationMode = 'train' | 'predict' | 'visualize'