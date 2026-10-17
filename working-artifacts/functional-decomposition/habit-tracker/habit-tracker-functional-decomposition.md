# Habit Tracker MVP — Functional Decomposition

## Purpose and sources

Decompose the Habit Tracker MVP into business capabilities, user-facing functions, and deliverable feature slices. This is a product-level decomposition, not a technical architecture or implementation task list.

Sources:
- [Product Brief](../../product-brief/habit-tracker/Product%20Brief.md) — authoritative source for MVP scope and business rules.
- [Interactive HTML mockup](../../mockup-wireframe/habit-tracker/Habit%20Tracker%20MVP%20-%20All%20Screens%20-%20v1.html) — source for screen behavior, defaults, and illustrated states.
- `.agents/skills/ba-functional-decomposition/SKILL.md` — decomposition method.

Where the brief and mockup differ, the latest brief takes precedence for product behavior. The mockup's reviewer controls and sample data are not product features.

## Product boundary

**Business outcome:** Help an individual establish simple habits, record completion by date, and review consistency over time.

**Primary actor:** A person using their own habit tracker. No administrator or additional user role is in scope.

**Channel and design constraints:** Mobile-style web app; follow the mockup's clean, cute visual language, pastel habit colors, emoji-led cards, clear completion/progress states, and Today/Progress navigation. Treat visual patterns as design guidance, not separate business capabilities.

**In scope:** Create one-time or daily habits; record and undo dated completions; browse dates and monthly progress; calculate the specified records and rank all habits by completed days; persist the user's data on their device (assumption in the brief).

**Out of scope:** Authentication/authorization, profiles and cloud or multi-device sync; editing/deleting existing habits; drag-to-reprioritize; reminders, notifications, widgets, and integrations; non-daily recurrence; social features; analytics beyond the specified Progress view; extra app sections; custom themes or user-defined icon/color sets.

## Context view

| Context element | Decomposition |
| --- | --- |
| Actor | Individual tracker user |
| Inputs | Habit name, icon and color selection, schedule dates, completion toggles, selected day/month navigation |
| Outputs | Saved habit definitions and completion history; scheduled-habit checklist and daily progress; perfect-day calendar markers and summary statistics; validation and empty/error feedback |
| External systems | None specified. The brief assumes on-device persistence; storage technology and lifecycle are undecided. |

## Functional tree

```text
Habit Tracker MVP
  1. Define habit routines
     1.1 Create a named habit
     1.2 Choose icon and color
     1.3 Set one-time or daily schedule and dates
     1.4 Validate, save, or discard the new habit
  2. Track daily completion
     2.1 Navigate to a selected date
     2.2 Resolve and display habits scheduled for that date
     2.3 Mark a scheduled habit done or undo completion
     2.4 Calculate daily completion and perfect-day status
  3. Review progress
     3.1 Browse monthly perfect-day calendar
     3.2 Calculate all-time habit records
     3.3 List all habits ranked by distinct completed days
  4. Preserve tracker data (cross-cutting; brief assumption)
     4.1 Persist habit definitions and completion dates on the user's device
```

## Function decomposition

