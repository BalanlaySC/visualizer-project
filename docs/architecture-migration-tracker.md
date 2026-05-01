# Architecture Migration Tracker

## Goal
Preserve current behavior while migrating to a feature-first layered architecture.

## Target Structure
- `src/app`
- `src/core`
- `src/features/search/{domain,application,infrastructure,ui}`
- `src/features/classification/{domain,application,ui}`
- `src/shared`
- `src/tests/unit/search` (or equivalent)

## Phase Tracking
- [x] Phase 0 - Baseline + Vitest + Guardrails
- [x] Phase 1 - Scaffold `app/core/shared`
- [x] Phase 2 - Extract search domain
- [x] Phase 3 - Consolidate search application layer
- [x] Phase 4 - Isolate algorithms in infrastructure
- [x] Phase 5 - Recompose search UI
- [x] Phase 6 - Bootstrap classification
- [x] Phase 7 - Enforce and cleanup

## Guardrails (Initial)
- Keep domain layer pure (no `react`, no browser globals like `window` and `document`).
- Prefer dependency direction `ui -> application -> domain`.
- Route infrastructure access through application layer only.

## Temporary Shims / Compatibility Notes
- None yet.
