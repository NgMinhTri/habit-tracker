---
name: Habit Tracker
description: Clean, cute, mobile-style habit tracker. Soft pastel surfaces, rounded shapes, icon-led habit cards, and a calm indigo accent.
version: 1.0
source: working-artifacts/mockup-wireframe/habit-tracker/Habit Tracker MVP - All Screens - v1.html
captured: 2026-10-17
confidence: Observed unless a value is tagged Inferred or Proposed
colors:
  # Core palette (Observed)
  ink: "#0F0F33"              # headings, primary button, strong text
  text: "#2D3748"             # card titles, body text
  text-secondary: "#5B5F78"   # pills, chips, counts
  muted: "#8A8FA3"            # secondary text, sub-labels, notes
  accent: "#7B8EF0"           # add button, toggles, selected date, links, bar fill
  accent-soft: "#BFC6F5"      # selected day pill
  surface: "#FFFFFF"          # sheets, panels, nav bar
  chip: "#ECECF2"             # pills, chips, bar track, round buttons
  line: "#EEF0F6"             # hairline dividers
  success: "#5FCB71"          # completed check
  success-border: "#4DB961"
  gold: "#FFCB2F"             # perfect day, full progress bar
  gold-ring: "#F0B400"
  danger: "#D9534F"           # validation text and border
  danger-soft: "#FDECEC"      # validation background
  # Supporting neutrals (Observed)
  nav-inactive: "#A4A9BA"
  placeholder: "#9A9FB2"
  check-outline: "#B7BBC9"
  done-title: "#7D8597"
  toggle-off: "#D1D1DB"
  calendar-day: "#6E7488"
  icon-cell: "#F3F3F8"
  icon-cell-selected: "#DDE2FC"
  topbar-button: "#E6EEFB"
  topbar-button-icon: "#6F86B5"
  # Habit colors: fill / ring (Observed)
  habit-rose: "#FADDDD"
  habit-rose-ring: "#EFC3C3"
  habit-peach: "#FDEFDD"
  habit-peach-ring: "#F0D9BB"
  habit-yellow: "#F6F2DA"
  habit-yellow-ring: "#E4DDB0"
  habit-green: "#E4F3DA"
  habit-green-ring: "#C9E3B8"
  habit-mint: "#DDF5E8"
  habit-mint-ring: "#B9E4CB"
  habit-blue: "#DFEAF5"
  habit-blue-ring: "#BDD3EA"
  habit-lilac: "#F3E0F7"
  habit-lilac-ring: "#DDBDE6"
typography:
  fontFamily: "Figtree, system-ui, -apple-system, 'Segoe UI', sans-serif"
  weights: [400, 500, 600, 700]
  page-title: { fontSize: 34px, fontWeight: 700, lineHeight: normal, letterSpacing: -0.5px }
  page-date: { fontSize: 20px, fontWeight: 500, lineHeight: normal, letterSpacing: 0 }
  screen-title: { fontSize: 24px, fontWeight: 600, lineHeight: normal, letterSpacing: 0 }
  name-input: { fontSize: 26px, fontWeight: 600, lineHeight: normal, letterSpacing: 0 }
  card-title: { fontSize: 21px, fontWeight: 600, lineHeight: normal, letterSpacing: 0 }
  state-heading: { fontSize: 20px, fontWeight: 700, lineHeight: normal, letterSpacing: 0 }
  button-primary: { fontSize: 20px, fontWeight: 600, lineHeight: normal, letterSpacing: 0 }
  row-label: { fontSize: 18px, fontWeight: 500, lineHeight: normal, letterSpacing: 0 }
  month-title: { fontSize: 18px, fontWeight: 500, lineHeight: normal, letterSpacing: 0 }
  section-label: { fontSize: 17px, fontWeight: 600, lineHeight: normal, letterSpacing: 0 }
  record-row: { fontSize: 17px, fontWeight: 500, lineHeight: normal, letterSpacing: 0 }
  body: { fontSize: 16px, fontWeight: 400, lineHeight: 1.45, letterSpacing: 0 }
  button-soft: { fontSize: 16px, fontWeight: 600, lineHeight: normal, letterSpacing: 0 }
  card-sub: { fontSize: 15px, fontWeight: 400, lineHeight: normal, letterSpacing: 0 }
  chip: { fontSize: 15px, fontWeight: 600, lineHeight: normal, letterSpacing: 0 }
  nav-label: { fontSize: 14px, fontWeight: 500, lineHeight: normal, letterSpacing: 0 }
  message: { fontSize: 14px, fontWeight: 500, lineHeight: normal, letterSpacing: 0 }
  caption: { fontSize: 13px, fontWeight: 600, lineHeight: 1.5, letterSpacing: 0 }
  calendar-header: { fontSize: 12px, fontWeight: 400, lineHeight: normal, letterSpacing: 0.5px }
