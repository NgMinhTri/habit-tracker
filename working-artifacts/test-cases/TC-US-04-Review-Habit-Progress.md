# Test Cases: Review Habit Progress

## Traceability Summary

| Item | Value |
| --- | --- |
| User story or requirement | US-04 — Review Habit Progress |
| Feature | Progress screen: monthly perfect-day calendar, Record statistics, Most repeated habits ranking, empty state |
| Scope | Functional |
| Status | Draft |
| Revision | Revised 2026-10-17 to address `working-artifacts/test-case-reviews/Report-Review-Test-Case-TC-US-04-Review-Habit-Progress.md` |
| Source | `working-artifacts/user-stories/habit-tracker/US-04-review-habit-progress.md` |
| Output location | `working-artifacts/test-cases/` |

## Assumptions and Open Questions

- **A1 (test clock):** Dates are relative to "today" (T). Example values assume T = Sat 2026-10-17. Automation should fix the browser clock.
- **A2 (test data):** History is seeded through the UI (US-01 create, US-03 toggle on past dates) or a test fixture, starting from cleared app storage. Each perfect day in the data is made perfect by completing every habit scheduled that day.
- **A3:** Calendar months verified: October 2026 starts on Thursday; November 2026 starts on Sunday.
- **Q1 (from story):** Which time zone and calendar-day boundary does the completion history use? Not covered until confirmed.
- **Q2 (from story):** Is the A–Z tie order permanent? TC_PROGRESS_016 follows the mockup. Case sensitivity and locale of A–Z sorting are also not stated.
- **Q3:** Is there a limit on calendar navigation (earliest/latest month)? Cases assume none.
- **Q4:** How are loading and load failure triggered for the Progress screen? TC_PROGRESS_023 needs a test hook; marked not automatable.
- **Q5:** How are habits and completions seeded for tests (on-device storage fixture or UI)? The storage format is not defined; see A4.
- **Q6:** When habits exist but none is completed, which footnote is shown ("A perfect day means..." from AC4 or "Add a habit and complete it..." from AC5), and do the Record values show zero? TC_PROGRESS_022 assumes zero values and does not assert the footnote.
- **A4 (data seeding):** History is seeded through a fixture in the app's on-device storage (format to be confirmed, Q5) or through the US-01 and US-03 screens. Dates are listed explicitly in each case. The "Do it once" date cannot be changed in New Habit (it is always Today), so one-time habits on any date other than T are seeded by fixture only.
- **A5 (automation):** `Yes` means the case is deterministic with a fixed browser clock (A1) and seeded data (A4). `No` means a loading or failure hook is needed.
- Out of scope per story: extra analytics, reports, export, habit-history views, social features/leaderboards.

## Test Cases

