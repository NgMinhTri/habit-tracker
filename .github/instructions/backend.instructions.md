---
description: "Use when creating or modifying .NET backend code in the Habit Tracker 4TP solution."
applyTo: "src/backend/**"
---

# Backend Instructions

- Read `doc/PROJECT_STRUCTURE.md` before changing backend code. Follow its layer dependency rules and place each type in the prescribed project and folder.
- Keep business logic in Application or Domain, persistence details in Infrastructure, and HTTP mapping in Api endpoints. `Program.cs` remains the composition root.
- Follow the local file-scoped namespace, one-public-type-per-file, async, DTO, and endpoint conventions in the project guide. Inject `IClock` for current time in Domain/Application.
- Register services in the owning layer's `DependencyInjection.cs`; do not query `DbContext` from feature endpoints.
- Follow the API & data contracts in `doc/PROJECT_STRUCTURE.md` §3.6: `ValidationProblem` with camelCase field keys and verbatim user-story messages, `DateOnly` calendar dates sent by the client, case-insensitive uniqueness, and stored keys for fixed option sets.
- Warnings are errors. Do not suppress warnings or hand-edit generated EF migrations.
- For repeatable implementation workflows, use `.github/skills/backend-feature/`, `.github/skills/ef-migration/`, `.github/skills/write-tests/`, and `.github/skills/verify-done/` as applicable.