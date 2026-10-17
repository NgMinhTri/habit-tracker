# Test Case Review: TC-US-03-Track-Daily-Completion

## Review Summary

| Item | Value |
| --- | --- |
| Final verdict | Minor Revision Required |
| Reviewed artifact | `working-artifacts/test-cases/TC-US-03-Track-Daily-Completion.md` (Draft, 18 cases, TC_COMPLETION_001–018) |
| Scope | Functional |
| Review date | 2026-10-17 |

## Reviewed Artifacts

- `working-artifacts/test-cases/TC-US-03-Track-Daily-Completion.md`
- `working-artifacts/user-stories/habit-tracker/US-03-track-daily-completion.md` (AC1–AC6, Rules and Notes)
- Canonical template, standards, and checklist under `.github/skills/testing-design-test-case/` and `.github/skills/testing-review-test-case/`

## Scope

Included: structure against the canonical template, AC and rule traceability, case quality, data, steps, expected results, priority, technique, duplication, and automation flags. Excluded: non-functional coverage (not requested; N/A), test execution, rewriting cases.

## Assumptions and Open Questions

- Artifact questions Q1 (time zone and day boundary), Q2 (save failure), and Q3 (toast only on transition) are carried forward as recorded exclusions. They are not guessed, so they do not block this review.
- Q1 is a material risk: completion-to-date assignment is the core rule of this story and has no boundary case until Q1 is answered. This is a coverage limitation, recorded as FINDING-005.
- New question from review: when today is a perfect day, does the gold star circle keep or replace today's accent ring? AC4 and US-02 AC1 do not state precedence (see FINDING-003).

## Findings

| ID | Severity | Category | Evidence | Impact | Recommendation | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FINDING-001 | Medium | Expected Result / Steps | Expected results claim states with no observing step: TC_COMPLETION_007 ("Returning to T shows Meditate completed" but steps end on T−1), TC_COMPLETION_009 ("T remains not completed"), TC_COMPLETION_018 ("reload shows the same state" but no reload step) | Part of each expected result cannot be verified by following the steps | Add steps for returning to T and for reload, or remove the claims | Open |
| FINDING-002 | Medium | Unsupported Inference / Automation | TC_COMPLETION_018: "odd number of taps = completed" and "consistent after reload" are not in the story (A3 only); `Yes` for rapid taps is risky because of the press-shrink and pop animations. TC_COMPLETION_006 expects "keeping today's accent ring", which is inferred from US-02 | Expected behavior invented or unconfirmed; likely flaky automation | Mark 018 as inferred (or confirm debounce rule) and set Automation to `No`; add the star-versus-ring precedence as a question | Open |
| FINDING-003 | Medium | Coverage | Not covered: perfect day on a past date (star in the past week plus toast); toast auto-dismiss after about 2 seconds (AC4 UI); a negative check that the toast is not shown when a perfect day is only viewed or an undone day is re-completed (Q3) | Perfect-day feedback is only tested for today | Add a past-date perfect-day case and a toast-dismiss assertion | Open |
| FINDING-004 | Low | Duplication | TC_COMPLETION_013 duplicates TC_TODAY_018 (same state and no-star check on T−3, AC5 appears in both stories). TC_COMPLETION_017 partly repeats TC_COMPLETION_004 plus 015 but adds the persisted-undo objective, so it is kept | Redundant maintenance | Keep one "Nothing scheduled" case; let US-03 keep only the perfect-day assertion | Open |
| FINDING-005 | Low | Clarification / Risk | Q1 (day boundary, time zone) and Q2 (save failure) have no cases | Highest-risk rule of the story has no boundary coverage | Escalate Q1 and Q2 to the product owner; add midnight and failure cases once answered | Open |
| FINDING-006 | Low | Test Steps | TC_COMPLETION_003 chains three taps with cumulative states in one expected-result cell. TC_COMPLETION_015–017 step 2 relies on closing and reopening the browser tab | Per-step result is unclear; persistence approach not stated | Give each tap its own expected result; state how the browser context is reused for persistence | Open |
| FINDING-007 | Info | Rules not UI-reachable | Rule "only habits scheduled on the selected date can be toggled" has no case because unscheduled habits are not listed | None | N/A: not testable through the UI | N/A |
| FINDING-008 | Info | Non-functional | Not requested | None | N/A: scope is functional only | N/A |

## Traceability and Coverage Assessment

### Traceability Summary

| Requirement or acceptance criterion | Covered by | Assessment |
| --- | --- | --- |
| AC1 | TC_COMPLETION_001, 002, 003, 018 | Complete |
| AC2 | TC_COMPLETION_004, 005, 006, 008, 017 | Complete |
| AC3 | TC_COMPLETION_007, 008, 009 | Complete |
| AC4 | TC_COMPLETION_010, 011, 012 | Partial (past dates and toast dismissal, FINDING-003) |
| AC5 | TC_COMPLETION_013 | Complete (duplicate of TC_TODAY_018) |
| AC6 | TC_COMPLETION_015, 016, 017 | Complete |
| Rules: per habit per date, progress = completed ÷ scheduled | TC_COMPLETION_002, 007, 014 | Complete |

No orphan cases found.

### Coverage Matrix

| Coverage area | Evidence | Assessment |
| --- | --- | --- |
| Positive | TC_COMPLETION_001, 002, 010 | Complete |
| Negative / alternate | TC_COMPLETION_004, 005, 012, 013 | Complete |
| Boundary | TC_COMPLETION_011 (one scheduled habit), 012 (N−1 of N) | Complete |
| Business rule / decision table | TC_COMPLETION_007, 014 | Complete |
| State transition | TC_COMPLETION_001, 004, 006, 010 | Complete |
| Persistence | TC_COMPLETION_015, 016, 017 | Complete |
| Time-zone / day boundary | None, Q1 open | Missing (recorded) |
| Non-functional | N/A, scope is functional only | N/A |

## Checklist Results

| Checklist section | Status | Note |
| --- | --- | --- |
| 1 Requirement coverage | Partial | FINDING-003, 005 |
| 2 Test design | Pass | |
| 3 Test case quality | Pass | |
| 4 Preconditions | Pass | Setup only |
| 5 Test data | Pass | Concrete dates and habits |
| 6 Test steps | Partial | FINDING-001, 006 |
| 7 Expected results | Partial | Specific counts, colors, texts; FINDING-001 |
| 8 Priority | Pass | Toggle, persistence, and perfect-day flows are Critical or High |
| 9 Technique review | Pass | |
| 10 Non-functional | N/A | Not requested |
| 11 Traceability | Pass | |
| 12 Duplication | Partial | FINDING-004 |
| 13 AI quality | Partial | FINDING-002 |
| 14 Coverage validation | Partial | Q1 gap |
| 15 Automation assessment | Partial | FINDING-002 |
| 16 Report readiness | Pass | |

## Quality Gate

- [x] Canonical template fields were checked: Test Case ID, Title, Test Steps, Expected Result, Requirement, Testing Technique, Priority, Preconditions, Test Data, Automation. All 18 rows have all ten fields.
- [x] Traceability and coverage evidence is complete.
- [x] Assumptions and open questions are visible.
- [x] Findings are prioritized and actionable.
- [x] Automation/readiness and clarification checks were completed where applicable.

## Final Verdict

**Minor Revision Required.** Calculations, counts, and state transitions in the cases are consistent with the story, and AC1–AC6 are all mapped. Fix the unobserved expected results, the inferred rapid-tap case, and the perfect-day coverage gaps through `testing-design-test-case`. The day-boundary question (Q1) must be answered before the artifact leaves Draft.
