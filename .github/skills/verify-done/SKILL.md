---
name: verify-done
description: "Run the Habit Tracker 4TP completion checks, start the app, and test it in a browser before reporting a backend/frontend change done. Use after implementation, when asked to test, or when diagnosing quality-gate failures."
---

# Verify Done

## Procedure

1. Read the relevant part of `doc/PROJECT_STRUCTURE.md` and identify the changed slice. Run the narrowest useful test or build first when available.
2. For a full completion check, run from the repository root:

   ```powershell
   dotnet build src/backend/HabitTracker4TP.slnx
   dotnet test src/backend/HabitTracker4TP.slnx
   npm --prefix src/frontend run lint
   npm --prefix src/frontend run test:run
   npm --prefix src/frontend run build
   ```

3. Review each result. Backend build must have zero warnings; treat warnings as failures. Do not suppress diagnostics to make a gate pass.
   - If the build fails with `MSB3027` because a running `HabitTracker4TP.Api` process locks `bin/Debug`, that is an environment lock, not a code failure: restart the API (step 4) or build/test with `-c Release`.
4. **Run the app successfully.** Unit tests mock the database, so the real API + SQLite + frontend must be exercised:
   - Start the API as a background process: `dotnet run --project src/backend/src/HabitTracker4TP.Api --launch-profile http` (Development applies pending migrations). If an older API instance is running, restart it so the new code is loaded.
   - Start the frontend as a background process: `npm --prefix src/frontend run dev` (http://localhost:5173, proxies `/api`).
   - Smoke-check: `GET http://localhost:5171/api/health` returns `healthy`, and every changed endpoint responds through the proxy (`http://localhost:5173/api/...`) without a `500`. On a `500`, read the API terminal output for the exception, fix it, restart the API, and recheck.
   - Do not stop processes you did not start without telling the user; never delete `habittracker.db`.
5. **Test in the browser** with the Playwright MCP server (`playwright` in `.vscode/mcp.json`):
   - Load the Playwright browser tools first. If they are unavailable, tell the user to start the `playwright` MCP server and enable its tools, run the AC requests over HTTP as a fallback, and report browser testing as skipped.
   - Resize the viewport to 390×844 and open http://localhost:5173.
   - For each AC, perform the Given/When/Then steps as a user would (tap, type, press Enter, pick dates), then use page snapshots to assert exact labels and messages from the UI table and where they appear, and that errors clear as described.
   - Take a screenshot of each AC state and compare it with the story's `ACn-*.png` (layout, colors, states, text).
   - For persistence ACs, reload the page and restart the API, then confirm the data is still shown.
   - Check the browser console for errors. Use unique test data (for example a random suffix) so reruns don't collide with existing records.
6. If a check fails, fix only failures attributable to the current change and rerun the same focused check (including the browser step). Do not expand into unrelated cleanup.
7. Report commands run and pass/fail status, the running app URLs, and browser results per AC. Clearly call out skipped checks, environment/tooling blockers, and failures that appear pre-existing.
8. For user-story work, also report the AC checklist: for each AC, the passing test(s) tagged with its ID (`dotnet test --filter AC=US01-AC3`, or the `US01-AC3` Vitest name) and its browser result. Mark an AC done only when behavior, UI, and messages all match.

## Guardrails

- Do not claim a check passed unless it completed successfully. Do not report a feature done when it has only passed unit tests and was never run.
- Leave the API and frontend running at the end so the user can try the feature, and say which terminals they run in.
- Do not install tools or packages as an incidental part of verification without user authorization.
- Use PowerShell-compatible commands; avoid chaining with `&&`.