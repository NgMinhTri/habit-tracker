---
name: frontend-feature
description: "Add or extend a React frontend feature, typed API integration, TanStack Query hook, feature component, route, or page in Habit Tracker 4TP. Use when implementing frontend behavior that belongs to a feature."
---

# Frontend Feature

## Procedure

1. Read `doc/PROJECT_STRUCTURE.md`, especially §§4 and 6. Inspect `features/health/` for the current API, hook, component, and public-export pattern.
2. Agree on the backend DTO and endpoint contract before encoding frontend types. Keep HTTP functions in `features/<feature>/api/` and use `apiClient`; never call `fetch` directly.
3. Add typed API functions, then one TanStack Query hook per file. Define query keys next to the hook and invalidate the feature keys after successful mutations.
4. Add feature-specific components and colocated tests. Components consume feature hooks, not `apiClient`; expose supported feature APIs from `features/<feature>/index.ts`.
5. For a screen, add a route-level component under `pages/` and register it in `app/router.ts`. Tabbed screens are children of `AppLayout`; full-screen screens without bottom nav (forms, pickers) are top-level routes outside it that reuse the same `max-w-app` column. Add a `BottomNav` item only when it is a top-level destination.
6. For visual or interaction work, follow `.github/skills/mobile-ui/SKILL.md`. Include loading, empty, and error states where data is fetched. Show API field errors from `ApiError.problem.errors[field][0]` in the error block the story specifies.
7. Follow `.github/skills/write-tests/SKILL.md`, run focused tests and lint, then use `.github/skills/verify-done/SKILL.md` for completion checks.

## Guardrails

- Use named exports and import a feature from outside its folder only through its `index.ts`.
- Do not copy server state into `useState` or put feature logic in route pages or generic UI components.
- Send API dates as the device's local `YYYY-MM-DD` date. Use the user story's labels and messages verbatim and DESIGN.md tokens from `index.css` for all styling.