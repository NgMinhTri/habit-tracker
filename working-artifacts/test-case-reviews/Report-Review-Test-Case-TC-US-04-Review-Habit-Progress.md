# Test Case Review: TC-US-04-Review-Habit-Progress

## Review Summary

| Item | Value |
| --- | --- |
| Final verdict | Minor Revision Required |
| Reviewed artifact | `working-artifacts/test-cases/TC-US-04-Review-Habit-Progress.md` (Draft, 24 cases, TC_PROGRESS_001–024) |
| Scope | Functional |
| Review date | 2026-10-17 |

## Reviewed Artifacts

- `working-artifacts/test-cases/TC-US-04-Review-Habit-Progress.md`
- `working-artifacts/user-stories/habit-tracker/US-04-review-habit-progress.md` (AC1–AC5, Rules and Notes)
- Canonical template, standards, and checklist under `.github/skills/testing-design-test-case/` and `.github/skills/testing-review-test-case/`

## Scope

Included: structure against the canonical template, AC and rule traceability, case quality, data, steps, expected results, priority, technique, duplication, and automation flags. Excluded: non-functional coverage (not requested; N/A), test execution, rewriting cases.

## Assumptions and Open Questions

- Artifact questions Q1 (day boundary), Q2 (A–Z tie order permanence), Q3 (month limits), Q4 (loading/failure hook) are carried forward as recorded exclusions. They do not block this review.
- Streak and count expectations were recomputed against the data: story example (6 perfect days, best streak 3), month starts (Oct 1 = Thu, Nov 1 = Sun), and all ranking counts are correct.
- New question from review: which footnote is shown when habits exist but none is completed ("A perfect day means..." from AC4 or "Add a habit and complete it..." from AC5)? Impact: TC_PROGRESS_022 omits the footnote (see FINDING-001).

## Findings

| ID | Severity | Category | Evidence | Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FINDING-001 | Medium | Traceability / Clarification | TC_PROGRESS_022 cites AC4 and AC5. AC5's Given is "no habit has been created", but the case has two habits. Footnote and record behavior for "habits exist, none completed" is not specified in any AC | Wrong AC link; AC5 is covered only by TC_PROGRESS_021; an inferred expected result is not marked | Remove the AC5 reference, mark the zero-record result as an assumption, and ask which footnote applies | Open |
| FINDING-002 | Medium | Coverage | Record statistics are checked almost only with a single habit (TC_PROGRESS_002, 008, 009, 011, 012, 014). Missing: a day that becomes perfect after a habit's end date passes; a habit created later not making earlier days imperfect; a one-time habit sharing a day with a daily habit. Multi-habit cases are only TC_PROGRESS_003 and 013 | Perfect-day derivation across mixed schedules, the core calculation, is under-tested | Add decision-table cases with mixed schedules for perfect days, Perfect Days, and Best Streak | Open |
| FINDING-003 | Medium | Test Data | Counts without dates: TC_PROGRESS_015, 016, 018 ("Meditate completed on 9 dates"), TC_PROGRESS_010 ("on 5 dates"), TC_PROGRESS_024 ("12 habits ... varied counts") | Expected results are not reproducible; automation cannot seed the data | List the exact dates or counts per habit in Test Data | Open |
| FINDING-004 | Medium | Expected Result / Steps | TC_PROGRESS_014 expects stars in both September and October, but the only step is "Open the Progress screen". TC_PROGRESS_019 performs setup through Today steps and a compound step 1 ("complete Meditate on T−1, T−2, and T") | Part of each expected result cannot be checked by following the steps; setup mixed with test steps | Add a month-navigation step to 014; move 019 setup to Preconditions or a fixture | Open |
| FINDING-005 | Low | Coverage | Not covered: today being a perfect day (star plus today ring); long habit name with ellipsis in the ranking (AC4 UI); bottom navigation back to Today; month limits (Q3) | Minor UI gaps | Add a today-perfect case and a long-name ranking case | Open |
| FINDING-006 | Low | Automation | All cases except TC_PROGRESS_023 are `Yes` with no rationale; most need seeded history across months and a fixed clock | Setup cost and flakiness not assessed | Record the seeding approach and a rationale for each `Yes` | Open |
| FINDING-007 | Low | Priority | TC_PROGRESS_002, 010, 015 are Critical for read-only analytics screens; TC_PROGRESS_016 is High but depends on the unconfirmed tie rule (Q2) | Priority slightly above business impact | Consider High for 002, 010, 015; keep 016 but link it to Q2 | Open |
| FINDING-008 | Low | Duplication | TC_PROGRESS_005 and 006 both open the next month; TC_PROGRESS_001 step 2 repeats TC_TODAY_024 | Minor overlap | Combine 005 and 006 into one next-month case | Open |
| FINDING-009 | Info | Non-functional | Not requested | None | N/A: scope is functional only | N/A |

