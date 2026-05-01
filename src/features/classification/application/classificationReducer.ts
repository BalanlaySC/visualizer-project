import type { ClassificationAppAction } from './classificationActions'
import type { ClassificationAppState } from './classificationState'
import { initialClassificationState } from './classificationState'
import {
  MAX_DATA_POINTS,
  MIN_DATA_POINTS_FOR_TRAINING,
} from '../domain'

export function classificationReducer(
  state: ClassificationAppState = initialClassificationState,
  action: ClassificationAppAction
): ClassificationAppState {
  switch (action.type) {
    case 'algorithm/changed':
      return {
        ...state,
        algorithm: action.algorithm,
        classifier: {
          ...state.classifier,
          algorithm: action.algorithm,
          state: 'idle',
        },
      }

    case 'mode/changed':
      return {
        ...state,
        mode: action.mode,
      }

    case 'datapoint/added':
      if (state.dataset.length >= MAX_DATA_POINTS) {
        return state
      }
      if (state.dataset.some((p) => p.id === action.point.id)) {
        return state
      }
      return {
        ...state,
        dataset: [...state.dataset, action.point],
      }

    case 'datapoint/removed':
      return {
        ...state,
        dataset: state.dataset.filter((p) => p.id !== action.pointId),
        predictions: state.predictions.filter(
          (p) => p.dataPointId !== action.pointId
        ),
        selectedDataPointId:
          state.selectedDataPointId === action.pointId
            ? null
            : state.selectedDataPointId,
      }

    case 'datapoint/updated':
      return {
        ...state,
        dataset: state.dataset.map((p) =>
          p.id === action.pointId
            ? { ...p, features: action.features, label: action.label }
            : p
        ),
      }

    case 'dataset/cleared':
      return {
        ...state,
        dataset: [],
        predictions: [],
        classifier: {
          ...state.classifier,
          state: 'idle',
          accuracy: undefined,
          lastTrainedAt: undefined,
        },
      }

    case 'training/started':
      return {
        ...state,
        classifier: {
          ...state.classifier,
          state: 'training',
        },
      }

    case 'training/completed':
      return {
        ...state,
        classifier: {
          ...state.classifier,
          state: 'trained',
          accuracy: action.accuracy,
          lastTrainedAt: Date.now(),
        },
      }

    case 'training/failed':
      return {
        ...state,
        classifier: {
          ...state.classifier,
          state: 'error',
        },
      }

    case 'prediction/made': {
      const existingPredictionIndex = state.predictions.findIndex(
        (p) => p.dataPointId === action.prediction.dataPointId
      )
      if (existingPredictionIndex >= 0) {
        const newPredictions = [...state.predictions]
        newPredictions[existingPredictionIndex] = action.prediction
        return {
          ...state,
          predictions: newPredictions,
        }
      }
      return {
        ...state,
        predictions: [...state.predictions, action.prediction],
      }
    }

    case 'kValue/changed':
      return {
        ...state,
        kValue: Math.max(1, Math.min(action.k, MAX_DATA_POINTS)),
      }

    case 'featureNames/changed':
      return {
        ...state,
        featureNames: action.names,
      }

    default:
      return state
  }
}

// Selectors
export function canTrain(state: ClassificationAppState): boolean {
  return state.dataset.length >= MIN_DATA_POINTS_FOR_TRAINING
}

export function getTrainingStatus(
  state: ClassificationAppState
): { canTrain: boolean; message: string } {
  if (state.classifier.state === 'training') {
    return { canTrain: false, message: 'Training in progress...' }
  }
  if (state.classifier.state === 'trained') {
    return {
      canTrain: false,
      message: `Trained with ${state.classifier.accuracy ? (state.classifier.accuracy * 100).toFixed(1) : 0}% accuracy`,
    }
  }
  if (!canTrain(state)) {
    return {
      canTrain: false,
      message: `Need at least ${MIN_DATA_POINTS_FOR_TRAINING} data points to train`,
    }
  }
  return { canTrain: true, message: 'Ready to train' }
}