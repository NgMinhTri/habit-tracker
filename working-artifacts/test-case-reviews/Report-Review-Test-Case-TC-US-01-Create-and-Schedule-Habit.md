# Test Case Review: TC-US-01-Create-and-Schedule-Habit

## Review Summary

| Item | Value |
| --- | --- |
| Final verdict | Minor Revision Required |
| Reviewed artifact | `working-artifacts/test-cases/TC-US-01-Create-and-Schedule-Habit.md` (Draft, 36 cases, TC_HABIT_001–036) |
| Scope | Functional |
| Review date | 2026-10-17 |

## Reviewed Artifacts

- `working-artifacts/test-cases/TC-US-01-Create-and-Schedule-Habit.md`
- `working-artifacts/user-stories/habit-tracker/US-01-create-and-schedule-habit.md` (AC1–AC11, Rules and Notes)
- Canonical template, standards, and checklist under `.github/skills/testing-design-test-case/` and `.github/skills/testing-review-test-case/`

## Scope

Included: structure against the canonical template, AC and rule traceability, case quality, data, steps, expected results, priority, technique, duplication, and automation flags. Excluded: non-functional coverage (not requested; N/A), test execution, rewriting cases.

## Assumptions and Open Questions

- The artifact's own open questions (Q1, Q2, Q4, Q5, Q6) are carried forward unchanged. They are recorded exclusions, not guessed behavior, so they do not block this review. They must be answered before the artifact leaves Draft.
- Date arithmetic and weekday values in the cases (T = Sat 2026-10-17) were re-checked and are correct.
- Character counts for the 40/41/42-character name data were re-counted and are correct.
- New question from review: when both the name and the schedule are invalid, which error is shown or are both shown? Impact: no case or rule exists (see FINDING-006).

## Findings

| ID | Severity | Category | Evidence | Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FINDING-001 | Medium | Test Steps | Steps that are not user actions or combine actions: TC_HABIT_001 step 3 ("Keep Repeat off and the date 'Today'"), TC_HABIT_005 step 4, TC_HABIT_007 step 3 ("Turn Repeat on; keep Start"), TC_HABIT_032/033 step 1 ("Create a habit with the chosen icon and color"), TC_HABIT_034 step 2, TC_HABIT_035 step 1, TC_HABIT_036 steps 1 and 4 | Steps are not executable as written and not one action each; automation mapping is ambiguous | Split into single actions using the Test Data values; move "keep default" statements to Preconditions or Expected Result | Open |
| FINDING-002 | Medium | Expected Result | Expected results assert states that no step observes: TC_HABIT_003 ("not listed on ... T"), TC_HABIT_007 ("not listed on T+1"), TC_HABIT_010 ("listed on ... T"; step 6 only selects T−5 and T−6), TC_HABIT_006 and TC_HABIT_036 (T+2 and T+3 need next-week navigation inside one compound step) | Part of each expected result cannot be verified by following the steps | Add explicit steps for each date checked, or remove the unverified claim | Open |
| FINDING-003 | Medium | Independence / Atomicity | TC_HABIT_026: step 1 "Trigger the end-date error as in TC_HABIT_025"; four triggers (a–d) bundled in one row with "Run once per trigger" | Violates independent, single-objective cases; failures cannot be isolated; not directly executable | Replace with four independent cases (one per trigger) that each state their own steps; keep Decision Table technique | Open |
| FINDING-004 | Medium | Automation | All 36 cases are `Yes` with no rationale. TC_HABIT_030 compares against an icon count from the undecided icon source (Q3), so its expected result is not deterministic. TC_HABIT_027/029 test data says "or equivalent". Many cases set dates via the native date picker (003, 006, 007, 010, 025, 026, 036) and rely on a fixed clock (A1) | Automation flags may be overstated; handoff to automation will hit flaky or undefined cases | Set TC_HABIT_030 to `No` (or conditional) until Q3 is answered; use concrete icon data once the source is chosen; record the date-picker and clock approach as an assumption | Open |
| FINDING-005 | Low | AI Quality / Assumptions | TC_HABIT_017 expects typing 42 characters keeps only the first 41; the story says only that the field "accepts up to 41 characters". TC_HABIT_035 expects specific defaults after Close; the story says only that values are discarded | Behavior inferred but not listed as an assumption | Add both as assumptions or questions; keep the cases as Draft until confirmed | Open |
| FINDING-006 | Low | Coverage | Not covered: toast auto-dismiss after about 2 seconds (AC1 UI, TC_HABIT_001 asserts "for about 2 seconds" with no step to verify it); end-date calendar previous/next month arrows (AC2 UI); behavior when name and end date are both invalid | Minor UI and rule-precedence gaps | Add an end-date calendar month-navigation case and a toast-dismiss check; ask the product owner about error precedence | Open |
| FINDING-007 | Low | Traceability | TC_HABIT_017 cites "AC1 (UI...)"; the 41-character input limit appears in AC1 and AC4 UI tables. TC_HABIT_019/020 cite only "Rules" | References are valid but not precise | Cite the AC whose UI table states the rule, plus the rule | Open |
| FINDING-008 | Info | Duplication | TC_HABIT_011, 012, 013 and 001, 002 differ by input or trigger path; no true duplicates found | None | Optionally combine 011/013 as one data-driven case | N/A |

## Traceability and Coverage Assessment

