# Test Cases: Track Daily Habit Completion

## Traceability Summary

| Item | Value |
| --- | --- |
| User story or requirement | US-03 — Track Daily Habit Completion |
| Feature | Toggle habit completion per date, daily progress, perfect day, on-device persistence |
| Scope | Functional |
| Status | Draft |
| Revision | Revised 2026-10-17 to address `working-artifacts/test-case-reviews/Report-Review-Test-Case-TC-US-03-Track-Daily-Completion.md` |
| Source | `working-artifacts/user-stories/habit-tracker/US-03-track-daily-completion.md` |
| Output location | `working-artifacts/test-cases/` |

## Assumptions and Open Questions

- **A1 (test clock):** Dates are relative to "today" (T). Example values assume T = Sat 2026-10-17. Automation should fix the browser clock.
- **A2 (test data):** Habits are created through New Habit (US-01) or a test fixture, starting from cleared app storage.
- **A3:** Rapid repeated taps are expected to toggle once per tap and leave a consistent card/progress state. This is inferred from the toggle behavior, not stated (TC_COMPLETION_018).
- **Q1 (from story):** Which time zone and calendar-day boundary assigns a completion to a date? Midnight-boundary and time-zone cases are not covered until confirmed.
- **Q2 (from story):** What should the user see if a completion cannot be saved on the device? No case until defined.
- **Q3:** Should the "Perfect day! ⭐" toast appear only on the transition to perfect, or also when a perfect day is viewed again? Cases verify it only on the transition.
- **Q4:** Is rapid repeated tapping debounced? Not stated. TC_COMPLETION_018 assumes every tap toggles and is `No` for automation until confirmed.
- **Q5:** When today is a perfect day, does the gold star circle keep or replace today's accent ring? Not stated in AC4 or US-02 AC1; TC_COMPLETION_006 and 010 do not assert the ring.
- **A4 (persistence):** Close and reopen is simulated by closing the page and opening a new page in the same browser context so on-device storage is kept.
- **A5 (data seeding):** Habits and completions are seeded through a fixture in the app's on-device storage (format to be confirmed with the developer) or through the US-01 and US-03 screens. The "Do it once" date cannot be changed in New Habit (it is always Today), so one-time habits on any date other than T are seeded by fixture only.
- Out of scope per story: editing/deleting habits, reminders/notifications, social sharing.

## Test Cases

