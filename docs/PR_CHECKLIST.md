# Pull Request Checklist

Use this checklist when creating or reviewing pull requests to ensure architectural compliance and code quality.

## Pre-PR Checklist

### Code Quality
- [ ] `npm run typecheck` passes (no TypeScript errors)
- [ ] `npm run lint` passes (no ESLint errors or warnings)
- [ ] `npm run build` passes (production build succeeds)
- [ ] `npm test` passes (all tests green)
- [ ] No `console.log` statements left in code (use `console.warn` or `console.error` if needed)
- [ ] No unused variables or imports

### Architecture Compliance
- [ ] New code follows the layered architecture (domain → application → ui)
- [ ] Domain layer has NO React imports or browser APIs
- [ ] UI components are presentational (no business logic)
- [ ] New types are placed in the correct layer:
  - Feature-specific types → `features/*/domain/types.ts`
  - Shared types → `core/types/`
- [ ] New shared components are in `shared/components/`
- [ ] Import directions follow the allowed patterns (see ARCHITECTURE.md)

### Testing
- [ ] New domain logic has unit tests
- [ ] New application layer code has reducer/action tests
- [ ] New UI components have render/interaction tests
- [ ] Tests are placed in `src/tests/unit/<feature>/`

### Documentation
- [ ] Complex logic has inline comments explaining "why"
- [ ] New public APIs have JSDoc comments
- [ ] README or docs updated if user-facing changes

## Architecture Rules (Quick Reference)

### Domain Layer (`features/*/domain/`)
- ❌ NO `import React from 'react'`
- ❌ NO `window`, `document`, `localStorage`
- ❌ NO imports from `ui/`, `application/`, or `infrastructure/`
- ✅ OK to import from `core/types/` and `core/constants/`

### Application Layer (`features/*/application/`)
- ❌ NO direct DOM manipulation
- ❌ NO imports from UI component directories
- ✅ OK to import from domain, infrastructure, core, shared

### UI Layer (`features/*/ui/`)
- ❌ NO business logic (move to domain/application)
- ✅ SHOULD be presentational and prop-driven
- ✅ OK to use actions from application layer

### Shared Components (`shared/components/`)
- ✅ SHOULD be reusable across features
- ❌ NO feature-specific logic
- ✅ OK to import from core

## Review Questions

1. **Does this change respect layer boundaries?**
   - Domain logic is isolated from side effects
   - UI is presentational, not orchestration

2. **Are imports going in the right direction?**
   - Higher layers import from lower layers
   - No circular dependencies

3. **Is the code testable?**
   - Pure functions for business logic
   - Dependencies injected or mocked

4. **Will this scale?**
   - New features don't require modifying existing code
   - Shared abstractions are truly generic

## Post-Merge

- [ ] Verify CI passes (typecheck, lint, test, build)
- [ ] Update architecture tracker if migration-related

---

**Reference**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture guidelines.