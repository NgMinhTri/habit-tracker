---
name: backend-feature
description: "Implement or extend a Habit Tracker backend feature in .NET: domain entities, application services, repositories, EF mappings, Minimal API endpoints, or backend feature tests. Use when adding backend behavior or a new API resource."
---

# Backend Feature

## Procedure

1. Read `doc/PROJECT_STRUCTURE.md`, especially §§3 and 6. Inspect the closest existing implementation and its tests; `HealthEndpoints` is the API reference, not a feature-service template.
2. Confirm the feature's behavior and API contract against `doc/PROJECT_STRUCTURE.md` §3.6 (validation errors, `DateOnly`, case-insensitive uniqueness, fixed option-set keys). Keep dependencies within the documented layer direction and put each type in the prescribed project/folder.
3. Add or update the Domain entity and its focused Domain tests when there are domain invariants. Inherit `BaseEntity` where the guide requires it.
4. Add the Application repository/service abstractions, service implementation, and sealed record DTOs. Keep persistence and HTTP concerns out of Application; register the service in `Application/DependencyInjection.cs`.
5. Add Infrastructure EF configuration and repository implementation, update `AppDbContext`, and register implementations in `Infrastructure/DependencyInjection.cs`. Create missing folders when this is the first implementation; do not place business rules in Infrastructure.
6. Add an `IEndpointGroup` implementation under Api `Endpoints/`. Map kebab-case plural routes under the group's path (the `/api` prefix is automatic), use typed results and the documented metadata, and return DTOs rather than entities. Return expected validation failures as `TypedResults.ValidationProblem` with camelCase field keys and the story's exact messages.
7. Add representative requests to `HabitTracker4TP.Api.http`. If the schema changed, follow `.github/skills/ef-migration/SKILL.md` rather than editing migration files manually.
8. Add Application tests with substitutes for interfaces; use `.github/skills/write-tests/SKILL.md` for test conventions. Assert each user-story error message by exact text and field key. Run the narrow relevant test/build first, then `.github/skills/verify-done/SKILL.md` when completing the feature.
9. Execute every new or changed repository query against SQLite before reporting done. Unit tests use substitutes, so they cannot catch provider translation errors. Start the API and call each endpoint that reaches the query (`.http` file or `curl.exe`), cover each filter branch, and check the API output for exceptions (see `verify-done` step 4).

## SQLite Provider Rules

The database is SQLite (`Microsoft.EntityFrameworkCore.Sqlite`). Some LINQ that works on other providers fails at runtime here with `NotSupportedException` or a `500`. Check queries against these rules while writing the repository:

| Type / operation | SQLite behavior | Do this instead |
| --- | --- | --- |
| `DateTimeOffset` in `OrderBy`, `<`, `>`, `Min`, `Max` | Not translated (stored as TEXT with offset) | Sort or compare in memory after a filtered query, or map the column with `HasConversion<DateTimeOffsetToBinaryConverter>()` before the first migration when server-side ordering is needed |
| `decimal` in `OrderBy`, comparisons, `Sum`, `Average` | Not translated | Convert to `double` with `HasConversion<double>()`, or aggregate in memory |
| `TimeSpan` / `ulong` comparisons and ordering | Not translated | Convert to `long` ticks with a value converter |
| `DateOnly` | Stored as `TEXT` `yyyy-MM-dd`; `==`, `<`, `<=`, `OrderBy` translate correctly | Use directly for calendar dates (§3.6) |
| Case-insensitive text | `==` follows the column collation | Use `.UseCollation("NOCASE")` on the column; don't call `ToLower()` in queries |
| `string.Equals(..., StringComparison)` and other culture-aware methods | Not translated | Rely on the column collation |

- Prefer `DateOnly` for calendar values and keep `DateTimeOffset` for audit timestamps such as `CreatedAt`. Avoid sorting or filtering by `DateTimeOffset` in SQL.
- Filter in SQL first, then apply untranslatable ordering or projection in memory on the reduced result; never call `ToListAsync()` on an unfiltered table to work around translation.
- Decide value converters before generating the migration that creates the column; changing storage later needs a new migration and data conversion.

## Guardrails

- Check for existing abstractions before adding new ones; preserve public APIs unless the feature requires a change.
- Inject `IClock` for current time in Domain/Application. Respect cancellation tokens on asynchronous operations. Never derive a calendar day from `IClock`; the client sends its local date.
- Do not register feature services in `Program.cs`, query `DbContext` from endpoints, or return EF/domain entities over HTTP.
- Do not report a repository change done on passing unit tests alone; a query counts as verified only after it has run against SQLite without errors.