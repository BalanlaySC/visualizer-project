# AIViz Studio

Interactive AI algorithm visualization platform built with React + TypeScript. Visualize search, classification, clustering, and neural networks step-by-step.

## Overview
AIViz Studio is an interactive web-based platform for visualizing and understanding fundamental AI algorithms. Built with React, TypeScript, and Tailwind CSS, it provides step-by-step visualizations of search, classification, clustering, and neural network algorithms.

## Features
- **Search & Pathfinding**: Visualize BFS, DFS, Dijkstra, A* algorithms on interactive grids
- **Classification**: Explore KNN, Decision Trees, Naive Bayes with data point visualization
- **Clustering**: (Coming soon) K-Means, Hierarchical clustering visualizations
- **Neural Networks**: (Coming soon) Perceptrons, multi-layer networks
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Vitest** for testing
- **ESLint** for code quality

## Project Structure
- `src/app/` - Application shell and routing
- `src/core/` - Shared types and constants
- `src/features/` - Feature modules (search, classification, etc.)
- `src/shared/` - Reusable components and hooks
- `docs/` - Architecture documentation and guides

## Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint
```

## Architecture
This project follows a feature-first, layered architecture. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed guidelines.

## Contributing
1. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
2. Follow the [PR Checklist](docs/PR_CHECKLIST.md)
3. Ensure all checks pass: typecheck, lint, test, build

## License
MIT