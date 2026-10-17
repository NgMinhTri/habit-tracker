# Habit Tracker 4TP

Mobile-first habit tracking web app.

- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS v4 — `src/frontend`
- **Backend**: .NET 10 Minimal API + EF Core + SQLite — `src/backend`

> Agents & contributors: read [doc/PROJECT_STRUCTURE.md](doc/PROJECT_STRUCTURE.md) before writing code.

## Prerequisites

- .NET SDK 10
- Node.js 20+

## Run

Start the API and frontend in separate PowerShell windows, wait for both to respond, and open the frontend:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-all.ps1
```

Options: `-SkipInstall` skips the build and dependency installation, `-NoBrowser` keeps the browser closed, and `-Test` runs backend tests, frontend tests, and lint instead of starting the apps.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-all.ps1 -SkipInstall
powershell -ExecutionPolicy Bypass -File scripts/start-all.ps1 -NoBrowser
powershell -ExecutionPolicy Bypass -File scripts/start-all.ps1 -Test
```

To run each app manually:

```bash
# Backend (http://localhost:5171)
dotnet run --project src/backend/src/HabitTracker4TP.Api

# Frontend (http://localhost:5173, proxies /api to backend)
cd src/frontend
npm install
npm run dev
```

Open on a phone in the same LAN: `http://<your-machine-ip>:5173`.

## Test

```bash
dotnet test src/backend/HabitTracker4TP.slnx

cd src/frontend
npm run test:run
npm run lint
```