spacing: { s1: 4px, s2: 8px, s3: 12px, s4: 16px, s5: 24px, s6: 32px }
rounded:
  pill: 999px
  sheet: 32px
  card: 26px
  nav: 28px
  cell: 20px
  round-button: 14px
  message: 14px
  chip: 12px
  bar: 8px
  circle: 50%
elevation:
  panel: "0 6px 18px rgba(80, 90, 150, 0.10)"
  sheet: "0 -4px 20px rgba(120, 120, 180, 0.06)"
  nav: "0 -6px 22px rgba(100, 110, 170, 0.10)"
  fab: "0 10px 22px rgba(123, 142, 240, 0.50)"
  button-primary: "0 10px 22px rgba(15, 15, 51, 0.25)"
  toggle-knob: "0 1px 3px rgba(0, 0, 0, 0.20)"
gradients:
  app-background: "linear-gradient(180deg, #F4F0FD 0%, #FFF6EE 38%, #FFFFFF 70%)"
  progress-fill: "linear-gradient(90deg, #9DA9F7, #7B8EF0)"
  progress-fill-complete: "linear-gradient(90deg, #FFD95C, #FFCB2F)"
  skeleton: "linear-gradient(90deg, #F1F2F8 25%, #E8EAF4 37%, #F1F2F8 63%)"
motion: { fast: 0.12s, base: 0.15s, standard: 0.2s, bar: 0.35s, toast: 0.3s, skeleton: 1.3s }
components:
  button-primary: { background: ink, color: surface, rounded: pill, height: 64px, typography: button-primary, elevation: button-primary }
  button-soft: { background: accent, color: surface, rounded: pill, padding: "12px 22px", typography: button-soft }
  fab: { background: accent, color: surface, rounded: circle, size: 68px, elevation: fab }
  round-button: { background: chip, color: text, rounded: round-button, size: 40px }
  habit-card: { background: "habit color fill", rounded: card, padding: 20px, typography: card-title }
  panel: { background: surface, rounded: card, elevation: panel }
  chip: { background: "#E1E2EE", color: text-secondary, rounded: chip, padding: "8px 14px", typography: chip }
  chip-active: { background: accent, color: surface, rounded: chip, typography: chip }
  toggle: { background: toggle-off, background-on: accent, rounded: pill, size: "52x30px" }
  swatch: { size: 42px, rounded: circle, border: "2.5px habit ring", selected-scale: 1.1 }
  icon-cell: { background: icon-cell, background-selected: icon-cell-selected, rounded: cell, ratio: "1:1" }
  error-message: { background: danger-soft, color: danger, rounded: message, typography: message }
  toast: { background: ink, color: surface, rounded: pill, padding: "10px 18px", typography: message }
  nav-bar: { background: surface, rounded: "28px 28px 0 0", height: 88px, elevation: nav }
---

# Habit Tracker — DESIGN.md

## Overview

**Intent.** A personal habit tracker that feels clean, cute, and easy to use. The mood comes from a soft lavender-to-cream background, pastel habit cards, large rounded shapes, and one calm indigo accent. A gold star is the single "reward" color and is used only for perfect days and full progress.

**Platform.** Web app with a mobile-style interface. Design reference size is **390 × 844 px**; the app column is never wider than 440 px.

**Source and provenance.** Captured on 2026-10-17 by reading the CSS and script of the interactive mockup [Habit Tracker MVP - All Screens - v1.html](../../mockup-wireframe/habit-tracker/Habit%20Tracker%20MVP%20-%20All%20Screens%20-%20v1.html). Every token marked **Observed** is copied from that file. The mockup's own reviewer toolbar, scenario buttons, annotation legend, and device frame (rounded 36 px shell with a drop shadow, and the lavender page background `#E9E7F5` behind it) are prototype aids and are **not** part of the design system.

