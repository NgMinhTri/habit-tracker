# US-03 — Track Daily Habit Completion

**Status:** Draft for review  
**Priority:** MVP  
**Primary actor:** Individual tracker user

## US context

**Concept.** US-03 turns the Today checklist into a tracker. The user taps a habit to mark it done for the selected date, taps again to undo, sees the daily progress update, and earns a perfect day when everything scheduled that day is done. It produces the completion history that US-04 analyzes.

**Link to the Product Brief** ([Product Brief](../../product-brief/habit-tracker/Product%20Brief.md)):

| Product Brief item | How this story relates |
| --- | --- |
| Core feature 1 — Today checklist (mark complete or undo, see daily completion progress) | This story covers the recording and progress half. The viewing and navigation half is US-02. |
| Business rules: Completion, Daily progress, Perfect day | Define the behavior in AC1–AC5: completion is per habit per calendar date, progress is completed out of scheduled, and a perfect day needs at least one scheduled habit with all of them done. |
| Assumption: data is persisted on the user's device | Covered by AC6. |
| Design direction (clear completion and progress states) | The completed card style, progress pill and bar, and gold perfect-day treatment follow it. |
| Out of scope | No editing or deleting habits, no reminders or notifications, no social sharing of results. |

**Related stories.** Depends on US-02 for the selected date and the scheduled-habit list. US-04 depends on the completion history created here.

## Story

As an individual tracker user, I want to mark a scheduled habit done or undo it for a date, so that my daily progress reflects what I actually completed.

## Value

I can keep an accurate, date-specific completion record and understand whether I completed everything scheduled for the day.

## Preconditions

- At least one habit is scheduled for the selected date and is shown on the Today screen.

## Mockup images for the developer to refer to

Image folder: [US-03-track-daily-completion](../../mockup-wireframe/habit-tracker/US-03-track-daily-completion/)

Each image file name starts with the AC it illustrates (for example, `AC4-perfect-day.png` is the reference for AC4). The images are 390×844 screenshots of the mockup: [Habit Tracker MVP - All Screens - v1.html](../../mockup-wireframe/habit-tracker/Habit%20Tracker%20MVP%20-%20All%20Screens%20-%20v1.html).

Source note: AC6 is illustrated by the completed state before reopening; the mockup keeps data in memory and does not demonstrate persistence after reopening.

## Acceptance Criteria

Each AC uses Given/When/Then and has a **UI** table taken from the original mockup. Table columns: field name, field type, whether the field is mandatory, design description, and the error message(s) shown in any scenario. "N/A" means the element is display-only or an action.

### AC1 — Mark a habit complete

- **Given** a habit scheduled for the selected date is not completed
- **When** I tap anywhere on its card
- **Then** the habit is recorded as completed for that date, its card shows the completed state, and the daily progress count and bar are updated
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit card | Tappable card (toggle) | N/A | The whole card is the tap target. When completed it fades to about 62% opacity and shrinks slightly while pressed. | None |
| Habit name | Label | N/A | Struck through in muted gray (#7d8597) when completed. | None |
| Completion circle | Status indicator | N/A | 34px circle; completed = green (#5FCB71) fill, darker green border, white check, short scale "pop" animation. | None |
| Progress pill | Label | N/A | Count increases by one, for example "1 of 3 done" becomes "2 of 3 done". | None |
| Progress bar | Progress bar | N/A | Accent-gradient fill width = completed ÷ scheduled, animated over 0.35s. | None |

### AC2 — Undo a completion

- **Given** a habit scheduled for the selected date is completed
- **When** I tap its card again
- **Then** the completion for that date is removed, the card returns to the not-completed state, and the daily count and bar are updated; if the date was a perfect day, it is no longer a perfect day
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit card | Tappable card (toggle) | N/A | Returns to full opacity with a normal title. | None |
| Completion circle | Status indicator | N/A | Back to an empty circle with a gray (#B7BBC9) 2px outline. | None |
| Progress pill and bar | Label and progress bar | N/A | Count and fill decrease; a gold full bar returns to the accent gradient. | None |
| Week strip day | Day selector button | N/A | If the date was perfect, the gold star circle returns to the normal circle with the day number. | None |

### AC3 — Completion is specific to each date

- **Given** a habit is completed on one date and is also scheduled on another date
- **When** I select the other date in the week strip
- **Then** the habit's completion state for the other date is shown independently of the first date
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Week strip | Day selector (7 buttons) | N/A | The selected day has the soft purple pill; the list below reflects only that date. | None |
| Habit card | Tappable card | N/A | Shows the checked or unchecked style for the selected date only. | None |
| Progress pill | Label | N/A | "x of y done" for the selected date. | None |

### AC4 — Earn a perfect day

- **Given** at least one habit is scheduled for the selected date and all but one are completed
- **When** I complete the last remaining habit
- **Then** the date is a perfect day, the progress bar is full, and the date is marked with a star
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Progress pill | Label | N/A | Reads "N of N done". | None |
| Progress bar | Progress bar | N/A | Full width with a gold (#FFD95C to #FFCB2F) gradient. | None |
| Week strip day | Day selector button | N/A | The day's circle becomes gold with a darker gold (#F0B400) 2px ring and a white star replacing the number. | None |
| Toast | Notification | N/A | Dark-navy pill "Perfect day! ⭐" at the bottom center for about 2 seconds. | None |

### AC5 — A date with nothing scheduled is not a perfect day

- **Given** habits exist but none are scheduled for a date
- **When** I view that date
- **Then** the date is not a perfect day
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Empty state | Illustration, heading and text | N/A | 🌤️ "Nothing scheduled" and "You have no habits on this day. Enjoy the break!" (see US-02 AC5). | None |
| Week strip day | Day selector button | N/A | Normal circle with the day number; no gold star. | None |

### AC6 — Keep completions on the same device

- **Given** I have marked a habit completed for a date
- **When** I close and reopen the app in the same browser profile on the same device
- **Then** the habit is still completed for that date and the daily progress and any perfect-day star reflect it
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit card | Tappable card | N/A | Shown in the completed style from AC1. | None |
| Progress pill and bar | Label and progress bar | N/A | Show the saved count and fill. | None |

## Rules and Notes

- Completion is tracked per habit per calendar date. Completing a habit on one date does not complete it on another date.
- Daily progress is completed scheduled habits out of total scheduled habits for the selected date.
- A perfect day requires at least one scheduled habit and every scheduled habit completed.
- Only habits scheduled on the selected date can be toggled.

## Dependencies and Open Questions

- US-02 provides the selected date and the scheduled-habit list.
- Confirm the time zone and the calendar-day boundary used to assign a completion to a date.
- Confirm what the user should see if a completion cannot be saved on the device.

## Traceability

- Product Brief: Today checklist; Completion, Daily progress, and Perfect day rules.
- Mockup: Habit card toggle and perfect-day feedback (annotations 3, 4, and 18).
- Functional decomposition: TRK-03, TRK-04, and DATA-01.
