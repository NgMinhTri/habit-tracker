# Product Brief

## Overview
A personal habit tracker web app with a mobile-style interface for creating simple habits, checking them off by date, and reviewing consistency over time. The MVP centers on a daily checklist and a monthly progress view. **Assumption:** persist data on the user's device.

## Design direction
Use the provided HTML mockup as the primary design reference and follow its visual patterns as closely as practical. Keep the interface clean, cute, and easy to use, with a mobile-first layout, soft pastel colors, rounded habit cards and controls, emoji-led habit items, clear completion and progress states, and bottom navigation between Today and Progress. Make controls comfortable to tap and keep screens uncluttered.

## Target users
People who want a lightweight way to build routines, track daily completion, and review their consistency without social or complex planning features.

## Core features (MVP — max 3)
1. **Today checklist:** View habits scheduled for a selected date, mark them complete or undo completion, and see daily completion progress. Navigate dates by week.
2. **Create habits:** Set a name, icon, and color. A habit can happen once on a chosen date or repeat daily, with an optional end date.
3. **Progress:** View perfect days on a monthly calendar and see perfect-day count, longest consecutive perfect-day streak, number of habits completed at least once, and all habits ranked by completed days.

## Business rules
- **Habit name:** Required, trimmed before saving, maximum 40 characters, and unique across habits without regard to capitalization. Show a validation error when any rule fails.
- **Habit schedule:** A one-time habit is scheduled only on its start date. A repeating habit is scheduled every day from its start date through its optional end date, inclusive. Without an end date, it continues indefinitely.
- **Dates:** Past dates are allowed for habit start dates, and users can navigate to dates in the Today view. The end date, when enabled, must be on or after the start date. Frequency is daily only for repeating habits.
- **Completion:** Completion is tracked per habit per calendar date. Tapping a scheduled habit toggles it between complete and incomplete. Completing a habit on one date does not complete it on another date.
- **Perfect day:** A date is perfect only if at least one habit is scheduled for it and every habit scheduled that date is complete. A date with no scheduled habits is not perfect. A perfect day is shown with a star in the week strip and Progress calendar.
- **Daily progress:** Show completed scheduled habits out of the total scheduled for the selected date. The progress bar is full when all scheduled habits are complete; it uses the perfect-day state only when at least one habit is scheduled.
- **Perfect Days stat:** Count all dates on which the perfect-day rule is satisfied.
- **Best Streak stat:** Find the longest run of consecutive calendar dates that are perfect days. Any non-perfect date breaks a streak; dates with no scheduled habits do not extend it.
- **Total Habits Done stat:** Count distinct habits that have at least one completed date, not the total number of check-offs.
- **Most repeated habits:** List every habit ever added, including habits with no completions. Rank by number of distinct dates completed across all time, from most to least.
- **Progress calendar:** Month navigation changes the displayed month. Mark each perfect day in that month with a star and outline today's date.

## Out of scope (explicitly NOT building today)
- Any functionality not explicitly listed in the three MVP core features is out of scope. Examples include:
- Authentication, authorization, user profiles, cloud sync, and multi-device support
- Editing or deleting existing habits, or reordering habits by dragging
- Reminders, notifications, widgets, and calendar integrations
- Weekly, custom, or interval-based schedules beyond one-time and daily habits
- Social features such as sharing, challenges, teams, and leaderboards
- Additional analytics, reports, data export, and habit-history views beyond the Progress screen described above
- Discover, profile, onboarding, or other additional app sections
- Custom themes or user-defined icons and colors beyond the available icon set and the color options in the mockup