**Confidence tags.** Observed = read from the mockup. Inferred = reasonable but unconfirmed. Proposed = a recommendation that differs from or adds to the mockup. No NashTech default tokens were used because a real source exists.

**Related documents.** Behavior and exact screen content are in the user stories (`working-artifacts/user-stories/habit-tracker/`). This file defines how things look; the stories define what they do.

## Colors

| Role | Token | Hex | Used for |
| --- | --- | --- | --- |
| Primary text / strong | `ink` | #0F0F33 | Page titles, section labels, primary button, toast, active nav |
| Body text | `text` | #2D3748 | Card titles, row labels, body copy |
| Secondary text | `text-secondary` | #5B5F78 | Progress pill, chips, counts |
| Muted text | `muted` | #8A8FA3 | Sub-labels, dates, notes, empty-state text |
| Accent | `accent` | #7B8EF0 | Add button, toggles (on), active chip, links, today ring, bar fill |
| Accent soft | `accent-soft` | #BFC6F5 | Selected day pill, input focus underline |
| Surface | `surface` | #FFFFFF | Sheets, panels, nav bar, selected-day number circle |
| Chip / track | `chip` | #ECECF2 | Pills, day circles, round buttons, progress track |
| Divider | `line` | #EEF0F6 | Hairlines between rows |
| Success | `success` | #5FCB71 | Completed check circle (border #4DB961) |
| Gold | `gold` | #FFCB2F | Perfect-day star circle, full progress bar (ring #F0B400) |
| Danger | `danger` | #D9534F | Validation text and field border |
| Danger soft | `danger-soft` | #FDECEC | Validation message background |

**App background (Observed):** vertical gradient `#F4F0FD` (0%) to `#FFF6EE` (38%) to `#FFFFFF` (70%).

**Supporting neutrals (Observed):** nav inactive `#A4A9BA`, placeholder `#9A9FB2`, check outline `#B7BBC9`, completed title `#7D8597`, toggle off `#D1D1DB`, calendar day number `#6E7488`, icon cell `#F3F3F8` / selected `#DDE2FC`, top-bar round button `#E6EEFB` with icon `#6F86B5`.

**Habit colors (Observed).** Seven fixed pastel fills, each with a darker ring used on the swatch:

| Name | Fill | Ring |
| --- | --- | --- |
| rose (default) | #FADDDD | #EFC3C3 |
| peach | #FDEFDD | #F0D9BB |
| yellow | #F6F2DA | #E4DDB0 |
| green | #E4F3DA | #C9E3B8 |
| mint | #DDF5E8 | #B9E4CB |
| blue | #DFEAF5 | #BDD3EA |
| lilac | #F3E0F7 | #DDBDE6 |

**Rules.** The chosen habit color is only used as the habit card background, the swatch, and the ranking badge. Do not use habit colors for text, buttons, or status.

## Typography

Font: **Figtree** (weights 400, 500, 600, 700) with the system sans-serif stack as fallback. Observed in the mockup via Google Fonts; self-host or bundle it for production (see Open questions).

| Style | Size / weight | Used for |
| --- | --- | --- |
| page-title | 34 / 700, letter-spacing -0.5px | "Today", "Progress" |
| page-date | 20 / 500, muted | Date next to "Today" |
| screen-title | 24 / 600 | "New Habit", "Choose an Icon" |
| name-input | 26 / 600 | Habit name field |
| card-title | 21 / 600 | Habit name on a card |
| state-heading | 20 / 700 | Empty, nothing-scheduled, and error headings |
| button-primary | 20 / 600 | Save |
| row-label, month-title | 18 / 500 | Form rows, month and year |
| section-label | 17 / 600 | "Your stars", "Record", "Most repeated habits"; ranking names |
| record-row | 17 / 500 | Record labels (values 600) |
| body | 16 / 400, line-height 1.45 | Empty-state descriptions |
| button-soft | 16 / 600 | "Add a habit", "Try again" |
| card-sub, value, count | 15 / 400–600 | Card sub-label, row values, ranking counts |
| chip | 15 / 600 | Date chips |
| nav-label | 14 / 500 (active 600) | Bottom navigation |
| message | 14 / 500 | Validation messages, toast |
| caption | 13 / 500–600 (notes 400, line-height 1.5) | Progress pill, weekday names, "Back to today", footnote |
| calendar-header | 12 / 400, letter-spacing 0.5px, uppercase | MON–SUN header |

