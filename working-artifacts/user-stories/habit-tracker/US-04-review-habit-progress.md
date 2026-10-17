# US-04 — Review Habit Progress

**Status:** Draft for review  
**Priority:** MVP  
**Primary actor:** Individual tracker user

## US context

**Concept.** US-04 lets the user look back and see their consistency over time. It adds a monthly calendar with stars on perfect days, three record statistics (Perfect Days, Best Streak, Total Habits Done), and a ranking of every habit by how many days it was completed. It is read-only and uses the data created by US-01 and US-03.

**Link to the Product Brief** ([Product Brief](../../product-brief/habit-tracker/Product%20Brief.md)):

| Product Brief item | How this story relates |
| --- | --- |
| Core feature 3 — Progress | This story is the full implementation of this feature. |
| Business rules: Perfect day, Progress calendar | The calendar marks each perfect day with a star, outlines today, and is browsable by month (AC1). |
| Business rules: Perfect Days, Best Streak, Total Habits Done | Define the Record statistics in AC2 and AC3. |
| Business rule: Most repeated habits | Defines AC4: every habit ever added is listed, including those never completed, ranked by distinct completed days from most to fewest. |
| Design direction (Today/Progress bottom navigation, soft pastel colors, clear states) | Define the Progress screen layout and its empty state (AC5). |
| Out of scope | No additional analytics, reports, data export, or habit-history views beyond this Progress screen; no social features or leaderboards. |

**Related stories.** Depends on US-03 for the completion history and perfect-day outcomes, and on US-01 for the habits, their icons, and their colors.

## Story

As an individual tracker user, I want to review perfect days, completion records, and how often I completed each habit, so that I can understand my consistency over time.

## Value

I can see both calendar-level consistency and a complete comparison of my habits.

## Preconditions

- The user can open the Progress screen from the bottom navigation.
- Habit definitions and completion history are available to the app.

## Mockup images for the developer to refer to

Image folder: [US-04-review-habit-progress](../../mockup-wireframe/habit-tracker/US-04-review-habit-progress/)

Each image file name starts with the AC it illustrates (for example, `AC4-all-habits-ranked.png` is the reference for AC4). The images are 390×844 screenshots of the mockup: [Habit Tracker MVP - All Screens - v1.html](../../mockup-wireframe/habit-tracker/Habit%20Tracker%20MVP%20-%20All%20Screens%20-%20v1.html).

## Acceptance Criteria

Each AC uses Given/When/Then and has a **UI** table taken from the original mockup. Table columns: field name, field type, whether the field is mandatory, design description, and the error message(s) shown in any scenario. "N/A" means the element is display-only or an action.

### AC1 — Browse the monthly perfect-day calendar

