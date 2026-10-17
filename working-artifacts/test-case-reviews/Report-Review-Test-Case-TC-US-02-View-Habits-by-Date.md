# Test Case Review: TC-US-02-View-Habits-by-Date

## Review Summary

| Item | Value |
| --- | --- |
| Final verdict | Minor Revision Required |
| Reviewed artifact | `working-artifacts/test-cases/TC-US-02-View-Habits-by-Date.md` (Draft, 24 cases, TC_TODAY_001–024) |
| Scope | Functional |
| Review date | 2026-10-17 |

## Reviewed Artifacts

- `working-artifacts/test-cases/TC-US-02-View-Habits-by-Date.md`
- `working-artifacts/user-stories/habit-tracker/US-02-view-habits-by-date.md` (AC1–AC7, Rules and Notes)
- Canonical template, standards, and checklist under `.github/skills/testing-design-test-case/` and `.github/skills/testing-review-test-case/`

## Scope

Included: structure against the canonical template, AC and rule traceability, case quality, data, steps, expected results, priority, technique, duplication, and automation flags. Excluded: non-functional coverage (not requested; N/A), test execution, rewriting cases.

## Assumptions and Open Questions

- The artifact's open questions (Q1 date limits, Q2 load/failure mechanism, Q3 "Back to today" on empty dates, Q4 list order) are carried forward. They are recorded, not guessed, so they do not block this review.
- Q2 limits executability of AC6/AC7 cases (TC_TODAY_020–023) but not their expected results, which the story specifies fully. Verdict is therefore not Blocked.
- Weekday and date arithmetic (T = Sat 2026-10-17, week-strip ranges, year boundary at Jan 2, 2027, T−70 = Aug 8) was re-checked and is correct.

## Findings

| ID | Severity | Category | Evidence | Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FINDING-001 | Medium | Test Steps | Setup written as steps: TC_TODAY_004 steps 1–2 ("Set the device date..."), TC_TODAY_020–023 steps 1–2 (delay/force/restore loading). Vague or compound steps: TC_TODAY_007 step 3 ("Select a date with no scheduled habits"; date T−4 is only in Test Data), TC_TODAY_012 ("tap ... until"), TC_TODAY_014 step 2 (four actions) | Steps are not single user actions and not directly executable | Move clock and loading setup to Preconditions; name concrete dates in steps; split compound steps | Open |
| FINDING-002 | Medium | Executability / Clarification | TC_TODAY_020–023 need a way to delay or fail loading that is undefined (Q2); all four are `No` | AC6 and AC7 cannot be executed or automated; coverage exists on paper only | Ask the developer or product owner what "load" means for on-device data and add a test hook; until then mark AC6/AC7 coverage as conditional | Open |
| FINDING-003 | Medium | Test Data / Automation | Preconditions require completions on arbitrary past dates (TC_TODAY_002, 006, 008, 014, 019) with no stated seeding method (A2 says "UI or fixture"); all other cases are `Yes` with no rationale | Hard to reproduce or automate; setup cost is not assessed | State one seeding approach (for example, local-storage fixture) and a rationale for each `Yes` | Open |
| FINDING-004 | Low | Coverage | TC_TODAY_007 step 3 expects "Back to today" hidden on a non-today date with no habits (follows AC2). No case covers how the user returns to today from such a date, which depends on Q3. Not covered: returning to Today from Progress via bottom navigation, long habit name with ellipsis on a card (AC1 UI) | Small UI and navigation gaps | Add a bottom-navigation return case and a long-name case; link the Q3 answer to TC_TODAY_007 | Open |
| FINDING-005 | Low | Duplication | TC_TODAY_018 and TC_COMPLETION_013 check the same "Nothing scheduled, no star on T−3" outcome. TC_TODAY_024 repeats steps in TC_PROGRESS_001 and TC_HABIT_033. TC_TODAY_017 repeats the add-button step in TC_HABIT_001/004 | Overlap across files | Keep US-02 as owner of the empty-state text and let US-03 assert only the perfect-day rule; keep one navigation case | Open |
| FINDING-006 | Low | Traceability | TC_TODAY_019 cites "AC1 (week strip)", but the perfect-day star rule belongs to US-03 AC4 (displayed here per the Product Brief). TC_TODAY_017 and 024 cite "AC1" for UI elements in the AC1 table. TC_TODAY_009 and 010 Test Data say "Start: T" and "Start: Oct 14", which are not data inputs | References are valid but imprecise; Test Data fields mislabeled | Cite AC1 UI row and US-03 AC4 for 019; relabel Test Data | Open |
| FINDING-007 | Info | Non-functional | Not requested | None | N/A: scope is functional only | N/A |