Day numbers are 14 / 600 in the week strip and 16 / 400 in the month calendar. Emoji icons are 68 px (form), 38 px (card), 34 px (picker), 24 px (ranking badge), and 64 px (state illustrations).

## Layout

- **Spacing scale:** 4, 8, 12, 16, 24, 32 px (`s1`–`s6`). Use only these steps.
- **Screen padding:** 16 px sides for lists and forms; 24 px for headers and section labels.
- **Header:** 24 px top, 24 px sides, 12 px bottom. Title left, two 40 px round buttons right.
- **Week strip:** 7 equal columns, 2 px gap, 12 px side padding.
- **Content sheet:** white, 32 px rounded top corners, 24 px top and 16 px side padding, sits under the week strip.
- **Cards:** full width, 20 px padding, 12 px gap between cards.
- **Form rows:** 24 px side padding, minimum height 60 px, hairline dividers.
- **Fixed elements:** bottom navigation 88 px high; add button 68 px, 20 px from the right and 104 px from the bottom; Save button 64 px high, 16 px side margins, 24 px from the bottom. Scrolling content keeps 110 px bottom padding so nothing hides behind them.

## Elevation & Depth

Shadows are soft, wide, and tinted indigo, never black. Use only the tokens below.

| Token | Value | Used for |
| --- | --- | --- |
| panel | 0 6px 18px rgba(80,90,150,.10) | Form groups, Progress panels, icon button |
| sheet | 0 -4px 20px rgba(120,120,180,.06) | Habit list sheet |
| nav | 0 -6px 22px rgba(100,110,170,.10) | Bottom navigation |
| fab | 0 10px 22px rgba(123,142,240,.50) | Add button |
| button-primary | 0 10px 22px rgba(15,15,51,.25) | Save button |
| toggle-knob | 0 1px 3px rgba(0,0,0,.20) | Toggle knob |

## Shapes

Everything is rounded. Pick the radius by component type:

| Shape | Radius | Components |
| --- | --- | --- |
| Pill | 999px | Save, soft buttons, toast, progress pill, toggle |
| Circle | 50% | Add button, icon button, swatches, day circles, check circle, ranking badge |
| Sheet | 32px (top corners) | Habit list sheet |
| Card | 26px | Habit cards, panels, form groups, skeleton cards, selected day pill |
| Nav | 28px (top corners) | Bottom navigation |
| Cell | 20px | Icon picker cells |
| Round button | 14px | Header arrow buttons, top-bar buttons |
| Message | 14px | Validation message |
| Chip | 12px | Date chips |
| Bar | 8px | Progress bar (6px for ranking bars) |

## Components

**Buttons**
- *Primary (Save):* ink background, white 20/600 text, pill, 64 px high, indigo-ink shadow. Hover: background `#1B1B4A`.
- *Soft:* accent background, white 16/600 text, pill, 12 × 22 px padding. Used for "Add a habit" and "Try again".
- *Add button (FAB):* 68 px accent circle, white plus (30 px), fab shadow. Hover: scale 1.06.
- *Round button:* 40 px, 14 px radius, chip background, chevron or X icon (18 px). Hover background `#E2E3EE`. In top bars: background `#E6EEFB`, icon `#6F86B5`.

**Habit card:** habit pastel fill, 26 px radius, 20 px padding; emoji (38 px, 56 px wide) · name (21/600, one line with ellipsis) over sub-label (15, muted) · 34 px check circle (2 px `#B7BBC9` outline). Pressed: scale 0.985. **Done:** 62% opacity, title struck through in `#7D8597`, check circle filled `#5FCB71` with border `#4DB961` and a white check, with a short scale pop (1.25).

**Progress row:** pill ("x of y done", chip background, 13/600, text-secondary) · bar (8 px, chip track, accent gradient fill, width animates 0.35 s) · optional "Back to today" link (13/600, accent). When complete, the fill becomes the gold gradient.

