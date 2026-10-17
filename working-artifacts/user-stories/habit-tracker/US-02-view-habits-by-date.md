# US-02 — View Habits Scheduled for a Date

**Status:** Draft for review  
**Priority:** MVP  
**Primary actor:** Individual tracker user

## US context

**Concept.** US-02 is the home screen of the app. It answers "what do I need to do on this day?" by showing the selected date, a Monday–Sunday week strip, and the habits scheduled for that date with their completion state, plus the empty, loading, and error states. It is read-only: marking a habit done or undone belongs to US-03.

**Link to the Product Brief** ([Product Brief](../../product-brief/habit-tracker/Product%20Brief.md)):

| Product Brief item | How this story relates |
| --- | --- |
| Core feature 1 — Today checklist (view habits scheduled for a selected date, navigate dates by week) | This story covers the viewing and navigation half. The brief's other half (mark complete or undo, daily progress) is US-03. |
| Business rules: Habit schedule, Dates | Decide which habits appear on a date (one-time habit on its start date; repeating habit from start through the optional end date, inclusive) and allow any date, including past dates, to be selected. |
| Business rule: Perfect day | The star shown on a perfect day in the week strip is displayed here; the rule itself is implemented in US-03. |
| Design direction (Today/Progress bottom navigation, rounded habit cards, clear states) | Define the layout of the Today screen and its empty, loading, and error states. |
| Out of scope | No reordering of habits by dragging, no reminders or notifications, no editing or deleting habits. |

**Related stories.** Depends on US-01 for habits and schedules. US-03 builds on this screen by letting the user toggle completion. US-04 is reached from the bottom navigation.

## Story

As an individual tracker user, I want to view the habits scheduled for a selected date, so that I know which routines apply to that day.

## Value

I can see the correct checklist for today or another date without confusing unscheduled days with missed habits.

## Preconditions

- The user can open the Today screen.
- Habit definitions and schedules are available to the app.

## Mockup images for the developer to refer to

Image folder: [US-02-view-habits-by-date](../../mockup-wireframe/habit-tracker/US-02-view-habits-by-date/)

Each image file name starts with the AC it illustrates (for example, `AC5-nothing-scheduled.png` is the reference for AC5). The images are 390×844 screenshots of the mockup: [Habit Tracker MVP - All Screens - v1.html](../../mockup-wireframe/habit-tracker/Habit%20Tracker%20MVP%20-%20All%20Screens%20-%20v1.html).

## Acceptance Criteria

Each AC uses Given/When/Then and has a **UI** table taken from the original mockup. Table columns: field name, field type, whether the field is mandatory, design description, and the error message(s) shown in any scenario. "N/A" means the element is display-only or an action.

### AC1 — View today's scheduled habits