## Traceability and Coverage Assessment

### Traceability Summary

| Requirement or acceptance criterion | Covered by | Assessment |
| --- | --- | --- |
| AC1 | TC_TODAY_001, 002, 003, 017, 019, 024 | Complete |
| AC2 | TC_TODAY_005, 006, 007, 008 | Complete |
| AC3 | TC_TODAY_009, 010, 011, 012 | Complete |
| AC4 | TC_TODAY_015, 016 | Complete |
| AC5 | TC_TODAY_018 | Complete |
| AC6 | TC_TODAY_020 | Partial (not executable until Q2) |
| AC7 | TC_TODAY_021, 022, 023 | Partial (not executable until Q2) |
| Rules: Mon–Sun week, any date, schedule inclusion, viewing is read-only | TC_TODAY_003, 004, 006, 012, 013, 014 | Complete |

No orphan cases found.

### Coverage Matrix

| Coverage area | Evidence | Assessment |
| --- | --- | --- |
| Positive | TC_TODAY_001, 002, 005, 009, 010 | Complete |
| Negative / error | TC_TODAY_021, 022, 023 | Partial (Q2) |
| Boundary | TC_TODAY_004, 012, 013 | Complete |
| Business rule / decision table | TC_TODAY_003, 006, 007 | Complete |
| State transition | TC_TODAY_011, 022, 023 | Complete |
| Empty states | TC_TODAY_015, 016, 018 | Complete |
| Integration with US-01/US-03 data | TC_TODAY_002, 006, 019 | Complete |
| Non-functional | N/A, scope is functional only | N/A |

## Checklist Results

| Checklist section | Status | Note |
| --- | --- | --- |
| 1 Requirement coverage | Partial | AC6, AC7 depend on Q2 |
| 2 Test design | Pass | |
| 3 Test case quality | Partial | FINDING-001 |
| 4 Preconditions | Partial | Hooks and clock control listed as preconditions (acceptable); seeding undefined |
| 5 Test data | Partial | FINDING-003, 006 |
| 6 Test steps | Partial | FINDING-001 |
| 7 Expected results | Pass | Exact texts, counts, dates; all observable |
| 8 Priority | Pass | |
| 9 Technique review | Pass | |
| 10 Non-functional | N/A | Not requested |
| 11 Traceability | Pass | FINDING-006 minor |
| 12 Duplication | Partial | FINDING-005 |
| 13 AI quality | Pass | No invented rules; Q1–Q4 recorded |
| 14 Coverage validation | Pass | |
| 15 Automation assessment | Partial | FINDING-002, 003 |
| 16 Report readiness | Pass | |

## Quality Gate

- [x] Canonical template fields were checked: Test Case ID, Title, Test Steps, Expected Result, Requirement, Testing Technique, Priority, Preconditions, Test Data, Automation. All 24 rows have all ten fields.
- [x] Traceability and coverage evidence is complete.
- [x] Assumptions and open questions are visible.
- [x] Findings are prioritized and actionable.
- [x] Automation/readiness and clarification checks were completed where applicable.

## Final Verdict

**Minor Revision Required.** Expected results and date arithmetic are correct and every AC is mapped. AC6 and AC7 are covered but cannot be executed until the loading and failure mechanism (Q2) is defined. Route case revisions to `testing-design-test-case`. The artifact stays Draft.
