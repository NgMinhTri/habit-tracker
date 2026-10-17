# Habit Tracker 4TP

Before changing application code, read `doc/PROJECT_STRUCTURE.md`; it is the source of truth for project layout, conventions, commands, and completion criteria. Keep changes within the owning layer or feature, and follow the applicable instructions under `.github/instructions/`.

Use the focused skills in `.github/skills/` for backend features, frontend features, EF migrations, mobile UI, tests, and verification. For an end-to-end feature, follow `fullstack-feature` to coordinate them. Do not duplicate or contradict the project structure guide; update that guide only when the user asks to change project conventions.

## Requirements sources

When a task references a user story (`US-0x`) or product behavior, the requirement package under `working-artifacts/` defines **what** to build; `doc/PROJECT_STRUCTURE.md` defines **how**.

- Start with `working-artifacts/DEVELOPER-AGENT-GUIDE.md`: it gives the authority order (Product Brief → user story → AC images/mockup → `DESIGN.md` → functional decomposition), the per-AC workflow, easy-to-miss rules, and open-question defaults.
- Read the story in `working-artifacts/user-stories/habit-tracker/`. Treat each AC's UI table (fields, defaults, sizes, exact error messages) as a requirement and use message text verbatim.
- View the matching image `working-artifacts/mockup-wireframe/habit-tracker/US-0x-*/ACn-*.png` before building that AC.
- Take every color, font, radius, shadow, and size from `working-artifacts/design-system/habit-tracker/DESIGN.md` through the tokens in `src/frontend/src/index.css`.
- When a story's UI table or mockup conflicts with a generic UI rule (layout shell, create-flow pattern), the story wins for that screen.
- Record developer decisions the story leaves open in the Decisions log in `doc/PROJECT_STRUCTURE.md` §9.
- Never edit files under `working-artifacts/` unless asked.