**Week strip day:** 38 px circle (chip background, muted 14/600 number) with weekday (13/500, muted) below. *Selected:* soft purple pill (`#BFC6F5`), white number circle, ink text. *Today (not selected):* 2 px accent ring. *Perfect:* gold circle, `#F0B400` 2 px ring, white star (20 px).

**Form controls**
- *Name field:* centered, borderless, 26/600 ink, placeholder `#9A9FB2`, 2 px dashed bottom border (transparent; `#BFC6F5` on focus; `#D9534F` on error).
- *Icon button:* 112 px white circle, panel shadow, 68 px emoji, 30 px accent pencil badge with a 3 px white border at bottom-right. Hover: scale 1.05.
- *Swatch:* 42 px circle, habit fill, 2.5 px habit ring; selected = scale 1.1 and a check.
- *Toggle:* 52 × 30 px pill, `#D1D1DB` off and accent on, 24 px white knob with a small shadow, 0.2 s slide.
- *Date chip:* `#E1E2EE` background, text-secondary 15/600, 12 px radius, 8 × 14 px padding. *Active:* accent background, white text.
- *Form group:* white card, 26 px radius, panel shadow, rows separated by hairlines.
- *Inline calendar:* `#FBFBFE` background, hairline top border; selected day = accent circle with white 600 text.

**Validation message:** 14/500 danger text on `#FDECEC`, 14 px radius, 8 × 14 px padding, full width.

**Icon picker cell:** 1:1 square, 20 px radius, `#F3F3F8` fill, 34 px emoji; hover `#E8EAFB` and scale 1.06; selected `#DDE2FC` fill with a 2.5 px inset accent border. Grid: 5 columns, 12 px gap, 16 px side padding.

**Panel (Progress):** white, 26 px radius, panel shadow, 16 px padding. Rows: label left, bold value right, hairline dividers.

**Calendar day (Progress):** 38 px circle in a 44 px row; number 16, `#6E7488`; perfect = gold circle with white star; today = 2 px accent ring.

**Ranking row:** 44 px badge (habit fill, 24 px emoji) · name (17/600 ink) over a 6 px bar (chip track, accent fill) · count (15/600, text-secondary).

**Bottom navigation:** white, 28 px top radius, 88 px high, nav shadow, two equal tabs with a 28 px icon over a 14/500 label. Inactive `#A4A9BA`; active ink with 600 weight.

**Toast:** ink pill, white 14/500 text, 10 × 18 px padding, centered, 112 px above the bottom; fades and slides up for about 1.8 s.

**States**
- *Empty / error / nothing scheduled:* centered 64 px emoji, 20/700 heading, muted 16 text (line-height 1.45), optional soft button; 48 px vertical padding.
- *Loading:* three 96 px skeleton cards (26 px radius) with a 1.3 s left-to-right shimmer.
- *Interaction states in the mockup:* hover (scale or lighter fill) on buttons, icon cells, swatches, and calendar days; pressed scale on cards; selected states as above.
- *Disabled and keyboard focus:* not defined in the mockup (see Proposed items below).

## Responsive Behavior

- **Design size:** 390 × 844 px. The app is a single column that fills the width up to **440 px**.
- **Phones (viewport 500 px or narrower):** the app fills the full viewport (100% height, no rounded frame, no outer shadow).
- **Wider viewports:** the mockup centers the 440 px column inside a framed device shell. Treating that as the production desktop behavior is **Inferred**; see Open questions.
- **Scrolling:** each screen scrolls inside the column; the header scrolls with content; bottom navigation, add button, and Save stay fixed.
- **Touch targets (Observed sizes):** round buttons 40 px, add button 68 px, swatches 42 px, form rows 60 px, calendar rows 44 px, navigation 88 px. Toggles are 52 × 30 px; day circles 38 px.

## Accessibility

Guardrails for implementation. Contrast ratios are approximate, computed from the Observed hex values against white.