| Test Case ID | Title | Test Steps | Expected Result | Requirement | Testing Technique | Priority | Preconditions | Test Data | Automation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC_PROGRESS_001 | Verify the Progress screen opens on the current month with today outlined | 1. Open the app.<br>2. Tap the "Progress" tab. | Heading "Progress"; section "Your stars"; month header "October 2026" between previous/next arrows; MON–SUN header; day 17 has a 2px accent ring; "Progress" tab is active. | AC1 | Use Case Testing | High | At least one habit exists. | T = Oct 17, 2026 | Yes |
| TC_PROGRESS_002 | Verify every perfect day in the displayed month is marked with a star | 1. Open the Progress screen. | Days 5, 9, and 16 of October show a gold circle with a darker gold ring and a white star instead of the number; all other days show their numbers. | AC1; Rules (perfect day) | Equivalence Partitioning | High | Daily habit "Meditate" from Oct 1; completed on Oct 5, 9, 16 only. | Perfect days: Oct 5, Oct 9, Oct 16 | Yes |
| TC_PROGRESS_003 | Verify partially completed and unscheduled days are not starred | 1. Open the Progress screen. | Oct 15 (1 of 2 done) and Oct 14 (nothing scheduled) show their numbers, not stars; Oct 16 (2 of 2 done) shows a star. | AC1; Rules (perfect day) | Decision Table Testing | High | Daily "Meditate" and "Stretch" from Oct 15; one-time "Call mom" on Oct 13 (not completed). Oct 15: only "Meditate" completed. Oct 16: both completed. | Dates: Oct 14, 15, 16 | Yes |
| TC_PROGRESS_004 | Verify the previous-month arrow shows the previous month with its stars | 1. Open the Progress screen.<br>2. Tap the previous-month arrow. | Header shows "September 2026"; Sep 20 shows a star; no day has the today accent ring. | AC1 | Use Case Testing | High | Daily "Meditate" from Sep 1; completed on Sep 20 only. | Perfect day: Sep 20 | Yes |
| TC_PROGRESS_005 | Verify the next month shows its first day under SUN with no stars or today outline | 1. Open the Progress screen.<br>2. Tap the next-month arrow. | Header shows "November 2026"; day 1 sits in the SUN (last) column; no stars; no day has the today accent ring. | AC1 | Boundary Value Analysis | Medium | At least one habit exists. | Month: November 2026 (Nov 1, 2026 = Sun) | Yes |
| TC_PROGRESS_006 | Verify day 1 of the current month is placed under its correct weekday | 1. Open the Progress screen. | October 2026: day 1 sits in the THU column and the first week is offset accordingly. | AC1 | Boundary Value Analysis | Medium | At least one habit exists. | Month: October 2026 (Oct 1, 2026 = Thu) | Yes |
| TC_PROGRESS_007 | Verify month navigation across a year boundary | 1. Open the Progress screen.<br>2. Tap the next-month arrow 3 times.<br>3. Tap the previous-month arrow once. | Step 2: header "January 2027". Step 3: header "December 2026". | AC1 | Boundary Value Analysis | Low | At least one habit exists. | Oct 2026 → Jan 2027 → Dec 2026 | Yes |
| TC_PROGRESS_008 | Verify Perfect Days counts all-time perfect days across months | 1. Open the Progress screen. | Record "Perfect Days" shows "3 days" (Sep 20 + Oct 5 + Oct 9). | AC2; Rules (all-time) | Equivalence Partitioning | High | Daily "Meditate" from Sep 1; completed on Sep 20, Oct 5, Oct 9. | Perfect days: Sep 20, Oct 5, Oct 9 | Yes |
| TC_PROGRESS_009 | Verify Best Streak shows the longest run of consecutive perfect days | 1. Open the Progress screen. | "Perfect Days" shows "4 days"; "Best Streak" shows "3 days". | AC2 | Equivalence Partitioning | High | Daily "Meditate" from Oct 1; completed on Oct 2, Oct 10, Oct 11, Oct 12. | Perfect days: Oct 2, 10, 11, 12 | Yes |
| TC_PROGRESS_010 | Verify Total Habits Done counts distinct habits, not check-offs | 1. Open the Progress screen. | "Total Habits Done" shows `2` (Meditate and Stretch), not 6. | AC2; Rules (distinct habits) | Equivalence Partitioning | High | Daily "Meditate", "Stretch", "Read" from Oct 1. Meditate completed on Oct 2–6; Stretch on Oct 3; Read never. | Completions: Meditate Oct 2, 3, 4, 5, 6; Stretch Oct 3; Read none | Yes |
| TC_PROGRESS_011 | Verify singular "1 day" is shown for Perfect Days and Best Streak | 1. Open the Progress screen. | "Perfect Days" shows "1 day"; "Best Streak" shows "1 day"; "Total Habits Done" shows `1`. | AC2 | Boundary Value Analysis | Medium | Only habit: one-time "Call mom" on T−2, completed. | Perfect day: T−2 | Yes |
| TC_PROGRESS_012 | Verify a gap breaks a streak using the story example | 1. Open the Progress screen. | "Perfect Days" shows "6 days"; "Best Streak" shows "3 days"; calendar shows stars on Oct 7, 10, 11, 14, 15, 16 with numbered days between runs. | AC3 | Boundary Value Analysis | Critical | Daily "Meditate" from Oct 1; completed on T−1, T−2, T−3, T−6, T−7, T−10 only. | Perfect days: Oct 16, 15, 14, 11, 10, 7 | Yes |
| TC_PROGRESS_013 | Verify a date with no scheduled habits breaks a streak | 1. Open the Progress screen. | "Perfect Days" shows "2 days"; "Best Streak" shows "1 day" (Oct 15 has nothing scheduled and does not extend the run). | AC3; Rules (no-scheduled date does not extend) | Decision Table Testing | High | One-time habits "A" on Oct 14 and "B" on Oct 16, both completed; nothing scheduled on Oct 15. | Dates: Oct 14 (perfect), Oct 15 (none), Oct 16 (perfect) | Yes |
| TC_PROGRESS_014 | Verify a streak continues across a month boundary | 1. Open the Progress screen.<br>2. Tap the previous-month arrow. | After step 1, "Best Streak" shows "3 days" and the October calendar shows a star on Oct 1. After step 2, the September calendar shows stars on Sep 29 and Sep 30. | AC2; Rules (consecutive calendar dates) | Boundary Value Analysis | Medium | Daily "Meditate" from Sep 25; completed on Sep 29, Sep 30, Oct 1 only. | Perfect days: Sep 29, Sep 30, Oct 1 | Yes |
| TC_PROGRESS_015 | Verify habits are ranked from most to fewest completed days | 1. Open the Progress screen.<br>2. Scroll to "Most repeated habits". | Rows in order: Meditate "9 days", Stretch "4 days", Read "2 days". Each row shows the habit's color badge and icon, name, bar, and count. Footnote "⭐ A perfect day means every habit scheduled that day is done." is below the panel. | AC4 | Equivalence Partitioning | High | Daily habits from Sep 27 (T−20): Meditate completed on Oct 1–9 (9 dates); Stretch on Oct 1–4 (4 dates); Read on Oct 1–2 (2 dates). | Counts: Meditate 9, Stretch 4, Read 2 | Yes |
| TC_PROGRESS_016 | Verify habits with the same count are ordered alphabetically | 1. Open the Progress screen.<br>2. Scroll to "Most repeated habits". | Rows in order: Walk "5 days", Journal "3 days", Meditate "3 days", Yoga "3 days". | AC4; Rules (A–Z ties, Q2) | Equivalence Partitioning | High | Daily habits from Sep 27 (T−20), created in the order Yoga, Meditate, Journal, Walk: Walk completed on Oct 1–5; Yoga, Meditate, and Journal each completed on Oct 1–3. | Ties at 3 days: Journal, Meditate, Yoga | Yes |
| TC_PROGRESS_017 | Verify a never-completed habit is listed with an empty bar and "0 days" | 1. Open the Progress screen.<br>2. Scroll to "Most repeated habits". | "Floss" is the last row with "0 days" and an empty bar; "Meditate" row shows "1 day". | AC4 | Boundary Value Analysis | High | Daily "Meditate" from Oct 1 (completed on Oct 5 only) and "Floss" from Oct 1 (never completed). | Counts: 1, 0 | Yes |
| TC_PROGRESS_018 | Verify ranking bar width is relative to the highest count | 1. Open the Progress screen.<br>2. Scroll to "Most repeated habits". | Meditate bar is full width; Read bar is about one third of the full width. | AC4 | Equivalence Partitioning | Medium | Daily habits from Sep 27: Meditate completed on Oct 1–9; Read completed on Oct 1–3. | Counts: 9, 3 | Yes |
| TC_PROGRESS_019 | Verify the ranking counts distinct completed dates and excludes undone completions | 1. Tap the "Progress" tab. | Meditate row shows "2 days"; "Total Habits Done" shows `1`. | AC4; Rules (distinct dates) | Error Guessing | Medium | Daily "Meditate" from T−5; completed on T−2, T−1, and T, then the completion on T undone (setup through Today). | Dates: T−2 and T−1 (counted), T (undone) | Yes |
| TC_PROGRESS_020 | Verify Record and ranking stay all-time when browsing months | 1. Open the Progress screen and note Record and ranking values.<br>2. Tap the previous-month arrow.<br>3. Tap the next-month arrow twice. | Record values and ranking rows are unchanged in every month; only the calendar changes. | Rules (calendar by month; Record and ranking all-time) | Equivalence Partitioning | Medium | Daily "Meditate" from Sep 1; completed on Sep 20 and Oct 5. | Months: Sep, Oct, Nov 2026 | Yes |
| TC_PROGRESS_021 | Verify the empty state when no habits exist | 1. Open the app.<br>2. Tap the "Progress" tab. | Calendar for October 2026 with no stars and day 17 outlined; Record shows "0 days", "0 days", and `0`; ranking panel shows "Add a habit to see it ranked here." with no rows; footnote "Add a habit and complete it to earn your first ⭐." | AC5 | Equivalence Partitioning | High | Cleared storage; no habits. | None | Yes |
| TC_PROGRESS_022 | Verify habits without completions show zero records but are still ranked | 1. Open the Progress screen. | Record shows "0 days", "0 days", and `0`; ranking lists Meditate and Stretch with "0 days" each, ordered A–Z; the "Add a habit to see it ranked here." message is not shown (zero values assumed, Q6). | AC4; Q6 | Boundary Value Analysis | Medium | Daily habits "Stretch" and "Meditate" exist; no completions. | Counts: 0, 0 | Yes |
| TC_PROGRESS_023 | Verify Record values show "–" while data is loading or has failed | 1. Delay or fail data loading (Q4).<br>2. Open the Progress screen. | "Perfect Days", "Best Streak", and "Total Habits Done" each show "–". | AC2 | Error Guessing | Medium | Test hook to delay/fail loading (Q4). | None | No |
| TC_PROGRESS_024 | Verify a long ranking list scrolls to show every habit | 1. Open the Progress screen.<br>2. Scroll to the bottom of the page. | All 12 habits are listed and the footnote is visible after scrolling. | AC4 | Equivalence Partitioning | Low | 12 daily habits named Habit 01 to Habit 12, each from Oct 1; Habit NN completed on NN−1 distinct dates starting Oct 1 (Habit 01: none, Habit 12: Oct 1–11). | 12 habits, counts 0–11 | Yes |
| TC_PROGRESS_025 | Verify a day becomes perfect after a habit's end date has passed | 1. Open the Progress screen. | Oct 9 shows its number, not a star (1 of 2 done); Oct 10 shows a star (only "Meditate" scheduled, completed); "Perfect Days" shows "1 day"; "Best Streak" shows "1 day"; "Total Habits Done" shows `1`. | AC1; AC2; Rules (perfect day) | Decision Table Testing | High | Daily "Meditate" from Oct 1, completed on Oct 9 and Oct 10; daily "Old" from Oct 1 to Oct 9, never completed. | Dates: Oct 9 (not perfect), Oct 10 (perfect) | Yes |
| TC_PROGRESS_026 | Verify a habit that starts later does not remove earlier perfect days | 1. Open the Progress screen. | Oct 5 and Oct 6 show stars; Oct 7 shows its number; "Perfect Days" shows "2 days"; "Best Streak" shows "2 days". | AC1; AC2; Rules (perfect day is based on habits scheduled that day) | Decision Table Testing | High | Daily "Meditate" from Oct 1, completed on Oct 5 and Oct 6; daily "Later" from Oct 7, never completed. | Dates: Oct 5, 6 (perfect), Oct 7 (not perfect) | Yes |
| TC_PROGRESS_027 | Verify a not-completed one-time habit prevents a perfect day while the daily habit is done | 1. Open the Progress screen. | Oct 12 shows its number, not a star (1 of 2 done); Oct 13 shows a star; "Perfect Days" shows "1 day"; "Best Streak" shows "1 day". | AC2; AC3; Rules (perfect day) | Decision Table Testing | High | Daily "Meditate" from Oct 1, completed on Oct 12 and Oct 13; one-time "Call mom" on Oct 12, not completed. | Dates: Oct 12 (not perfect), Oct 13 (perfect) | Yes |
| TC_PROGRESS_028 | Verify today is marked with a star when today is a perfect day | 1. Open the Progress screen. | October 2026: day 17 shows the gold star circle; "Perfect Days" shows "1 day"; "Best Streak" shows "1 day". The today ring is not asserted (US-03 Q5). | AC1; Rules (perfect day) | Equivalence Partitioning | Medium | Daily "Meditate" from Oct 1, completed on T only. | Date: T (Oct 17) | Yes |
| TC_PROGRESS_029 | Verify a long habit name is shown on one line with an ellipsis in the ranking | 1. Open the Progress screen.<br>2. Scroll to "Most repeated habits". | The ranking row shows the name on a single line that ends with an ellipsis, next to "0 days". | AC4 (habit name UI) | Boundary Value Analysis | Low | One daily habit from Oct 1, never completed; viewport 390×844. | Name (40 chars): `Practice guitar scales for twenty minute` | Yes |