## Traceability and Coverage Assessment

### Traceability Summary

| Requirement or acceptance criterion | Covered by | Assessment |
| --- | --- | --- |
| AC1 | TC_PROGRESS_001, 002, 003, 004, 005, 006, 007 | Complete |
| AC2 | TC_PROGRESS_008, 009, 010, 011, 014, 023 | Complete (023 needs hook, Q4) |
| AC3 | TC_PROGRESS_012, 013 | Complete |
| AC4 | TC_PROGRESS_015, 016, 017, 018, 019, 024 | Complete |
| AC5 | TC_PROGRESS_021 | Complete (022 incorrectly cited) |
| Rules: all-time record and ranking, distinct habits, distinct dates | TC_PROGRESS_008, 010, 019, 020 | Complete |

No orphan cases found.

### Coverage Matrix

| Coverage area | Evidence | Assessment |
| --- | --- | --- |
| Positive | TC_PROGRESS_001, 002, 008, 015 | Complete |
| Negative / empty | TC_PROGRESS_017, 021, 022 | Complete |
| Boundary | TC_PROGRESS_006, 007, 011, 012, 014, 017 | Complete |
| Business rule / decision table | TC_PROGRESS_003, 010, 013, 016 | Partial (FINDING-002) |
| State / loading | TC_PROGRESS_023 | Partial (Q4) |
| Integration with US-03 data | TC_PROGRESS_019, 020 | Complete |
| Non-functional | N/A, scope is functional only | N/A |

## Checklist Results

| Checklist section | Status | Note |
| --- | --- | --- |
| 1 Requirement coverage | Pass | AC1–AC5 mapped; FINDING-002 gap in rule depth |
| 2 Test design | Partial | FINDING-002 |
| 3 Test case quality | Pass | |
| 4 Preconditions | Pass | Setup only |
| 5 Test data | Partial | FINDING-003 |
| 6 Test steps | Partial | FINDING-004 |
| 7 Expected results | Pass | Counts and dates verified correct |
| 8 Priority | Partial | FINDING-007 |
| 9 Technique review | Pass | |
| 10 Non-functional | N/A | Not requested |
| 11 Traceability | Partial | FINDING-001 |
| 12 Duplication | Pass | FINDING-008 minor |
| 13 AI quality | Partial | FINDING-001 |
| 14 Coverage validation | Partial | FINDING-002 |
| 15 Automation assessment | Partial | FINDING-006 |
| 16 Report readiness | Pass | |

## Quality Gate

- [x] Canonical template fields were checked: Test Case ID, Title, Test Steps, Expected Result, Requirement, Testing Technique, Priority, Preconditions, Test Data, Automation. All 24 rows have all ten fields.
- [x] Traceability and coverage evidence is complete.
- [x] Assumptions and open questions are visible.
- [x] Findings are prioritized and actionable.
- [x] Automation/readiness and clarification checks were completed where applicable.

## Final Verdict

**Minor Revision Required.** All ACs are mapped and all computed values are correct. Revise through `testing-design-test-case`: fix the AC5 link, add mixed-schedule perfect-day cases, and give exact data dates. The artifact stays Draft until Q1, Q2, and Q4 are answered.
