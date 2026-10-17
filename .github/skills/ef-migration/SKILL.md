---
name: ef-migration
description: "Create, inspect, or apply an EF Core migration for the Habit Tracker SQLite database after a schema change. Use when adding or changing persisted entities or mappings."
---

# EF Core Migration

## Procedure

1. Read `doc/PROJECT_STRUCTURE.md` §3.5 and inspect the current Infrastructure `AppDbContext`, entity configurations, and migration state.
2. Confirm the entity, `DbSet`, and EF configuration are complete, and that the Infrastructure project builds. Migrations are generated artifacts; never hand-edit them.
3. From `src/backend`, add a descriptive migration using the documented project paths:

   ```powershell
   dotnet ef migrations add <Name> -p src/HabitTracker4TP.Infrastructure -s src/HabitTracker4TP.Api -o Persistence/Migrations
   ```

4. Inspect the generated migration and model snapshot for the intended schema change only. If generation is incorrect, correct the model and regenerate rather than patching generated code.
5. Apply the migration when requested or needed for local verification:

   ```powershell
   dotnet ef database update -p src/HabitTracker4TP.Infrastructure -s src/HabitTracker4TP.Api
   ```

6. Run backend build/tests and report the migration name, database update status, and any unavailable prerequisite.

## Tooling

The repository may not have a local `dotnet-ef` tool manifest. Check whether `dotnet ef` is available before use. If it is missing, tell the user the documented setup command (`dotnet tool install --global dotnet-ef`) and ask before installing a global tool.

## Guardrails

- The first entity migration should be named `InitialCreate` when no migration exists.
- Do not commit or create a SQLite database file; `*.db` files are ignored.
- Do not run destructive database commands or remove existing migrations to recover from an error. Diagnose and report the state first.