### Traceability Summary

| Requirement or acceptance criterion | Covered by | Assessment |
| --- | --- | --- |
| AC1 | TC_HABIT_001, 002, 003, 004, 009, 017, 020 | Complete |
| AC2 | TC_HABIT_005, 006, 007, 008, 009, 010 | Complete |
| AC3 | TC_HABIT_011, 012, 013, 014 | Complete |
| AC4 | TC_HABIT_015, 016, 017, 018 | Complete |
| AC5 | TC_HABIT_021, 022, 023, 024 | Complete |
| AC6 | TC_HABIT_007, 025, 026 | Complete (026 needs split) |
| AC7 | TC_HABIT_027, 028, 029, 030 | Partial (030 depends on Q3) |
| AC8 | TC_HABIT_004, 031 | Complete |
| AC9 | TC_HABIT_032, 033 | Complete |
| AC10 | TC_HABIT_034, 035 | Complete |
| AC11 | TC_HABIT_036 | Complete |

No orphan cases found; every case cites an AC or a rule.

### Coverage Matrix

| Coverage area | Evidence | Assessment |
| --- | --- | --- |
| Positive | TC_HABIT_001, 002, 005, 006, 027, 032 | Complete |
| Negative / invalid input | TC_HABIT_011–014, 016, 021–023, 025 | Complete |
| Boundary | TC_HABIT_007, 015, 016, 017, 018, 019, 025 | Complete |
| Business rule (trim, uniqueness, schedule) | TC_HABIT_003, 006, 010, 018, 022, 023 | Complete |
| State transition | TC_HABIT_009, 014, 028, 031, 035 | Complete |
| Persistence / integration | TC_HABIT_036 | Complete |
| Authorization | N/A, no authentication in the MVP | N/A |
| Non-functional | N/A, scope is functional only | N/A |

## Checklist Results

| Checklist section | Status | Note |
| --- | --- | --- |
| 1 Requirement coverage | Pass | All ACs and rules covered; regression impact on Today/Progress covered by 032, 033 |
| 2 Test design | Pass | EP, BVA, state, decision table, use case applied; see FINDING-003 |
| 3 Test case quality | Partial | ID format and "Verify..." titles pass; steps need work (FINDING-001) |
| 4 Preconditions | Pass | Setup only |
| 5 Test data | Partial | Realistic and boundary data present; "or equivalent" data in 027, 029, 030 |
| 6 Test steps | Partial | FINDING-001, 002 |
| 7 Expected results | Partial | Messages exact and observable; FINDING-002 |
| 8 Priority | Pass | Create, schedule, and persistence flows are Critical; validation is High |
| 9 Technique review | Pass | |
| 10 Non-functional | N/A | Not requested |
| 11 Traceability | Pass | FINDING-007 is minor |
| 12 Duplication | Pass | |
| 13 AI quality | Partial | FINDING-005 |
| 14 Coverage validation | Pass | AC complexity classified in the artifact; output-consistency check not assessable (single run) |
| 15 Automation assessment | Partial | FINDING-004 |
| 16 Report readiness | Pass | |

## Quality Gate

- [x] Canonical template fields were checked: Test Case ID, Title, Test Steps, Expected Result, Requirement, Testing Technique, Priority, Preconditions, Test Data, Automation. All 36 rows have all ten fields; IDs follow `TC_<MODULE>_<NNN>`.
- [x] Traceability and coverage evidence is complete.
- [x] Assumptions and open questions are visible.
- [x] Findings are prioritized and actionable.
- [x] Automation/readiness and clarification checks were completed where applicable.

## Final Verdict

**Minor Revision Required.** Coverage of AC1–AC11 is complete and no critical gap was found. The findings are fixable case-level issues (steps, independence, automation flags). Route revisions to `testing-design-test-case`. The artifact stays Draft until its open questions are answered.

## Addendum 2026-10-17: Schedule Controls Review

Trigger: product clarification that there is no "Do it once" option; Repeat is the only schedule switch (off by default, "Do it once" date row shows Today). With Repeat on, that row is replaced by Start and a "Set end date" switch (off by default); an end date can be chosen only while it is on. Checked against US-01 AC1/AC2, the AC2 mockup, and the New Habit schedule card.

| ID | Severity | Evidence | Resolution |
| --- | --- | --- | --- |
| FINDING-009 | Medium | "One-time" wording in titles of TC_HABIT_001, 003 and the TC_HABIT_009 title/expected result could be read as a selectable schedule option | Titles reworded to "Repeat off"; assumption A6 added; TC_HABIT_009 states the "Do it once" row has no switch of its own |
| FINDING-010 | Medium | TC_HABIT_004 did not assert that Start, Frequency, Set end date, End, and the calendar are hidden by default | Expected result extended |
| FINDING-011 | Medium | No case for Repeat-on defaults (Start Today, Set end date off, no End row or calendar) or for the end date being selectable only while Set end date is on | Added TC_HABIT_042, 043 |
| FINDING-012 | Low | Behavior when an end date is chosen and "Set end date" is then turned off is not stated | Added TC_HABIT_044 under assumption A7; confirm with the product owner |

Verdict unchanged: **Minor Revision Required**. The Frequency row ("Every day", read-only) stays in the cases because the story and mockup show it; the clarification did not mention it, so confirm it remains in scope.
