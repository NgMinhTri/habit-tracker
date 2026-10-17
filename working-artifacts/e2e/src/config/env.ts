import path from 'node:path'

const E2E_ROOT = path.resolve(import.meta.dirname, '..', '..')
const REPO_ROOT = path.resolve(E2E_ROOT, '..', '..')

export const API_PORT = Number(process.env.E2E_API_PORT ?? 5272)
export const WEB_PORT = Number(process.env.E2E_WEB_PORT ?? 5273)

export const API_URL = `http://localhost:${API_PORT}`
export const BASE_URL = process.env.E2E_BASE_URL ?? `http://localhost:${WEB_PORT}`

export const API_PROJECT_PATH = path.join(REPO_ROOT, 'src', 'backend', 'src', 'HabitTracker4TP.Api')
export const FRONTEND_PATH = path.join(REPO_ROOT, 'src', 'frontend')

// One throwaway SQLite file per run keeps the "no habits exist" precondition true and leaves habittracker.db untouched.
export const E2E_DB_PATH = (process.env.E2E_DB_PATH ??= path.join(E2E_ROOT, '.tmp', `e2e-${Date.now()}.db`))

export const MOBILE_VIEWPORT = { width: 390, height: 844 }
