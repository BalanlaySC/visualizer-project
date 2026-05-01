import { describe, expect, it } from 'vitest'

import {
  ClassificationActions,
  classificationReducer,
  initialClassificationState,
  canTrain,
  getTrainingStatus,
} from '../../../features/classification/application'

describe('classification application reducer', () => {
  it('changes algorithm and resets classifier state', () => {
    const state0 = initialClassificationState

    const state1 = classificationReducer(state0, ClassificationActions.algorithmChanged('DecisionTree'))
    expect(state1.algorithm).toBe('DecisionTree')
    expect(state1.classifier.algorithm).toBe('DecisionTree')
    expect(state1.classifier.state).toBe('idle')
  })

  it('changes mode', () => {
    const state0 = initialClassificationState

    const state1 = classificationReducer(state0, ClassificationActions.modeChanged('predict'))
    expect(state1.mode).toBe('predict')

    const state2 = classificationReducer(state1, ClassificationActions.modeChanged('visualize'))
    expect(state2.mode).toBe('visualize')
  })

  it('adds data points to dataset', () => {
    const state0 = initialClassificationState

    const point = { id: '1', features: [1.0, 2.0], label: 'A' }
    const state1 = classificationReducer(state0, ClassificationActions.addDataPoint(point))
    expect(state1.dataset).toHaveLength(1)
    expect(state1.dataset[0]).toEqual(point)
  })

  it('does not add duplicate data points', () => {
    const state0 = initialClassificationState

    const point = { id: '1', features: [1.0, 2.0], label: 'A' }
    const state1 = classificationReducer(state0, ClassificationActions.addDataPoint(point))
    const state2 = classificationReducer(state1, ClassificationActions.addDataPoint(point))
    expect(state2.dataset).toHaveLength(1)
  })

  it('removes data points and associated predictions', () => {
    const state0 = initialClassificationState

    const point1 = { id: '1', features: [1.0, 2.0], label: 'A' }
    const point2 = { id: '2', features: [5.0, 5.0], label: 'B' }
    const state1 = classificationReducer(state0, ClassificationActions.addDataPoint(point1))
    const state2 = classificationReducer(state1, ClassificationActions.addDataPoint(point2))
    const state3 = classificationReducer(state2, ClassificationActions.makePrediction({
      dataPointId: '1',
      predictedLabel: 'A',
      confidence: 0.9,
    }))

    const state4 = classificationReducer(state3, ClassificationActions.removeDataPoint('1'))
    expect(state4.dataset).toHaveLength(1)
    expect(state4.dataset[0].id).toBe('2')
    expect(state4.predictions).toHaveLength(0)
  })

  it('clears dataset and resets classifier', () => {
    const state0 = initialClassificationState

    const point = { id: '1', features: [1.0, 2.0], label: 'A' }
    const state1 = classificationReducer(state0, ClassificationActions.addDataPoint(point))
    const state2 = classificationReducer(state1, ClassificationActions.startTraining())
    const state3 = classificationReducer(state2, ClassificationActions.completeTraining(0.9))

    const state4 = classificationReducer(state3, ClassificationActions.clearDataset())
    expect(state4.dataset).toHaveLength(0)
    expect(state4.predictions).toHaveLength(0)
    expect(state4.classifier.state).toBe('idle')
    expect(state4.classifier.accuracy).toBeUndefined()
  })

  it('transitions through training states', () => {
    const state0 = initialClassificationState

    const state1 = classificationReducer(state0, ClassificationActions.startTraining())
    expect(state1.classifier.state).toBe('training')

    const state2 = classificationReducer(state1, ClassificationActions.completeTraining(0.85))
    expect(state2.classifier.state).toBe('trained')
    expect(state2.classifier.accuracy).toBe(0.85)
    expect(state2.classifier.lastTrainedAt).toBeDefined()
  })

  it('handles training failure', () => {
    const state0 = initialClassificationState

    const state1 = classificationReducer(state0, ClassificationActions.startTraining())
    const state2 = classificationReducer(state1, ClassificationActions.failTraining('Error'))
    expect(state2.classifier.state).toBe('error')
  })

  it('changes k value', () => {
    const state0 = initialClassificationState

    const state1 = classificationReducer(state0, ClassificationActions.kValueChanged(5))
    expect(state1.kValue).toBe(5)
  })

  it('changes feature names', () => {
    const state0 = initialClassificationState

    const state1 = classificationReducer(state0, ClassificationActions.featureNamesChanged(['X', 'Y', 'Z']))
    expect(state1.featureNames).toEqual(['X', 'Y', 'Z'])
  })
})

describe('classification selectors', () => {
  it('canTrain returns false when dataset is too small', () => {
    const state = { ...initialClassificationState, dataset: [] }
    expect(canTrain(state)).toBe(false)
  })

  it('canTrain returns true when dataset meets minimum', () => {
    const state = {
      ...initialClassificationState,
      dataset: [
        { id: '1', features: [1.0, 2.0], label: 'A' },
        { id: '2', features: [5.0, 5.0], label: 'B' },
        { id: '3', features: [3.0, 3.0], label: 'A' },
        { id: '4', features: [7.0, 7.0], label: 'B' },
        { id: '5', features: [2.0, 2.0], label: 'A' },
      ],
    }
    expect(canTrain(state)).toBe(true)
  })

  it('getTrainingStatus returns appropriate messages', () => {
    const idleState = initialClassificationState
    const status = getTrainingStatus(idleState)
    expect(status.canTrain).toBe(false)
    expect(status.message).toBe('Need at least 5 data points to train')
  })
})