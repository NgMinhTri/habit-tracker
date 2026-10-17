import { DatabaseSync } from 'node:sqlite'
import { E2E_DB_PATH } from '../config/env'

const DB_BUSY_TIMEOUT_MS = 5000

// Habit names are unique server-wide and the API has no delete endpoint, so each test starts from empty tables.
export function resetHabitData(): void {
  const database = new DatabaseSync(E2E_DB_PATH)
  try {
    database.exec(`PRAGMA busy_timeout = ${DB_BUSY_TIMEOUT_MS}; DELETE FROM HabitCompletions; DELETE FROM Habits;`)
  } finally {
    database.close()
  }
}
