# Test Cases: View Habits Scheduled for a Date

## Traceability Summary

| Item | Value |
| --- | --- |
| User story or requirement | US-02 — View Habits Scheduled for a Date |
| Feature | Today screen: heading, week strip, week navigation, habit list, empty/loading/error states |
| Scope | Functional |
| Status | Draft |
| Revision | Revised 2026-10-17 to address `working-artifacts/test-case-reviews/Report-Review-Test-Case-TC-US-02-View-Habits-by-Date.md` |
| Source | `working-artifacts/user-stories/habit-tracker/US-02-view-habits-by-date.md` |
| Output location | `working-artifacts/test-cases/` |

## Assumptions and Open Questions

- **A1 (test clock):** Dates are relative to "today" (T). Example values assume T = Sat 2026-10-17 (week Mon Oct 12 – Sun Oct 18). Automation should fix the browser clock.
- **A2 (test data):** Habits and completions in preconditions are created through the UI (US-01, US-03) or a test fixture, starting from cleared app storage.
- **A3:** Completion state on cards is set up via US-03 behavior; this story only verifies that it is displayed.
- **Q1 (from story):** Is there a lower or upper limit for selectable dates? Cases assume none, as in the mockup.
- **Q2 (from story):** What does "load" mean for on-device data and how can it fail? Loading (TC_TODAY_020) and error/retry cases (TC_TODAY_021–023) need a test hook to delay or fail loading; marked not automatable until a hook is defined.
- **Q3:** Should "Back to today" also appear when the selected non-today date has no scheduled habits (AC5 hides the progress row)? Cases follow the story: shown only when the date is not today and has scheduled habits.
- **Q4:** Should habits on a date be listed in a specific order? Not stated; order is not verified.
- **Q5:** How are habits and completions seeded for tests (on-device storage fixture or UI)? The storage format is not defined; see A5.
- **A5 (data seeding):** Habits and completions are seeded through a fixture in the app's on-device storage (format to be confirmed with the developer, Q5) or through the US-01 and US-03 screens. Past-date completions are seeded by fixture. The "Do it once" date cannot be changed in New Habit (it is always Today), so one-time habits on any date other than T are seeded by fixture only.
- **A6 (automation):** `Yes` means the case is deterministic with a fixed browser clock (A1) and seeded data (A5). `No` means the case needs a loading or failure hook that does not exist yet.
- **Status of TC_TODAY_020–023:** Not executable until Q2 is answered and a hook exists. Expected results are fully specified by the story, so the cases are kept.
- Out of scope per story: drag reordering, reminders/notifications, editing/deleting habits, marking completion (US-03).

## Test Cases

