import { describe, expect, it } from 'vitest'

import {
  CLASSIFICATION_ALGORITHMS,
  DEFAULT_K_VALUE,
  MAX_DATA_POINTS,
  MIN_DATA_POINTS_FOR_TRAINING,
  DEFAULT_FEATURE_NAMES,
} from '../../../features/classification/domain'

describe('classification domain constants', () => {
  it('defines default K value', () => {
    expect(DEFAULT_K_VALUE).toBe(3)
  })

  it('defines max data points limit', () => {
    expect(MAX_DATA_POINTS).toBe(100)
  })

  it('defines minimum data points for training', () => {
    expect(MIN_DATA_POINTS_FOR_TRAINING).toBe(5)
  })

  it('defines default feature names', () => {
    expect(DEFAULT_FEATURE_NAMES).toEqual(['Feature 1', 'Feature 2'])
    expect(DEFAULT_FEATURE_NAMES).toHaveLength(2)
  })

  it('defines classification algorithms', () => {
    expect(CLASSIFICATION_ALGORITHMS).toHaveLength(3)
    expect(CLASSIFICATION_ALGORITHMS.map((a) => a.id)).toContain('KNN')
    expect(CLASSIFICATION_ALGORITHMS.map((a) => a.id)).toContain('DecisionTree')
    expect(CLASSIFICATION_ALGORITHMS.map((a) => a.id)).toContain('NaiveBayes')
  })

  it('ensures all algorithms have Classification domain', () => {
    CLASSIFICATION_ALGORITHMS.forEach((algo) => {
      expect(algo.domain).toBe('Classification')
    })
  })
})