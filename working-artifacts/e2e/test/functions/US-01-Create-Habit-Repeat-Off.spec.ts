/**
 * Traceability : TC_HABIT_001 — US-01 AC1 (working-artifacts/test-cases/TC-US-01-Create-and-Schedule-Habit.md)
 * Approach     : A2 (frontend source analysis) confirmed by A1 (live run against the real API + SQLite).
 * Locator source: src/frontend components (aria-labels, roles, visible text); no application changes needed.
 * Environment  : playwright.config.ts starts the API and frontend on dedicated ports with a fresh SQLite DB,
 *                so the "no habits exist" precondition holds on every run.
 * Assumptions  : The source test case is still Draft; steps follow it as written. The browser clock is fixed
 *                (see isolatedState fixture) and each test starts from empty habit tables.
 * Pending      : The ~2s toast auto-dismiss is not asserted (not part of TC_HABIT_001's steps; review FINDING-006).
 */
import { expect, test } from '../../src/fixtures/test-fixtures'
import { HABIT_ADDED_TOAST, OneTimeHabit } from '../../src/test-data/habits'

test.describe('US-01 Create and schedule a habit', () => {
  test('TC_HABIT_001 Verify a habit with Repeat off (one-time) is created when Save is tapped', async ({
    todayPage,
    newHabitPage,
    toast,
  }) => {
    await todayPage.goto()
    await expect(todayPage.noHabitsHeading).toBeVisible()

    await todayPage.openNewHabit()
    await expect(newHabitPage.title).toBeVisible()
    await newHabitPage.enterName(OneTimeHabit.name)
    await newHabitPage.save()

    await expect(newHabitPage.title).toBeHidden()
    await expect(todayPage.pendingHabitCard(OneTimeHabit.name)).toBeVisible()
    await expect(todayPage.habitCardSubLabel(OneTimeHabit.name, OneTimeHabit.scheduleLabel)).toBeVisible()
    await expect(toast.root).toHaveText(HABIT_ADDED_TOAST)
  })
})
