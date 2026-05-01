# Architecture Guide

This document describes the layered, feature-first architecture of the Algorithm Visualizer project.

## Overview

The codebase follows a **feature-first, layered architecture** that separates concerns into distinct layers with clear import directions. This structure enables:

- **Scalability**: New features can be added without modifying existing code
- **Testability**: Business logic is isolated from UI and side effects
- **Maintainability**: Clear boundaries make code easier to understand and modify

## Directory Structure

```
src/
├── app/                    # App shell, routing, providers
│   └── App.tsx            # Root component (composition shell)
├── core/                  # Shared types, constants, utilities
│   ├── constants/         # Application-wide constants
│   └── types/             # Shared type definitions
├── features/              # Feature modules (domain-driven)
│   ├── search/            # Search & Pathfinding feature
│   │   ├── domain/        # Pure business logic, types, rules
│   │   ├── application/   # State management, actions, reducers
│   │   ├── infrastructure/# External services, algorithms
│   │   └── ui/            # Feature-specific UI components
│   └── classification/    # Classification feature (same pattern)
├── shared/                # Cross-cutting shared components
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Layout components (AppShell, etc.)
│   │   ├── theme/         # Theme-related components
│   │   └── ui/            # Generic UI components (buttons, tabs, etc.)
│   └── hooks/             # Shared React hooks
└── tests/                 # Unit and integration tests
    └── unit/
        ├── search/
        └── classification/
```

## Layer Responsibilities

### 1. Domain Layer (`features/*/domain/`)

**Purpose**: Pure business logic with zero side effects.

**Contains**:
- Type definitions for the feature's domain model
- Constants and configuration
- Pure functions for business rules
- Selectors for computed derivations

**Rules**:
- ❌ NO React imports
- ❌ NO browser APIs (window, document, localStorage)
- ❌ NO imports from application, infrastructure, or ui layers
- ✅ MAY import from `core/types` and `core/constants`
- ✅ MAY import sibling domain files

**Example**:
```typescript
// features/search/domain/types.ts
export type GridCell = {
  row: number
  col: number
  type: CellType
}

// features/search/domain/constants.ts
export const GRID_ROWS = 12
```

### 2. Application Layer (`features/*/application/`)

**Purpose**: State management and orchestration.

**Contains**:
- Action types and action creators
- Reducers for state transitions
- Controllers/hooks that coordinate domain + infrastructure
- State selectors

**Rules**:
- ❌ NO direct DOM manipulation
- ❌ NO imports from UI component directories
- ✅ MAY import from domain layer
- ✅ MAY import from infrastructure layer
- ✅ MAY import from core and shared

**Example**:
```typescript
// features/search/application/searchActions.ts
export const SearchActions = {
  paintCell: (row: number, col: number) => ({
    type: 'grid/painted',
    row,
    col,
  }),
}
```

### 3. Infrastructure Layer (`features/*/infrastructure/`)

**Purpose**: External services and algorithms.

**Contains**:
- Algorithm implementations
- API clients
- Third-party service adapters

**Rules**:
- ✅ MAY use browser APIs and external libraries
- ❌ Should NOT be imported directly by UI layer
- ✅ Output should conform to domain contracts

**Example**:
```typescript
// features/search/infrastructure/algorithms/bfs.ts
export function breadthFirstSearch(grid: Grid): PathResult {
  // Algorithm implementation
}
```

### 4. UI Layer (`features/*/ui/`)

**Purpose**: Presentation and user interaction.

**Contains**:
- Page components (composition shells)
- Feature-specific presentational components
- Event handlers that dispatch actions

**Rules**:
- ✅ SHOULD be primarily presentational
- ✅ SHOULD receive data via props
- ✅ SHOULD use callbacks for user actions
- ❌ SHOULD NOT contain business logic
- ✅ MAY import from application layer (for actions/state)
- ✅ MAY import from shared components

**Example**:
```typescript
// features/search/ui/SearchPage.tsx
export function SearchPage({ theme }: SearchPageProps) {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  
  return (
    <Grid
      cells={state.grid}
      onCellClick={(row, col) => dispatch(SearchActions.paintCell(row, col))}
    />
  )
}
```

### 5. Core Layer (`core/`)

**Purpose**: Application-wide shared types and constants.

**Contains**:
- Common type definitions (Theme, Coordinate, etc.)
- Theme tokens and constants
- Utility functions

**Rules**:
- ✅ SHOULD be importable by any layer
- ❌ SHOULD NOT import from features
- ❌ SHOULD remain minimal and stable

### 6. Shared Layer (`shared/`)

**Purpose**: Cross-cutting components and hooks.

**Contains**:
- Layout components (AppShell, etc.)
- Theme components
- Generic UI components
- Shared hooks

**Rules**:
- ✅ SHOULD be reusable across features
- ✅ MAY import from core
- ❌ SHOULD NOT contain feature-specific logic

## Import Direction

```
┌─────────────────────────────────────────────────────────┐
│                         UI                               │
│  (features/*/ui/, shared/components/)                   │
├─────────────────────────────────────────────────────────┤
│                    APPLICATION                           │
│  (features/*/application/)                              │
├──────────────────┬──────────────────────────────────────┤
│     DOMAIN       │           INFRASTRUCTURE             │
│  (features/*/    │  (features/*/infrastructure/)        │
│   domain/)       │                                      │
├──────────────────┴──────────────────────────────────────┤
│                       CORE                               │
│  (core/types/, core/constants/)                         │
└─────────────────────────────────────────────────────────┘
```

**Allowed import directions**:
- UI → Application, Shared, Core
- Application → Domain, Infrastructure, Core, Shared
- Domain → Core (and sibling domain files only)
- Infrastructure → Core, Domain (for types)
- Core → (nothing from features)
- Shared → Core

## Where to Add New Code

### Adding a New Feature

1. Create feature directory: `src/features/myfeature/`
2. Create layer directories:
   - `domain/` - Types, constants, pure logic
   - `application/` - Actions, reducer, state
   - `ui/` - Page and components
   - `infrastructure/` - (if needed) External services
3. Follow the pattern from existing features (search, classification)

### Adding a Shared Component

1. Place in `src/shared/components/`
2. Categorize:
   - Layout components → `layout/`
   - Theme components → `theme/`
   - Generic UI → `ui/`
3. Export from `src/shared/components/index.ts`

### Adding a New Type

1. Feature-specific types → `features/*/domain/types.ts`
2. Shared types → `core/types/`
3. Use TypeScript interfaces for contracts

## Testing Strategy

- **Domain tests**: Test pure functions and type contracts
- **Application tests**: Test reducer transitions and action creators
- **UI tests**: Test rendering and user interactions
- **Integration tests**: Test feature workflows

Tests live in `src/tests/unit/<feature>/` mirroring the feature structure.

## Enforcement

Architecture rules are enforced via ESLint (see `eslint.config.js`):

- Domain layer: Error on React/browser imports
- Application layer: Warn on UI component imports
- Infrastructure layer: Warn on UI imports

Run `npm run lint` to check compliance.