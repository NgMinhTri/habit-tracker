# US-01 — Create and Schedule a Habit

**Status:** Draft for review  
**Priority:** MVP  
**Primary actor:** Individual tracker user

## US context

**Concept.** US-01 is the entry point of the product. Checking off habits and reviewing progress only make sense once a habit exists, so this story covers the whole "New Habit" experience: naming the habit, choosing its icon and color, scheduling it once or daily (with an optional end date), validating the input, and how the saved habit looks in the app.

**Link to the Product Brief** ([Product Brief](../../product-brief/habit-tracker/Product%20Brief.md)):

| Product Brief item | How this story relates |
| --- | --- |
| Core feature 2 — Create habits | This story is the full implementation of this feature. |
| Business rules: Habit name, Habit schedule, Dates | Define the scheduling and validation behavior in AC1–AC6 (name rules, one-time versus daily, end date on or after start date, past start dates allowed). |
| Design direction (icon-led habit items, soft pastel colors, rounded controls) | Icon and color selection and how they appear on the habit (AC7–AC9) follow it. |
| Assumption: data is persisted on the user's device | Covered by AC11. |
| Out of scope | No editing or deleting saved habits, no recurrence other than one-time and daily, no user-defined icons or colors beyond the available icon set and swatches, no authentication. |

**Related stories.** This is the first step of the flow: US-01 create a habit, then US-02 view it by date, US-03 complete it, and US-04 review progress. The other three stories use the habits created here.

## Story

As an individual tracker user, I want to create and schedule a habit with my own icon and color, so that it appears on the dates when I intend to do it and is easy to recognize in my list.

## Value

I can define a personal routine in the tracker, make it look like mine, and avoid configuring unsupported schedules.

## Preconditions

- The user can open the New Habit screen from Today (the add button, or the "Add a habit" button in the empty state).

## Mockup images for the developer to refer to

Image folder: [US-01-create-and-schedule-habit](../../mockup-wireframe/habit-tracker/US-01-create-and-schedule-habit/)

Each image file name starts with the AC it illustrates (for example, `AC3-empty-name-validation.png` is the reference for AC3). The images are 390×844 screenshots of the mockup: [Habit Tracker MVP - All Screens - v1.html](../../mockup-wireframe/habit-tracker/Habit%20Tracker%20MVP%20-%20All%20Screens%20-%20v1.html).

Source notes:
- AC11 is illustrated by the post-save Today screen only; the mockup keeps data in memory and does not demonstrate persistence after reopening.
- The AC6 image is scrolled to show the inline message below the calendar.
- The icons in the AC1, AC7 and AC9 images are sample emoji from the mockup; the real icon list comes from the icon source chosen by the developer (see Rules and Notes).

## Acceptance Criteria

Each AC uses Given/When/Then and has a **UI** table taken from the original mockup. Table columns: field name, field type, whether the field is mandatory, design description, and the error message(s) shown in any scenario. "N/A" means the element is display-only or an action.

### AC1 — Create a one-time habit

- **Given** I am on the New Habit screen with Repeat off, a valid name, an icon, a color, and a date selected
- **When** I tap Save, or press Enter in the name field
- **Then** the habit is created as a one-time habit scheduled only on the chosen date, and I am returned to the Today screen where the new habit card shows the sub-label "Just once" and a "Habit added ✨" confirmation appears
- **UI (New Habit screen):**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Close | Icon button | N/A | 40px rounded-square light-blue button with an X, top-left. Discards the form (AC10). | None |
| Screen title | Label | N/A | "New Habit", centered, 24px semi-bold, dark navy. | None |
| Habit icon | Icon selector button | Yes (a default icon is preselected; the mockup uses 🌞) | 112px white circle with shadow, the selected icon in the middle (the mockup shows an emoji at 68px), small round accent pencil badge at its bottom-right. Opens the Choose an Icon screen (AC7). | None |
| Habit name | Text input | Yes | Centered, borderless, 26px semi-bold, placeholder "Name your habit". 1–40 characters after trimming, unique ignoring letter case. Accepts up to 41 characters so an overlong name can be rejected. | AC3, AC4, AC5 |
| Habit color | Single-select color swatches | Yes (preselected rose) | Seven 42px circles in a row, pastel fill with a darker ring. The selected swatch is 10% larger and shows a check mark. | None |
| Repeat | Toggle | No (default off) | 52×30px pill toggle, gray when off and accent when on. | None |
| Date ("Do it once" row, shown when Repeat is off) | Date chip (opens the native date picker) | Yes (default Today) | White rounded card row, label "Do it once", gray rounded chip showing "Today" or a short date such as "Oct 20". Past dates are allowed. | None |
| Save | Button | N/A | Full-width 64px dark-navy pill with white 20px semi-bold text, pinned 24px above the bottom with 16px side margins. | AC3, AC4, AC5, AC6 |

- **After saving:** Today shows the new card with the sub-label "Just once" and a dark pill toast "Habit added ✨" at the bottom center for about 2 seconds.

### AC2 — Create a daily repeating habit with an optional end date