| ID | Function and outcome | Actor / trigger | Inputs and outputs | Rules and traceability | Priority |
| --- | --- | --- | --- | --- | --- |
| HAB-01 | Create a habit definition | User chooses Add a habit | Inputs: name, icon, color, schedule. Output: new habit with no completions. | Name is required, trimmed, at most 40 characters, and unique case-insensitively. Brief; mockup annotations 5, 8, 14. | MVP |
| HAB-02 | Choose habit identity | User opens the icon selection screen or color choices | Input: icon and color selection. Output: selected icon and one color, shown on the habit's card. | The icon list is integrated from another source (source and format are the developer's decision); the mockup shows sample emoji with no search, plus seven color swatches; defaults are sun and rose. No custom icon/color creation. Annotations 7, 9, 16. | MVP |
| HAB-03 | Define habit schedule | User configures the new habit | Inputs: repeat on/off, start date, optional end date. Output: one-time or daily schedule. | Repeat off means only the start date. Repeat on means every date from start through optional end, inclusive. End must be on/after start. Frequency is daily only. Past starts are allowed. Mockup defaults start to today and optional end to the next day. Annotations 10–13, 21. | MVP |
| HAB-04 | Validate, save, or discard a new habit | User saves or closes the form | Input: completed form. Output: saved habit and return to Today, or inline validation; close discards unsaved input. | Reject blank, overlength, or duplicate names; reject end before start. Mockup returns to Today after save and shows confirmation. Annotations 8, 14, 21. | MVP |
| TRK-01 | Select the date to review | User taps a day or week arrow | Input: date selection or previous/next-week action. Output: selected date and corresponding checklist. | Week begins Monday; arrows move the selected date by seven days; any date is selectable in the mockup. A non-today selection offers Back to today. Brief; annotation 2. | MVP |
| TRK-02 | Resolve and display scheduled habits | User opens Today or changes date | Input: selected date and saved schedules. Output: date heading and scheduled-habit list, or applicable empty/loading/error state. | One-time and daily schedule rules determine inclusion. Empty states distinguish no habits at all from no habits scheduled that date. Mockup illustrates loading and load-error states; retry behavior for real persistence is undecided. Annotations 1, 2. | MVP |
| TRK-03 | Record or undo completion | User taps a scheduled habit card | Input: habit and selected date. Output: completion state for that habit/date and updated checklist. | Completion is independent per habit per calendar date; tapping toggles done/undone. A done card has a check and strike-through treatment. Annotation 4. | MVP |
| TRK-04 | Calculate daily progress and perfect-day status | Checklist is displayed or a completion changes | Input: scheduled habits and their completion states. Output: completed/total count, progress bar, and perfect-day indicator. | Perfect day requires at least one scheduled habit and all scheduled habits complete. No scheduled habits is not perfect. Progress is full only when all scheduled habits are complete. Annotations 3, 18. | MVP |
| PRO-01 | Browse the monthly calendar | User opens Progress or changes month | Input: previous/next month action and completion history. Output: month grid, stars on perfect days, outline on today. | Calendar month changes independently of the all-time records. Annotation 17. | MVP |
| PRO-02 | Calculate habit records | User opens Progress | Input: completion history and schedules. Output: Perfect Days, Best Streak, and Total Habits Done. | Perfect Days counts qualifying dates all-time. Best Streak is the longest consecutive run of perfect dates; any non-perfect date, including one with no scheduled habits, breaks the run. Total Habits Done counts distinct habits with at least one completion. Brief; annotation 19. | MVP |
| PRO-03 | Rank all habits by completed days | User opens Progress | Input: all habit definitions and completion history. Output: every added habit with its distinct completed-day count, ordered highest to lowest. | Include habits with zero completed days. Count distinct completion dates per habit across all time. This follows the brief and supersedes the mockup's top-three-only list. Brief; mockup annotation 22 is outdated. | MVP |
| DATA-01 | Preserve tracker data locally | Habit is saved or completion changes | Input: habit definitions and completion dates. Output: data available on a later visit on the same device. | Local persistence is an assumption in the brief; exact browser storage, retention, and recovery behavior are not specified. | MVP assumption |

## User journey / MVP story map

| Journey step | User activity | MVP capability | Result |
| --- | --- | --- | --- |
| 1. Set up | Create a habit, choose its identity, and set its date pattern | Define habit routines | Habit appears on dates matching its schedule |
| 2. Check the day | Navigate to a date and review scheduled habits | Track daily completion | User sees the correct list and daily progress |
| 3. Record progress | Mark habits done or undo a completion | Track daily completion | Completion history and perfect-day status update |
| 4. Reflect | Browse a month and review records and habit ranking | Review progress | User sees consistency over time and all habits ordered by completed days |

## Data and derived information

- **Habit definition:** stable identifier; trimmed unique name; selected icon; selected palette color; one-time/daily repeat setting; start date; optional inclusive end date.
- **Completion:** habit identifier and calendar date for each completed habit-day. Unchecking removes that date's completion for the habit.
- **Daily view:** scheduled habit set, completed count, total scheduled count, completion percentage, and perfect-day boolean.
- **Progress records:** perfect-date set, longest consecutive perfect-date run, distinct habits with any completion, and per-habit distinct completion-day count.
- **Persistence boundary:** on-device, single-user behavior is assumed; no account, synchronization, or external integration is included.

## Source discrepancies and open decisions

1. **Habit ranking conflict:** The brief says show every habit, including zero-completion habits, ordered by completed days. The HTML mockup shows only the top three with at least one completion and alphabetically breaks ties. Implement the brief's all-habits rule; the tie order among equal counts remains unspecified.
2. **Local persistence:** The brief assumes on-device persistence, while the mockup stores data only in memory for its demo. Confirm expected behavior after refresh, browser closure, or clearing site data; no storage technology is prescribed here.
3. **Loading/error behavior:** The mockup includes loading and load-error states, but uses a demo-state control for retry. Confirm whether the production MVP needs explicit retry/error handling for local persistence.
4. **Date semantics:** Confirm the product's timezone/calendar-day boundary for completion history. The sources use date-only values but do not define timezone behavior.

## Design notes (not functional branches)

Retain the mockup's mobile-style web layout, Today/Progress bottom navigation, week strip, rounded habit cards, emoji and pastel-color identity, clear progress indicators, inline date controls, and monthly star calendar. The mockup's outer reviewer toolbar, scenario switches, and annotation legend are prototype aids, not user-facing MVP requirements.
