# Test Automation Coverage Report

| Item | Value |
| --- | --- |
| Report date | 2026-10-17 |
| Scope | US-01 to US-04 (Habit Tracker 4TP) |
| Test-case source | `working-artifacts/test-cases/TC-US-0*.md` (all four files are still **Draft**) |
| Automation source | `working-artifacts/e2e/test/functions/` (Playwright, Chromium, 390×844) |
| Last run | 4 tests, 4 passed, 0 failed, about 23 s |

## 1. Summary

| Metric | Count | Rate |
| --- | ---: | ---: |
| Total test cases | 119 | 100% |
| Marked automatable (`Automation = Yes`) | 112 | 94.1% of total |
| Marked not automatable (`Automation = No`) | 7 | 5.9% of total |
| **Automated (implemented)** | **4** | |
| Automation coverage, of total cases | 4 / 119 | **3.4%** |
| Automation coverage, of automatable cases | 4 / 112 | **3.6%** |
| Automated tests passing | 4 / 4 | **100%** |
| Automatable cases still to automate | 108 | 96.4% of automatable |

## 2. Coverage by user story

| User story | Total | Automatable | Not automatable | Automated | Of total | Of automatable |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| US-01 Create and Schedule a Habit | 44 | 43 | 1 | 1 | 2.3% | 2.3% |
| US-02 View Habits by Date | 26 | 22 | 4 | 1 | 3.8% | 4.5% |
| US-03 Track Daily Completion | 20 | 19 | 1 | 1 | 5.0% | 5.3% |
| US-04 Review Habit Progress | 29 | 28 | 1 | 1 | 3.4% | 3.6% |
| **Total** | **119** | **112** | **7** | **4** | **3.4%** | **3.6%** |

## 3. Automated test cases and results

| Test case | Title | Story | Spec file | Result |
| --- | --- | --- | --- | --- |
| TC_HABIT_001 | Habit with Repeat off (one-time) is created when Save is tapped | US-01 AC1 | `US-01-Create-Habit-Repeat-Off.spec.ts` | Passed |
| TC_TODAY_001 | Today screen shows the heading, current week, and today's habits | US-02 AC1 | `US-02-View-Today-Screen.spec.ts` | Passed |
| TC_COMPLETION_001 | Tapping a not-completed card marks the habit completed | US-03 AC1 | `US-03-Track-Mark-Habit-Completed.spec.ts` | Passed |
| TC_PROGRESS_002 | Every perfect day in the displayed month is marked with a star | US-04 AC1 | `US-04-Review-Progress-Perfect-Days.spec.ts` | Passed |

## 4. Cases marked not automatable

| Test case | Title |
| --- | --- |
| TC_HABIT_030 | Icon grid lists every icon from the icon source |
| TC_TODAY_020 | Placeholder cards are shown while habit data loads |
| TC_TODAY_021 | Load error state is shown when loading fails |
| TC_TODAY_022 | "Try again" reloads and shows habits when loading succeeds |
| TC_TODAY_023 | "Try again" keeps the error state when loading fails again |
| TC_COMPLETION_018 | Rapid repeated taps leave a consistent completion state |
| TC_PROGRESS_023 | Record values show "–" while data is loading or has failed |

## 5. Notes and gaps

- **Counting basis:** Totals are the rows in each test-case table. "Automatable" is the `Automation` column, not a judgment made in this report.
- **Coverage type:** The rates measure test-case automation coverage. They are not code or line coverage.
- **Scope of automation:** One happy-path case per story, as requested. The 108 remaining automatable cases are not implemented, including all negative, boundary and validation cases.
- **Draft cases:** The source cases are Draft, and the TC-US-04 file was untracked in git at the last `git status`. Totals may change when they are finalized.
- **Possible defect (TC_TODAY_001):** The case expects today to show an accent ring in the week strip. The app draws it only when today is not the selected day, so that ring is not asserted. This needs a product decision.
- **Test environment:** Tests run against a throwaway SQLite database on ports 5272 and 5273, with the browser clock fixed to 2026-10-17 UTC. Habit data is reset before each test.
