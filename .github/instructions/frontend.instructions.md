---
description: "Use when creating or modifying React, TypeScript, or styling code in the Habit Tracker 4TP frontend."
applyTo: "src/frontend/**"
---

# Frontend Instructions

- Read `doc/PROJECT_STRUCTURE.md` before changing frontend code. Follow the feature folder boundaries and mobile-first shell conventions described there.
- Keep route screens in `pages/`, feature behavior in `features/<feature>/`, generic business-agnostic controls in `components/ui/`, and shared layout in `components/layout/`.
- Use named exports, import features from outside only through their `index.ts`, and route all HTTP calls through `apiClient` and feature hooks.
- Keep server state in TanStack Query; do not mirror it into component state. Use Tailwind utilities and preserve accessible, touch-friendly states.
- Style only with the DESIGN.md tokens defined in `src/index.css` (`@theme`); no Tailwind palette colors or hex literals in components.
- For repeatable workflows, use `.github/skills/frontend-feature/`, `.github/skills/mobile-ui/`, `.github/skills/write-tests/`, and `.github/skills/verify-done/` as applicable.