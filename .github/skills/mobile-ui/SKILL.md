---
name: mobile-ui
description: "Build or refine mobile-first React UI for Habit Tracker 4TP, including forms, create actions, bottom sheets, navigation, loading states, and responsive interactions. Use for frontend layout or interaction work."
---

# Mobile UI

## Procedure

1. Read `doc/PROJECT_STRUCTURE.md` §§2 and 4. Inspect `AppLayout`, `BottomNav`, `index.css`, and the nearest feature component before changing layout. For story work, view the AC images and read the UI tables; take values from `working-artifacts/design-system/habit-tracker/DESIGN.md`.
2. Keep the app in the centered `max-w-app` (440px) column. Design for a 375px viewport first and review at the 390px reference; use larger breakpoints only to preserve the same narrow-column experience.
3. Use Tailwind utility classes with the DESIGN.md tokens defined in `index.css` (no palette colors or hex literals), named component exports, and the existing layout/UI ownership boundaries. Keep generic controls business-agnostic. `components/ui/` may be empty; add a reusable control there only when a real shared need exists.
4. Follow the screen flow in the user story and mockup (for example, a full-screen form route outside `AppLayout`). Only when no story or mockup defines it, use a floating action button and bottom sheet. Make touch targets at least 44×44px; provide `active:` feedback and do not depend on hover.
5. Preserve safe areas with `pt-safe`/`pb-safe` for fixed screen-edge UI, use `min-h-dvh`, and ensure fixed bottom controls do not cover content. Inputs, selects, and textareas must remain at least 16px.
6. Provide loading/skeleton, empty, and error states for data-driven UI. Keep visible date values/API input aligned with the device's local date in `YYYY-MM-DD` format.
7. Add or update a colocated RTL test for meaningful behavior and run the focused test and lint. Use `.github/skills/write-tests/SKILL.md` for test setup.

## Review Before Finishing

- Check the smallest supported viewport for clipped text, overlapping controls, covered content, and undersized targets.
- For story screens, compare with each `ACn-*.png` at 390px: layout, colors, states, and exact text.
- Confirm decorative icons are hidden from assistive technology and controls have accessible names/labels.
- Avoid inline styles except for genuinely dynamic values; do not introduce desktop-specific layouts outside the app shell.