| Pair | Approx. ratio | Note |
| --- | --- | --- |
| ink on white | > 15:1 | Passes |
| text `#2D3748` on white | ≈ 12:1 | Passes |
| muted `#8A8FA3` on white | ≈ 3.2:1 | Below 4.5:1 for small text. Used for sub-labels (15 px) and notes (13 px). |
| white on accent `#7B8EF0` | ≈ 3.0:1 | Below 4.5:1 for 16 px text on soft buttons and active chips. |
| nav inactive `#A4A9BA` on white | ≈ 2.3:1 | Low. Label and icon are paired, but the label is small. |
| white star on gold `#FFCB2F` | ≈ 1.5:1 | Decorative with a darker ring; also announce "perfect day" in text. |

**Proposed fixes (not in the mockup; adopt only if visual fidelity can be traded for accessibility):**
- Secondary text: `#6A6F85` (≈ 5:1) in place of `#8A8FA3` for text under 18 px.
- Text on accent: `#5568D8` (≈ 4.8:1) for the soft button and active chip backgrounds, keeping `#7B8EF0` for non-text uses.
- Keyboard focus: a visible 2 px `#7B8EF0` ring with 2 px offset on every interactive element (the mockup removes the outline from the name field and only changes its underline).
- Disabled: 40% opacity with no hover or press effect.
- Reduced motion: disable the pop, shimmer, and slide effects when the user prefers reduced motion.

**Always:**
- Never rely on color alone: a completed habit also has a check mark and a struck-through title; a perfect day also has a star.
- Give every icon-only button an accessible name (the mockup uses labels such as "Previous week", "Add habit", "Close").
- Keep the date picker inputs reachable by keyboard and screen reader.

## Do's and Don'ts

**Do**
- Use the named tokens and the spacing scale; reuse the seven habit colors exactly.
- Keep screens uncluttered: one clear action per screen, large rounded cards, generous spacing.
- Use soft indigo-tinted shadows and pill shapes for actions.
- Reserve gold for perfect days and full progress.
- Show the chosen icon and color on every place the habit appears (card, ranking badge).

**Don't**
- Don't use pure black text, black shadows, or sharp corners.
- Don't introduce new accent colors, gradients, or radii.
- Don't use habit pastels for text, buttons, or status.
- Don't use gold for anything other than perfect-day and complete-progress states.
- Don't copy the mockup's reviewer toolbar, annotation legend, or device frame into the product.
- Don't add dense tables, tiny tap targets (under 40 px), or decorative effects that are not in this file.

## Agent Prompt Guide

Paste into a UI-generation or coding prompt:

> Build mobile-first screens (390 px reference, max column 440 px) in the Habit Tracker style from DESIGN.md. Font Figtree. Background gradient #F4F0FD → #FFF6EE → #FFFFFF. Ink #0F0F33, text #2D3748, muted #8A8FA3, accent #7B8EF0, gold #FFCB2F for perfect days only, danger #D9534F on #FDECEC. Habit cards use one of seven pastel fills with a large emoji, a 21/600 title, a muted sub-label, and a 34 px check circle; completed cards fade to 62% with a struck-through title and a green check. Use 26 px card radii, pill buttons, indigo-tinted soft shadows, 4/8/12/16/24/32 spacing, a fixed 88 px bottom nav (Today, Progress), and a 68 px accent add button. Keep it clean, cute, and uncluttered. Do not add features, colors, or effects that are not in DESIGN.md.

## Open questions and assumptions

1. **Font delivery.** The mockup loads Figtree from Google Fonts. Decide whether to self-host or bundle it (Inferred: self-host).
2. **Desktop presentation.** The framed 440 px shell on wide screens is a mockup device frame. Confirm whether production should show a centered column, or something else (Inferred: centered column without the device frame).
3. **Accessibility trade-offs.** Confirm whether to adopt the Proposed contrast, focus, disabled, and reduced-motion rules above.
4. **Dark mode.** Not defined; out of scope for the MVP.
5. **Icon set.** The icon source is the developer's decision (see US-01). Icon sizes in this file (68 / 38 / 34 / 24 px) assume emoji-like square glyphs; adjust if another format is chosen.
6. **Weekday strip on very narrow screens.** Seven 38 px circles fit down to about 320 px; behavior below that is not defined.

## Companion preview

Open [design-tokens-preview.html](design-tokens-preview.html) in a browser to see the palette, type scale, spacing and radius scale, and the components in this file.
