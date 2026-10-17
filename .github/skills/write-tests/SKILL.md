---
name: write-tests
description: "Write or update unit and component tests for Habit Tracker 4TP using xUnit, NSubstitute, Vitest, or React Testing Library. Use when adding coverage or changing behavior covered by tests."
---

# Write Tests

## Procedure

1. Read `doc/PROJECT_STRUCTURE.md` §5 and inspect the nearest existing test. Keep the test scoped to the changed behavior and mirror the source folder structure on the backend.
2. For backend tests, use xUnit and built-in `Assert`; substitute interfaces with `Substitute.For<T>()`. Never use a real database in unit tests.
3. Name backend tests `Method_State_ExpectedResult`. Separate Arrange, Act, and Assert with blank lines. Cover relevant success, boundary, and failure behavior without duplicating implementation details.
4. For frontend tests, place `*.test.tsx` next to the component under test. Import `describe`, `it`, `expect`, and `vi` explicitly from `vitest`.
5. Render through `renderWithProviders()` from `src/test/utils.tsx`. Stub network requests with `vi.stubGlobal('fetch', ...)` and `mockFetchResponse()`; query by accessible role, label, or text rather than test IDs or CSS classes.
6. When a test covers a user-story AC, tag it with the AC ID: backend `[Trait("AC", "US01-AC3")]`; frontend test name starts with `US01-AC3 ...`. Assert UI-table messages by exact text and, for frontend, that they appear in the specified place and clear as the story describes.
7. Run the narrow test first. Fix failures caused by the change; report unrelated pre-existing failures separately. Use `.github/skills/verify-done/SKILL.md` when full completion gates are required.

## Guardrails

- Test observable behavior and public contracts, not private implementation details.
- Do not add test dependencies or test-only production abstractions without a demonstrated need.
- Keep test names and assertions consistent with nearby project conventions when they differ from generic examples.