| Test Case ID | Title | Test Steps | Expected Result | Requirement | Testing Technique | Priority | Preconditions | Test Data | Automation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC_TODAY_001 | Verify the Today screen shows the heading, current week, and today's habits | 1. Open the app. | Heading "Today" followed by the current date ("Oct 17"); week strip shows Mon 12 – Sun 18 with today (17) having an accent ring; one card per habit scheduled on T; progress pill "0 of 2 done"; add (+) button and bottom navigation with "Today" active are visible. | AC1 | Use Case Testing | Critical | Daily habits "Meditate" and "Stretch" start on T−7, no completions. | T = Oct 17 | Yes |
| TC_TODAY_002 | Verify each habit card shows icon, name, schedule label, and completion state | 1. Open the app. | "Meditate" card: its icon, pastel color background, sub-label "Every day", empty completion circle. "Call mom" card: its icon, sub-label "Just once", green completion circle with a check. | AC1 | Equivalence Partitioning | High | Daily habit "Meditate" (not completed on T); one-time habit "Call mom" on T, completed on T. | Habits as in preconditions | Yes |
| TC_TODAY_003 | Verify only habits scheduled on the selected date are listed | 1. Open the app. | Only "Daily open" and "Once today" and "Ends today" are listed. "Once yesterday", "Starts tomorrow", and "Ended yesterday" are not listed. Progress pill reads "0 of 3 done". | AC1; Rules (schedule) | Decision Table Testing | Critical | Habits exist as listed in Test Data. | Daily open: start T−10, no end. Once today: one-time T. Ends today: daily T−5 to T. Once yesterday: one-time T−1. Starts tomorrow: daily from T+1. Ended yesterday: daily T−5 to T−1. | Yes |
| TC_TODAY_004 | Verify the week strip starts on Monday when today is a Monday | 1. Open the app. | Week strip shows Mon 12 – Sun 18 with Mon 12 ringed as today (heading "Today" with "Oct 12"). | Rules (Mon–Sun week) | Boundary Value Analysis | Medium | At least one daily habit exists; device date fixed to Mon 2026-10-12. | Device date: Mon 2026-10-12 | Yes |
| TC_TODAY_005 | Verify tapping a day in the week strip selects that date | 1. Open the app.<br>2. Tap "14" (Wed) in the week strip. | Selected column shows a soft purple pill and white number circle; heading shows "Wednesday" with "Oct 14"; today (17) keeps its accent ring. | AC2 | Use Case Testing | High | Daily habit "Meditate" starts on T−10. | Selected date: T−3 (Wed Oct 14) | Yes |
| TC_TODAY_006 | Verify the selected date shows only its scheduled habits and its own completion states | 1. Open the app.<br>2. Tap T−3 in the week strip. | "Meditate" (completed on T−3, green check) and "Call mom" (one-time on T−3, not completed) are listed; "Read" (one-time on T) is not listed. Progress pill reads "1 of 2 done". | AC2 | Decision Table Testing | High | Daily habit "Meditate" from T−10, completed on T−3 only. One-time "Call mom" on T−3. One-time "Read" on T. | Selected date: T−3 | Yes |
| TC_TODAY_007 | Verify "Back to today" visibility depends on the selected date | 1. Open the app (T selected).<br>2. Tap T−1 (has habits).<br>3. Select T−4 in the week strip. | After step 1, "Back to today" is not shown. After step 2, it is shown at the right of the progress row. After step 3 (T−4 has no scheduled habits), it is not shown (follows AC2; see Q3). | AC2 | Decision Table Testing | Medium | Daily habit "Meditate" from T−3 to T. No habits on T−4. | Dates: T, T−1, T−4 | Yes |
| TC_TODAY_008 | Verify the progress pill and bar reflect the selected date | 1. Open the app.<br>2. Tap T−1. | On T: "1 of 2 done", bar about half filled. On T−1: "2 of 2 done", bar full. | AC2 | Equivalence Partitioning | Medium | Daily habits "Meditate" and "Stretch" from T−5. T−1: both completed. T: only "Meditate" completed. | Dates: T, T−1 | Yes |
| TC_TODAY_009 | Verify the previous-week arrow moves the selected date 7 days back | 1. Open the app.<br>2. Tap the previous-week arrow. | Selected date is T−7 (Sat Oct 10); week strip shows Mon 5 – Sun 11 with 10 selected; heading shows "Saturday" with "Oct 10"; list shows habits for Oct 10. | AC3 | Use Case Testing | High | Daily habit "Meditate" from T−30. | Selected date: T−7 (Sat Oct 10) | Yes |
| TC_TODAY_010 | Verify the next-week arrow moves the selected date 7 days forward | 1. Open the app.<br>2. Tap T−3 (Wed Oct 14).<br>3. Tap the next-week arrow. | Selected date is Wed Oct 21; week strip shows Mon 19 – Sun 25 with 21 selected; heading "Wednesday" with "Oct 21"; list shows habits for Oct 21. | AC3 | Use Case Testing | High | Daily habit "Meditate" from T−30, no end. | Selected dates: Oct 14, then Oct 21 | Yes |
| TC_TODAY_011 | Verify "Back to today" returns the selection to the current date | 1. Open the app.<br>2. Tap the next-week arrow twice.<br>3. Tap "Back to today". | Selected date is T; week strip shows Mon 12 – Sun 18 with today ringed; heading "Today" with "Oct 17"; "Back to today" is hidden. | AC3 | State Transition Testing | High | Daily habit "Meditate" from T−30, no end. | Selected dates: T+14, then T | Yes |
| TC_TODAY_012 | Verify week navigation across a month and year boundary | 1. Open the app.<br>2. Tap the next-week arrow 11 times. | The strip for the week containing Jan 2, 2027 shows Mon Dec 28 – Sun Jan 3; heading shows "Saturday" with "Jan 2"; "Meditate" is listed. | AC3; Rules (any date) | Boundary Value Analysis | Medium | Daily habit "Meditate" from T, no end. | Start: T (Oct 17, 2026); end: Sat Jan 2, 2027 | Yes |
| TC_TODAY_013 | Verify a distant past date can be selected | 1. Open the app.<br>2. Tap the previous-week arrow 10 times. | Selected date is T−70 (Aug 8, 2026); heading and list update; "Old habit" (started T−100) is listed. | Rules (any date incl. past) | Equivalence Partitioning | Low | Daily habit "Old habit" from T−100. | 10 previous-week taps | Yes |
| TC_TODAY_014 | Verify viewing other dates does not change completion data | 1. Tap T−1 in the week strip.<br>2. Tap T−2 in the week strip.<br>3. Tap the next-week arrow.<br>4. Tap "Back to today".<br>5. Tap T−1 in the week strip. | After step 4, T shows "Meditate" completed and "1 of 2 done". After step 5, T−1 shows no completions and "0 of 2 done". | Rules (viewing never changes completion) | Error Guessing | Medium | Daily habits "Meditate" and "Stretch" from T−5; "Meditate" completed on T only. | Dates: T, T−1, T−2 | Yes |
| TC_TODAY_015 | Verify the "No habits yet" empty state on first visit | 1. Open the app. | 🌱 illustration, heading "No habits yet", text "Plant your first habit and tick it off every day.", and an "Add a habit" button. No progress row and no cards. Header, week strip, add (+) button, and bottom navigation are shown. | AC4 | Equivalence Partitioning | High | Cleared storage; no habits. | None | Yes |
| TC_TODAY_016 | Verify "Add a habit" in the empty state opens New Habit | 1. Open the app.<br>2. Tap "Add a habit". | New Habit screen opens. | AC4 | Use Case Testing | High | No habits exist. | None | Yes |
| TC_TODAY_017 | Verify the floating add button opens New Habit | 1. Open the app.<br>2. Tap the add (+) button. | New Habit screen opens. | AC1 | Use Case Testing | Medium | At least one habit exists. | None | Yes |
| TC_TODAY_018 | Verify the "Nothing scheduled" state on a date without scheduled habits | 1. Open the app.<br>2. Tap T−3 in the week strip. | 🌤️ illustration, heading "Nothing scheduled", text "You have no habits on this day. Enjoy the break!". No progress row and no cards; day 14 in the strip shows its number, not a star. "No habits yet" is not shown. | AC5 | Equivalence Partitioning | High | Only habit: one-time "Call mom" on T. | Selected date: T−3 | Yes |
| TC_TODAY_019 | Verify a perfect day is shown as a star in the week strip | 1. Open the app. | Day T−1 shows a gold circle with a white star instead of its number; other days show numbers. | AC1 (week strip); US-03 AC4 (perfect-day star) | Equivalence Partitioning | Medium | Daily habit "Meditate" from T−5, completed on T−1 only. | Date: T−1 | Yes |
| TC_TODAY_020 | Verify placeholder cards are shown while habit data loads | 1. Open the app.<br>2. Wait for loading to complete. | After step 1, three light-gray placeholder cards with shimmer appear instead of the progress row and habit cards; header, week strip, add button, and bottom navigation remain. After step 2, the placeholders are replaced by the habit cards. | AC6 | Equivalence Partitioning | Medium | At least one habit exists; habit data loading is delayed by a test hook (Q2). | None | No |
| TC_TODAY_021 | Verify the load error state is shown when loading fails | 1. Open the app. | 🙈 illustration, heading `Couldn't load your habits`, text `Something went wrong on our side. Check your connection and try again.`, and a "Try again" button. Header, week strip, add button, and bottom navigation remain. | AC7 | Error Guessing | High | Habit data loading fails through a test hook (Q2). | None | No |
| TC_TODAY_022 | Verify "Try again" reloads and shows habits when loading succeeds | 1. Open the app.<br>2. Tap "Try again". | After step 1 the error state is shown. After step 2 a new load attempt starts and the error state is replaced by the habit list for the selected date (e.g., "Meditate" card and "0 of 1 done"). | AC7 | State Transition Testing | High | Daily habit "Meditate" exists; loading fails on the first attempt and succeeds on the next through a test hook (Q2). | None | No |
| TC_TODAY_023 | Verify "Try again" keeps the error state when loading fails again | 1. Open the app.<br>2. Tap "Try again". | After step 1 the error state is shown. After step 2 a new load attempt is made and the error state with "Try again" is shown again. | AC7 | State Transition Testing | Medium | Loading fails on every attempt through a test hook (Q2). | None | No |
| TC_TODAY_024 | Verify the bottom navigation switches between Today and Progress | 1. Open the app.<br>2. Tap "Progress" in the bottom navigation.<br>3. Tap "Today" in the bottom navigation. | After step 2, the Progress screen opens with the "Progress" tab active. After step 3, the Today screen opens with the "Today" tab active and today selected. | AC1 (bottom navigation) | Use Case Testing | Medium | At least one habit exists. | None | Yes |
| TC_TODAY_025 | Verify a long habit name is shown on one line with an ellipsis | 1. Open the app. | The card for the 40-character habit shows its name on a single line that ends with an ellipsis; the name does not wrap. | AC1 (habit card UI) | Boundary Value Analysis | Low | One-time habit scheduled on T; viewport 390×844. | Name (40 chars): `Practice guitar scales for twenty minute` | Yes |
| TC_TODAY_026 | Verify the week strip starts on Monday when today is a Sunday | 1. Open the app. | Week strip shows Mon 12 – Sun 18 (the week containing Sunday, not the next week) with Sun 18 ringed as today (heading "Today" with "Oct 18"). | Rules (Mon–Sun week) | Boundary Value Analysis | Medium | At least one daily habit exists; device date fixed to Sun 2026-10-18. | Device date: Sun 2026-10-18 | Yes |