| Test Case ID | Title | Test Steps | Expected Result | Requirement | Testing Technique | Priority | Preconditions | Test Data | Automation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC_COMPLETION_001 | Verify tapping a not-completed card marks the habit completed | 1. Open the app on T.<br>2. Tap the "Meditate" card. | "Meditate" card fades to about 62% opacity; the name is struck through in muted gray; the completion circle turns green (#5FCB71) with a white check. | AC1 | State Transition Testing | Critical | Daily habits "Meditate", "Stretch", "Read" scheduled on T; none completed. | Habit: Meditate | Yes |
| TC_COMPLETION_002 | Verify completing a habit increments the progress count and bar | 1. Open the app on T.<br>2. Tap the "Stretch" card. | Progress pill changes from "1 of 3 done" to "2 of 3 done"; progress bar fill changes from about 33% to about 67% width. | AC1; Rules (daily progress) | Equivalence Partitioning | High | Daily habits "Meditate", "Stretch", "Read" on T; "Meditate" completed on T. | Habit: Stretch | Yes |
| TC_COMPLETION_003 | Verify the whole card is the tap target | 1. Tap the card's icon area.<br>2. Tap the card's name.<br>3. Tap the completion circle. | Each tap toggles the completion state: completed after step 1, not completed after step 2, completed after step 3. | AC1 | Equivalence Partitioning | Medium | Daily habit "Meditate" on T, not completed. | Tap targets: icon, name, circle | Yes |
| TC_COMPLETION_004 | Verify tapping a completed card undoes the completion | 1. Open the app on T.<br>2. Tap the completed "Meditate" card. | Card returns to full opacity with a normal name; completion circle is empty with a gray (#B7BBC9) outline. | AC2 | State Transition Testing | Critical | Daily habits "Meditate", "Stretch" on T; "Meditate" completed on T. | Habit: Meditate | Yes |
| TC_COMPLETION_005 | Verify undoing a completion decrements the progress count and bar | 1. Open the app on T.<br>2. Tap the completed "Meditate" card. | Pill changes from "1 of 2 done" to "0 of 2 done"; bar fill becomes empty. | AC2 | Equivalence Partitioning | High | Daily habits "Meditate", "Stretch" on T; "Meditate" completed on T. | Habit: Meditate | Yes |
| TC_COMPLETION_006 | Verify undoing a completion on a perfect day removes the perfect-day state | 1. Open the app on T.<br>2. Tap the completed "Stretch" card. | Pill changes from "2 of 2 done" to "1 of 2 done"; gold full bar returns to the accent gradient at about half width; day 17 in the week strip changes from the gold star to a circle showing "17". | AC2; Rules (perfect day) | State Transition Testing | High | Daily habits "Meditate", "Stretch" on T; both completed on T (perfect day). | Habit: Stretch | Yes |
| TC_COMPLETION_007 | Verify completing a habit on one date does not complete it on another date | 1. Open the app on T.<br>2. Tap the "Meditate" card.<br>3. Tap T−1 in the week strip.<br>4. Tap T in the week strip. | After step 3, "Meditate" is not completed on T−1 and the pill reads "0 of 1 done". After step 4, "Meditate" is shown completed on T. | AC3; Rules (per habit per date) | Equivalence Partitioning | Critical | Daily habit "Meditate" from T−5, no completions. | Dates: T, T−1 | Yes |
| TC_COMPLETION_008 | Verify undoing a completion on one date keeps other dates' completions | 1. Open the app.<br>2. Tap T−1 in the week strip.<br>3. Tap the completed "Meditate" card.<br>4. Tap T in the week strip. | T−1 shows "Meditate" not completed; T still shows "Meditate" completed and "1 of 1 done". | AC3; AC2 | Equivalence Partitioning | Medium | Daily habit "Meditate" from T−5, completed on T−1 and T. | Dates: T−1, T | Yes |
| TC_COMPLETION_009 | Verify a habit can be completed on a past date | 1. Open the app.<br>2. Tap the previous-week arrow.<br>3. Tap the "Meditate" card.<br>4. Tap "Back to today". | After step 3, "Meditate" is completed on T−7 (Oct 10) and the pill reads "1 of 1 done". After step 4, "Meditate" is not completed on T. | AC3; Rules (per date) | Equivalence Partitioning | Medium | Daily habit "Meditate" from T−30, no completions. | Date: T−7 | Yes |
| TC_COMPLETION_010 | Verify completing the last remaining habit makes the date a perfect day | 1. Open the app on T.<br>2. Tap the "Read" card. | Pill reads "3 of 3 done"; bar is full with a gold gradient; day 17 in the week strip becomes a gold circle with a darker gold ring and a white star; toast "Perfect day! ⭐" appears at the bottom center. | AC4 | State Transition Testing | Critical | Daily habits "Meditate", "Stretch", "Read" on T; "Meditate" and "Stretch" completed on T. | Habit: Read | Yes |
| TC_COMPLETION_011 | Verify a date with a single scheduled habit becomes perfect when it is completed | 1. Open the app on T.<br>2. Tap the "Call mom" card. | Pill reads "1 of 1 done"; gold full bar; star on day 17; toast "Perfect day! ⭐". | AC4; Rules (at least one scheduled habit) | Boundary Value Analysis | High | Only habit: one-time "Call mom" on T, not completed. | Habit: Call mom | Yes |
| TC_COMPLETION_012 | Verify a partially completed date is not a perfect day | 1. Open the app on T.<br>2. Tap the "Stretch" card. | Pill reads "2 of 3 done"; bar uses the accent gradient (not gold) at about 67%; day 17 shows its number, not a star; no "Perfect day! ⭐" toast. | AC4; Rules (perfect day) | Boundary Value Analysis | High | Daily habits "Meditate", "Stretch", "Read" on T; "Meditate" completed on T. | Habit: Stretch | Yes |
| TC_COMPLETION_013 | Verify a date with nothing scheduled is not a perfect day | 1. Open the app.<br>2. Tap T−3 in the week strip. | Day 14 in the week strip shows its number, not a gold star, and no "Perfect day! ⭐" toast appears (the "Nothing scheduled" text is verified in TC_TODAY_018). | AC5; Rules (perfect day needs ≥1 scheduled) | Equivalence Partitioning | High | Only habit: one-time "Call mom" on T, completed on T. | Date: T−3 | Yes |
| TC_COMPLETION_014 | Verify progress counts only habits scheduled on the selected date | 1. Open the app on T.<br>2. Tap the "Meditate" card. | Pill reads "1 of 1 done" (ended and future habits not counted); bar is full and gold; day 17 shows a star. | Rules (daily progress, only scheduled habits) | Decision Table Testing | High | Daily "Meditate" from T−5; daily "Old" from T−10 to T−1; one-time "Later" on T+1. | Habit: Meditate | Yes |
| TC_COMPLETION_015 | Verify a completion persists after the app is closed and reopened | 1. Tap the "Meditate" card on T.<br>2. Close the browser tab.<br>3. Reopen the app in the same browser profile. | "Meditate" is shown completed on T; pill reads "1 of 2 done"; bar about half filled. | AC6 | Use Case Testing | Critical | Daily habits "Meditate", "Stretch" on T; none completed. | Habit: Meditate | Yes |
| TC_COMPLETION_016 | Verify a perfect-day star persists after the app is closed and reopened | 1. Tap the "Call mom" card on T.<br>2. Close the browser tab.<br>3. Reopen the app in the same browser profile. | Pill reads "1 of 1 done"; bar full and gold; day 17 shows the gold star. | AC6 | Use Case Testing | High | Only habit: one-time "Call mom" on T, not completed. | Habit: Call mom | Yes |
| TC_COMPLETION_017 | Verify an undone completion stays undone after the app is reopened | 1. Tap the completed "Meditate" card on T.<br>2. Close the browser tab.<br>3. Reopen the app in the same browser profile. | "Meditate" is shown not completed on T; pill reads "0 of 1 done"; no star on day 17. | AC6; AC2 | Use Case Testing | Medium | Daily habit "Meditate" on T, completed on T. | Habit: Meditate | Yes |
| TC_COMPLETION_018 | Verify rapid repeated taps leave a consistent completion state | 1. Open the app on T.<br>2. Tap the "Meditate" card 3 times quickly.<br>3. Reload the page. | After step 2 the card shows completed (assumed: each tap toggles, Q4) and the pill reads "1 of 1 done". After step 3 the same state is shown. | AC1; AC2; Q4 | Error Guessing | Low | Daily habit "Meditate" on T, not completed. | 3 rapid taps | No |
| TC_COMPLETION_019 | Verify completing the last habit on a past date makes that date a perfect day | 1. Open the app.<br>2. Tap T−3 in the week strip.<br>3. Tap the "Stretch" card. | Pill reads "2 of 2 done"; bar is full with a gold gradient; day 14 in the week strip becomes a gold circle with a white star; toast "Perfect day! ⭐" appears. | AC4; Rules (per date) | State Transition Testing | Medium | Daily habits "Meditate" and "Stretch" from T−10; "Meditate" completed on T−3. | Date: T−3 (Wed Oct 14); habit: Stretch | Yes |
| TC_COMPLETION_020 | Verify the perfect-day toast disappears after about 2 seconds | 1. Open the app on T.<br>2. Tap the "Read" card.<br>3. Wait until the toast is no longer visible. | After step 2 the toast "Perfect day! ⭐" is visible at the bottom center. After step 3 it is no longer visible, within 3 seconds of appearing (story: about 2 seconds). | AC4 | Boundary Value Analysis | Low | Daily habits "Meditate", "Stretch", "Read" on T; "Meditate" and "Stretch" completed on T. | Habit: Read | Yes |

## Coverage Matrix

| Acceptance Criterion | Complexity | Covered By |
| --- | --- | --- |
| AC1 — Mark a habit complete | Medium | TC_COMPLETION_001, 002, 003, 018 |
| AC2 — Undo a completion | Medium | TC_COMPLETION_004, 005, 006, 008, 017 |
| AC3 — Completion is specific to each date | Medium | TC_COMPLETION_007, 008, 009 |
| AC4 — Earn a perfect day | Complex | TC_COMPLETION_010, 011, 012, 019, 020 |
| AC5 — Nothing scheduled is not a perfect day | Simple | TC_COMPLETION_013 (no star); TC_TODAY_018 (empty-state text) |
| AC6 — Keep completions on the same device | Medium | TC_COMPLETION_015, 016, 017 |
| Rules — per habit per date; progress = completed ÷ scheduled; only scheduled habits | — | TC_COMPLETION_002, 007, 014 |

## Quality Gate

- [x] All applicable requirements and acceptance criteria are covered.
- [x] Positive, negative, boundary, state-transition, and business-rule scenarios are included. Authorization: not applicable (no authentication in MVP).
- [x] Test data, expected results, priorities, and techniques are complete.
- [x] Duplicate scenarios are removed.
- [x] Assumptions, risks, and open questions are visible.
- [ ] Finalization: **blocked** — Draft until Q1 (day boundary/time zone), Q2 (save failure), Q4 (rapid taps), and Q5 (star versus today ring) are answered.

**Non-functional checks (checklist §10):** Not applicable — scope is functional only.