- **Given** I am on the New Habit screen with a valid name and Repeat turned on
- **When** I optionally turn on "Set end date", choose an end date on or after the start date, and tap Save
- **Then** the habit is scheduled every day from the start date through the end date inclusive, or indefinitely when no end date is set, and I am returned to the Today screen where the card shows the sub-label "Every day"
- **UI (schedule card on the New Habit screen; other fields as in AC1):**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Repeat | Toggle | No | On state in accent color. Turning it on replaces the "Do it once" row with the rows below. | None |
| Start | Date chip (native date picker) | Yes (default Today) | Row label "Start", gray chip showing "Today" or a short date. Past dates are allowed. | None |
| Frequency | Read-only text | N/A | Row label "Frequency", muted value "Every day". Cannot be changed. | None |
| Set end date | Toggle | No (default off) | Row label "Set end date", same toggle style. Turning it on shows the End row and the inline calendar. | None |
| End | Date chip (display of the selected end date) | Yes when "Set end date" is on (default: the day after the start date, for example "Oct 18") | Row label "End", filled accent chip with white text. | AC6 |
| End date calendar | Inline single-date calendar | Yes when "Set end date" is on | Gray-tinted panel under the End row. Header: month and year (for example "October 2026") between two round previous/next arrow buttons. MON–SUN header row, then a 7-column grid of day buttons. Selected end date is a filled accent circle with white text; today has an accent ring. | AC6 |

### AC3 — Reject an empty name

