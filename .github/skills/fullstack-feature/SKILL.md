---
name: fullstack-feature
description: "Coordinate an end-to-end Habit Tracker 4TP feature spanning the .NET API, SQLite persistence, React frontend, and tests. Use when a requested feature changes both backend and frontend behavior."
---

# Full-Stack Feature

Use this workflow only when the requested feature crosses the backend/frontend boundary. For a single-layer change, use its focused skill directly.

## Procedure

0. **Story intake** (when the feature comes from a user story): read `working-artifacts/DEVELOPER-AGENT-GUIDE.md` §§2, 5, 6, the story file, and view every `ACn-*.png` in its mockup folder. Build an AC matrix (AC → behavior → layer/files → test or manual check), copy every UI-table error message verbatim, list the story's open questions with the guide's default, and add settled choices to the Decisions log (`doc/PROJECT_STRUCTURE.md` §9). Check that log for decisions earlier stories already made.
1. Read `doc/PROJECT_STRUCTURE.md`. Clarify the user-visible behavior, domain rules, API contract, and any unresolved choices before implementation.
2. Define the API request/response shape and ownership of each change following `doc/PROJECT_STRUCTURE.md` §3.6 (validation-error shape and field keys, `DateOnly` dates, stored keys for fixed option sets). Keep the backend contract authoritative for DTO fields and date semantics.
3. Load and follow `.github/skills/backend-feature/SKILL.md` to implement the domain, application, persistence, and API slices. If schema changes, also follow `.github/skills/ef-migration/SKILL.md`.
4. Load and follow `.github/skills/frontend-feature/SKILL.md` to implement typed API functions, query hooks, feature components, and route wiring. Follow `.github/skills/mobile-ui/SKILL.md` for user-facing interactions and layout.
5. Load and follow `.github/skills/write-tests/SKILL.md` to cover backend behavior, frontend behavior, and the API contract at appropriate boundaries.
6. Check end-to-end consistency: route and HTTP method, DTO fields, validation-error field keys and messages (backend message = story text = what the UI shows), query invalidation, local-date handling, and loading/empty/error UI.
7. Load and follow `.github/skills/verify-done/SKILL.md`. Report the implemented slices, the AC matrix with status, checks run, and any blockers or skipped gates.

## Guardrails

- Implement and validate one layer at a time while keeping the agreed contract stable.
- Do not duplicate the procedures from the focused skills here; resolve conflicts in favor of `doc/PROJECT_STRUCTURE.md`.
- Keep unrelated refactors and product-scope additions out of the feature.