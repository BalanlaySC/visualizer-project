import type { ClassificationAlgorithm } from './types'
import { ALGORITHM_DOMAINS } from '../../../core/types/algorithms'

export const DEFAULT_K_VALUE = 3

export const DEFAULT_FEATURE_NAMES = ['Feature 1', 'Feature 2']

export const CLASSIFICATION_ALGORITHMS: ClassificationAlgorithm[] = [
  {
    id: 'KNN',
    name: 'K-Nearest Neighbors (KNN)',
    domain: ALGORITHM_DOMAINS.Classification,
  },
  {
    id: 'DecisionTree',
    name: 'Decision Tree',
    domain: ALGORITHM_DOMAINS.Classification,
  },
  {
    id: 'NaiveBayes',
    name: 'Naive Bayes',
    domain: ALGORITHM_DOMAINS.Classification,
  },
]

export const MAX_DATA_POINTS = 100

export const MIN_DATA_POINTS_FOR_TRAINING = 5

export const DEFAULT_TRAIN_TEST_SPLIT = 0.8