- **Given** I am on the New Habit screen and the name is empty or contains only spaces
- **When** I tap Save, or press Enter in the name field
- **Then** the habit is not created, I stay on the New Habit screen, and the error message is shown below the name field
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit name | Text input | Yes | Same as AC1, with a red (#D9534F) dashed bottom border while the error is shown. | `Please give your habit a name.` |
| Name error | Inline message block | N/A | Directly below the name field, full width, 14px medium red text on a light-red (#FDECEC) rounded block. Disappears as soon as I type in the name field. | `Please give your habit a name.` |

### AC4 — Reject a name longer than 40 characters

- **Given** I am on the New Habit screen and the trimmed name has 41 or more characters
- **When** I tap Save, or press Enter in the name field
- **Then** the habit is not created, I stay on the New Habit screen with my text kept, and the error message is shown below the name field
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit name | Text input | Yes | Same as AC3: red dashed bottom border, entered text stays in the field. Accepts up to 41 characters. | `Name must be 40 characters or fewer.` |
| Name error | Inline message block | N/A | Same style and position as AC3. | `Name must be 40 characters or fewer.` |

### AC5 — Reject a duplicate name

- **Given** I am on the New Habit screen and another habit already has the same name, ignoring letter case (for example "Stretch" exists and I enter "stretch")
- **When** I tap Save, or press Enter in the name field
- **Then** the habit is not created, I stay on the New Habit screen with my text kept, and the error message is shown below the name field
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit name | Text input | Yes | Same as AC3: red dashed bottom border, entered text stays in the field. | `You already have a habit called "<name>".` where `<name>` is the trimmed name I entered, for example `You already have a habit called "stretch".` |
| Name error | Inline message block | N/A | Same style and position as AC3. | Same as above |

### AC6 — Reject an end date before the start date

- **Given** I am on the New Habit screen with a valid name, Repeat on, "Set end date" on, and an end date earlier than the start date
- **When** I tap Save
- **Then** the habit is not created, I stay on the New Habit screen, and the error message is shown below the schedule card
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| End | Date chip (display) | Yes | Shows the invalid end date (for example "Oct 16") until I change it. | `End date must be on or after the start date.` |
| End date calendar | Inline single-date calendar | Yes | Same as AC2; the invalid day stays highlighted. | None |
| Date error | Inline message block | N/A | Below the white schedule card (below the inline calendar), same red-on-light-red style as AC3. The name field is not marked. Cleared when I change Repeat, "Set end date", the start date, or the end date. | `End date must be on or after the start date.` |

### AC7 — Choose an icon

- **Given** I am on the New Habit screen
- **When** I tap the icon button, and then tap one icon in the Choose an Icon screen
- **Then** I am returned to the New Habit screen, the icon button shows the chosen icon, and that icon is used for the habit
- **UI (Choose an Icon screen):**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Back | Icon button | N/A | 40px rounded-square light-blue button with a left arrow, top-left. Returns to New Habit without changing the icon. | None |
| Screen title | Label | N/A | "Choose an Icon", centered, 24px semi-bold, dark navy. | None |
| Icon list | Single-select icon grid | Yes (one icon is always selected; the current icon is highlighted) | Every icon provided by the icon source is shown in a vertically scrollable grid of 5 equal columns. No search field and no categories. The icon source and format are the developer's decision (see Rules and Notes); the mockup shows 40 sample emoji. Each cell is a square with 20px rounded corners, light-gray (#F3F3F8) fill, and the icon centered (34px in the mockup). The selected icon has a light-blue (#DDE2FC) fill and a 2.5px accent inner border. Tapping an icon selects it and returns to New Habit immediately. | None |
| Habit icon (back on New Habit) | Icon selector button | Yes | Shows the chosen icon inside the 112px circle. | None |

### AC8 — Choose a color

- **Given** I am on the New Habit screen
- **When** I tap one of the seven color swatches
- **Then** exactly that swatch is selected and the color is used for the habit
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit color | Single-select color swatches | Yes (preselected rose; exactly one is always selected) | Seven 42px circles in this order: rose, peach, yellow, green, mint, blue, lilac. Each has a pastel fill and a 2.5px darker ring (hex values in Rules and Notes). The selected swatch is 10% larger and shows a check mark; the others show no check mark. Tapping another swatch moves the selection. | None |

### AC9 — The habit appears with the chosen icon and color

- **Given** I have saved a habit with a chosen icon and color
- **When** I view a date on which the habit is scheduled on the Today screen, or the Progress screen
- **Then** the habit card on Today uses the chosen color as its background and shows the chosen icon, and the habit's row in the Progress ranking shows the same icon on a circle in the chosen color
- **UI (habit card on Today):**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit card | Tappable card | N/A | Full width, 26px rounded corners, 20px padding, background is the habit's chosen pastel color. | None |
| Habit icon | Icon label | N/A | The chosen icon, in a 56px-wide area at the left of the card (the mockup shows an emoji at 38px). | None |
| Habit name | Label | N/A | 21px semi-bold, single line with ellipsis. | None |
| Schedule label | Label | N/A | 15px muted text under the name: "Every day" or "Just once". | None |
| Completion circle | Status indicator | N/A | 34px circle at the right with a gray outline (green with a check when completed; see US-03). | None |
| Ranking badge (Progress screen) | Icon label | N/A | 44px circle filled with the habit's chosen color, containing the chosen icon (an emoji at 24px in the mockup). | None |

### AC10 — Discard an unsaved habit

- **Given** I have typed or selected values on the New Habit screen
- **When** I tap the Close (X) button
- **Then** I am returned to the Today screen, no habit is created, and the entered values are discarded without a confirmation prompt
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Close | Icon button | N/A | 40px rounded-square light-blue button with an X, top-left of New Habit. | None |
| Today screen | Screen | N/A | Shown unchanged; no new card and no toast. | None |

### AC11 — Keep a saved habit on the same device

- **Given** I have saved a habit
- **When** I close and reopen the app in the same browser profile on the same device
- **Then** the habit is still available with the same name, icon, color, and schedule, and appears on the dates it is scheduled for
- **UI:**

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |
| Habit card | Tappable card | N/A | Shown exactly as in AC9, with the saved icon, color, name, and schedule label. | None |

## Rules and Notes

- Trim the name before saving. Names are unique case-insensitively and at most 40 characters.
- A one-time habit is scheduled only on its start date. A repeating habit occurs daily from its start date through the optional end date, inclusive; without an end date it continues indefinitely.
- Past start dates are allowed. Repeating frequency is fixed to "Every day". The end date must be on or after the start date.
- Icon source: the icon list is integrated from another source, and the source and icon format (emoji, images, or an icon font) are the developer's decision. There is no fixed list to follow. Requirements: list every icon the source provides on the Choose an Icon screen, keep one icon selected at all times (a default icon is preselected), and store a stable identifier for the chosen icon so it can be shown on the habit card and the Progress ranking. The mockup's 40 sample emoji are for illustration only: 🧘 🙆 💧 🏃 🚴 🏊 🏋️ 🚶 📖 ✍️ 🎧 🎸 🎹 🎨 💻 🧠 🌐 🛏️ 🌅 🌙 🥗 🍎 🥦 🍵 ☕ 🦷 🧴 🛁 🧹 🪴 🐶 🐱 💊 📵 💌 🙏 🌞 ⭐ 💰 🎯. Icon search, categories, and user-uploaded icons are out of scope.
- Color swatches (fill / ring): rose #FADDDD / #EFC3C3, peach #FDEFDD / #F0D9BB, yellow #F6F2DA / #E4DDB0, green #E4F3DA / #C9E3B8, mint #DDF5E8 / #B9E4CB, blue #DFEAF5 / #BDD3EA, lilac #F3E0F7 / #DDBDE6. Custom colors are out of scope.
- Editing or deleting a saved habit is out of scope.
- The mockup's reviewer toolbar, data-state buttons, and annotation legend are not product functionality.

## Dependencies and Open Questions

- No preceding story is required to create the first habit.
- Confirm the icon source and format with the product owner or decide it during development (developer's decision per Rules and Notes).
- On-device persistence is an assumption in the Product Brief; confirm behavior after browser data is cleared or when the user changes browsers or devices (cloud sync is out of scope).
- Confirm that closing the form should always discard changes without a confirmation prompt, as the mockup does.

## Traceability

- Product Brief: Create habits; Habit name, Habit schedule, and Dates rules.
- Mockup: New Habit and Choose an Icon screens, validation and schedule flows (annotations 5, 7–14, 16, 21).
- Functional decomposition: HAB-01 through HAB-04, DATA-01.