- **Given** I am on the Progress screen
- **When** I open it, or tap the previous-month or next-month arrow
- **Then** the calendar shows the selected month, every perfect day in that month is marked with a star, and today is outlined when it is in that month
- **UI (Progress screen):**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Screen heading | Label | N/A | Bold 34px dark-navy "Progress". | None |
| Section label | Label | N/A | "Your stars", 17px semi-bold. | None |
| Month header | Label with two icon buttons | N/A | Month and year (for example "October 2026", 18px) between two 36px round previous/next arrow buttons. | None |
| Weekday header | Label row | N/A | MON–SUN, 12px gray uppercase. | None |
| Day cell | Calendar day (7-column grid) | N/A | 38px circle with the day number; the first week is offset so day 1 sits under its weekday. A perfect day is a gold (#FFCB2F) circle with a darker gold (#F0B400) ring and a white star in place of the number. Today has a 2px accent ring. | None |
| Bottom navigation | Tab bar | N/A | "Progress" tab active (dark). | None |

### AC2 — View the Record statistics

- **Given** completion history exists
- **When** I view the Progress screen
- **Then** Perfect Days shows the all-time number of perfect days, Best Streak shows the longest run of consecutive perfect days, and Total Habits Done shows the number of distinct habits completed at least once
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Section label | Label | N/A | "Record", 17px semi-bold. | None |
| Perfect Days | Label and value row | N/A | Label at the left, bold value at the right: "N days" ("1 day" when 1). | None |
| Best Streak | Label and value row | N/A | Same layout: "N days" ("1 day" when 1). | None |
| Total Habits Done | Label and value row | N/A | Same layout: a bare number. | None |

Rows sit in one white rounded panel, separated by thin lines. While data is loading or has failed, the three values show "–".

### AC3 — A gap breaks a streak

- **Given** there are runs of consecutive perfect days separated by a date that is not perfect or has no scheduled habits
- **When** I view the Record panel
- **Then** Best Streak equals the longest single run, not the total number of perfect days (for example, with perfect days 1, 2, 3, 6, 7 and 10 days ago, Perfect Days is 6 and Best Streak is 3)
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Day cell | Calendar day | N/A | Gold stars with ordinary numbered days between the runs. | None |
| Perfect Days / Best Streak | Label and value rows | N/A | Same layout as AC2, showing both values. | None |

### AC4 — Rank all habits by completed days

- **Given** one or more habits exist, including habits that have never been completed
- **When** I view the "Most repeated habits" section
- **Then** every habit is listed with its number of distinct completed days across all time, ordered from the most to the fewest days, and habits with the same count are ordered alphabetically (A–Z)
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Section label | Label | N/A | "Most repeated habits", 17px semi-bold. | None |
| Habit badge | Emoji label | N/A | 44px circle in the habit's pastel color with its icon (an emoji at 24px in the mockup). | None |
| Habit name | Label | N/A | 17px bold dark navy, single line with ellipsis. | None |
| Habit bar | Progress bar | N/A | 6px high under the name; filled width = the habit's days ÷ the highest days (empty when 0 days). | None |
| Days count | Label | N/A | 15px semi-bold at the right: "9 days", "1 day", "0 days". | None |

Rows sit in one white rounded panel, separated by thin lines. A habit with no completions stays in the list with an empty bar and "0 days". The page scrolls when the list is long. A footnote below reads "⭐ A perfect day means every habit scheduled that day is done."

### AC5 — Empty state when no habits exist

- **Given** no habit has been created
- **When** I view the Progress screen
- **Then** the Record values show zero, no habit ranking rows are shown, and a message invites me to add a habit
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Calendar | Calendar | N/A | Shown with no stars; today outlined. | None |
| Record values | Label and value rows | N/A | "0 days", "0 days", and "0". | None |
| Ranking message | Label | N/A | Centered muted text "Add a habit to see it ranked here." in the ranking panel. | None |
| Footnote | Label | N/A | "Add a habit and complete it to earn your first ⭐." in 13px muted text. | None |

## Rules and Notes

- Perfect Days counts all dates that satisfy the perfect-day rule (at least one scheduled habit, all completed).
- Best Streak is the longest run of consecutive perfect calendar dates; any date that is not perfect breaks the run, and a date with no scheduled habits does not extend it.
- Total Habits Done counts distinct habits with at least one completed date, not total check-offs.
- The ranking includes every added habit, counts distinct completed dates per habit across all time, and orders ties A–Z as the mockup does.
- The calendar is browsable by month; Record and ranking are always all-time.

## Dependencies and Open Questions

- US-03 provides the completion history and perfect-day outcomes.
- Confirm the time zone and the calendar-day boundary used by the completion history.
- Confirm whether the A–Z tie order should be kept as the permanent rule; it is implemented in the mockup but not stated in the Product Brief.

## Traceability

- Product Brief: Progress; Perfect day, Perfect Days, Best Streak, Total Habits Done, Most repeated habits, and Progress calendar rules.
- Mockup: Progress calendar, records, ranking, and empty state (annotations 17–22). The mockup was updated to list all habits.
- Functional decomposition: PRO-01 through PRO-03.