- **Given** habits exist and at least one is scheduled for the current date
- **When** I open the Today screen
- **Then** I see the heading "Today" with the current date, the current week with today highlighted, and one card for each habit scheduled today showing its icon, name, schedule label, and completion state
- **UI (Today screen):**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Screen heading | Label | N/A | Bold 34px dark-navy "Today" followed by the muted 20px date (for example "Oct 17"). | None |
| Previous week / Next week | Icon buttons | N/A | Two 40px rounded-square light-gray (#ECECF2) chevron buttons at the top-right of the header. | None |
| Week strip | Day selector (7 buttons) | N/A | Monday to Sunday in 7 equal columns. Each has a 38px circle with the day number and the weekday abbreviation (13px) below. Today has a 2px accent ring; a perfect day is a gold circle with a white star in place of the number. | None |
| Progress pill | Label | N/A | Gray pill "x of y done" (13px semi-bold). | None |
| Progress bar | Progress bar | N/A | 8px high, accent gradient fill; gold when everything is done. | None |
| Habit card | Tappable card (list) | N/A | Full width, 26px corners, pastel background in the habit's color; icon (an emoji at 38px in the mockup) at the left, name (21px semi-bold, one line with ellipsis), muted sub-label ("Every day" or "Just once"), and a 34px completion circle at the right. | None |
| Add habit | Floating button | N/A | 68px accent circle with a white plus, bottom-right above the bottom navigation. Opens New Habit. | None |
| Bottom navigation | Tab bar | N/A | White bar with rounded top corners, two tabs: "Today" (active, dark) and "Progress" (muted). | None |

### AC2 — View another date from the week strip

- **Given** I am on the Today screen
- **When** I tap a day in the week strip
- **Then** that day becomes the selected date, the heading shows its weekday name and date (for example "Wednesday" and "Oct 14"), and only the habits scheduled for that date are listed with their completion state for that date
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Selected day | Day selector button | N/A | The selected column has a soft purple (#BFC6F5) pill background and a white number circle. | None |
| Screen heading | Label | N/A | Weekday name (for example "Wednesday") with the muted short date. | None |
| Progress pill and bar | Label and progress bar | N/A | Show "x of y done" and the fill for the selected date. | None |
| Back to today | Text button | N/A | Accent-colored 13px semi-bold link at the right end of the progress row; shown only when the selected date is not today and has scheduled habits. | None |

### AC3 — Move between weeks and return to today

- **Given** I am viewing a selected date
- **When** I tap the previous-week or next-week arrow
- **Then** the selected date moves 7 days back or forward, the week strip shows that week, and the heading and list update for the new date
- **And When** I then tap "Back to today"
- **Then** today becomes the selected date again
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Previous week / Next week | Icon buttons | N/A | The two light-gray rounded-square chevron buttons next to the heading. | None |
| Week strip | Day selector (7 buttons) | N/A | Shows the Monday–Sunday week that contains the new selected date; the new selected day is highlighted. | None |
| Back to today | Text button | N/A | As in AC2; returns the selection to the current date. | None |

### AC4 — First visit with no habits

- **Given** no habit has been created
- **When** I open the Today screen
- **Then** I see the "No habits yet" empty state and can start creating a habit from it
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Illustration | Emoji label | N/A | Centered 🌱 at 64px. | None |
| Heading | Label | N/A | "No habits yet", 20px semi-bold. | None |
| Description | Label | N/A | Muted text "Plant your first habit and tick it off every day." | None |
| Add a habit | Button | N/A | Accent-colored pill (white 600-weight text, 12px 22px padding). Opens New Habit. | None |

The progress row and cards are not shown; the header, week strip, add button, and bottom navigation remain.

### AC5 — No habits scheduled on the selected date

- **Given** habits exist but none are scheduled on the selected date
- **When** I view that date
- **Then** I see the "Nothing scheduled" state and the date is not shown as a perfect day
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Illustration | Emoji label | N/A | Centered 🌤️ at 64px. | None |
| Heading | Label | N/A | "Nothing scheduled", 20px semi-bold. | None |
| Description | Label | N/A | Muted text "You have no habits on this day. Enjoy the break!" | None |

No progress row, no cards, and no star on that date in the week strip.

### AC6 — Loading state

- **Given** habit data is still being loaded
- **When** the Today screen is displayed
- **Then** I see placeholder cards instead of the habit list
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Placeholder cards | Skeleton list (3 items) | N/A | Three light-gray cards, 96px high, 26px rounded corners, with a left-to-right shimmer animation, in place of the progress row and habit cards. | None |

The header, week strip, add button, and bottom navigation remain.

### AC7 — Load error and retry

- **Given** loading the habit data has failed
- **When** the Today screen is displayed
- **Then** I see the error message and a Try again button, and tapping Try again attempts to load the habit data again
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Illustration | Emoji label | N/A | Centered 🙈 at 64px. | None |
| Heading | Label | N/A | "Couldn't load your habits", 20px semi-bold. | `Couldn't load your habits` |
| Description | Label | N/A | Muted text. | `Something went wrong on our side. Check your connection and try again.` |
| Try again | Button | N/A | Accent-colored pill, same style as "Add a habit". Reloads the habit data. | None |

The header, week strip, add button, and bottom navigation remain.

## Rules and Notes

- The week runs Monday to Sunday. Any date can be selected, including past dates.
- A one-time habit appears only on its start date. A repeating habit appears from its start date through its optional end date, inclusive.
- Viewing a different date never changes completion data.
- Distinguish "no habits at all" (AC4) from "no habits on this date" (AC5).
- Reordering habits (drag to reprioritize) is out of scope.

## Dependencies and Open Questions

- US-01 provides habit definitions and schedules; US-03 provides per-date completion states.
- Confirm whether the date strip needs a lower or upper limit; the mockup allows any date.
- Confirm what "load" means for on-device data (for example, when it can fail); the mockup only demonstrates the loading and error screens.

## Traceability

- Product Brief: Today checklist; Habit schedule and Dates rules.
- Mockup: Today view, week strip, empty/loading/error states (annotations 1–3 and 6).
- Functional decomposition: TRK-01 and TRK-02.