## Coverage Matrix

| Acceptance Criterion | Complexity | Covered By |
| --- | --- | --- |
| AC1 — View today's scheduled habits | Medium | TC_TODAY_001, 002, 003, 017, 019, 024, 025 |
| AC2 — View another date from the week strip | Medium | TC_TODAY_005, 006, 007, 008 |
| AC3 — Move between weeks and return to today | Medium | TC_TODAY_009, 010, 011, 012 |
| AC4 — First visit with no habits | Simple | TC_TODAY_015, 016 |
| AC5 — No habits scheduled on the selected date | Simple | TC_TODAY_018 |
| AC6 — Loading state | Simple | TC_TODAY_020 |
| AC7 — Load error and retry | Medium | TC_TODAY_021, 022, 023 |
| Rules — Mon–Sun week, any date selectable | — | TC_TODAY_004, 012, 013, 026 |
| Rules — schedule inclusion (one-time, daily, inclusive end) | — | TC_TODAY_003, 006 |
| Rules — viewing never changes completion | — | TC_TODAY_014 |

## Quality Gate

- [x] All applicable requirements and acceptance criteria are covered.
- [x] Positive, negative, boundary, and business-rule scenarios are included where applicable. Authorization: not applicable (no authentication in MVP).
- [x] Test data, expected results, priorities, and techniques are complete.
- [x] Duplicate scenarios are removed.
- [x] Assumptions, risks, and open questions are visible.
- [ ] Finalization: **blocked** — Draft until Q1–Q3 and Q5 are answered; AC6/AC7 cases need a defined loading/failure mechanism.

**Non-functional checks (checklist §10):** Not applicable — scope is functional only.