## Coverage Matrix

| Acceptance Criterion | Complexity | Covered By |
| --- | --- | --- |
| AC1 — Browse the monthly perfect-day calendar | Medium | TC_PROGRESS_001, 002, 003, 004, 005, 006, 007, 025, 026, 028 |
| AC2 — View the Record statistics | Complex | TC_PROGRESS_008, 009, 010, 011, 014, 023, 025, 026, 027 |
| AC3 — A gap breaks a streak | Complex | TC_PROGRESS_012, 013, 027 |
| AC4 — Rank all habits by completed days | Complex | TC_PROGRESS_015, 016, 017, 018, 019, 022, 024, 029 |
| AC5 — Empty state when no habits exist | Simple | TC_PROGRESS_021 |
| Rules — Record and ranking all-time; calendar by month | — | TC_PROGRESS_008, 020 |
| Rules — distinct habits / distinct dates | — | TC_PROGRESS_010, 019 |

## Quality Gate

- [x] All applicable requirements and acceptance criteria are covered.
- [x] Positive, negative, boundary, and business-rule scenarios are included. Authorization: not applicable (no authentication in MVP).
- [x] Test data, expected results, priorities, and techniques are complete.
- [x] Duplicate scenarios are removed.
- [x] Assumptions, risks, and open questions are visible.
- [ ] Finalization: **blocked** — Draft until Q1 (day boundary), Q2 (tie order), Q4 (loading/failure hook), Q5 (data seeding), and Q6 (footnote with no completions) are answered.

**Non-functional checks (checklist §10):** Not applicable — scope is functional only.
