export const ALGORITHM_DOMAINS = {
  Search: 'Search & Pathfinding',
  Classification: 'Classification',
  Clustering: 'Clustering',
} as const

export type AlgorithmDomain = (typeof ALGORITHM_DOMAINS)[keyof typeof ALGORITHM_DOMAINS]

export const SEARCH_ALGORITHMS = [
  'Breadth-First Search',
  'Depth-First Search',
  'Dijkstra',
  'A* Search',
]

export const CLASSIFICATION_ALGORITHMS = [
  'K-Nearest Neighbors (KNN)',
  'Decision Tree',
  'Naive Bayes',
]
