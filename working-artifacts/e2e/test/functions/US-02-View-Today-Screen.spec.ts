/**
 * Traceability : TC_TODAY_001 — US-02 AC1 (working-artifacts/test-cases/TC-US-02-View-Habits-by-Date.md)
 * Approach     : A2 (frontend source analysis) confirmed by A1 (live run against the real API + SQLite).
 * Locator source: src/frontend components (aria-labels, roles, visible text); no application changes needed.
 * Data         : Daily habits "Meditate" and "Stretch" start on T-7, seeded through the API; no completions.
 *                Browser clock fixed to T = Sat 2026-10-17 (see isolatedState fixture).
 * Pending      : The case says today's week-strip day has an accent ring. The app draws that ring only when
 *                today is NOT the selected day, so the ring is not asserted; confirm intended behavior with the
 *                product owner / developer.
 */
import { expect, test } from '../../src/fixtures/test-fixtures'
import { dailyHabitStartingDaysAgo } from '../../src/test-data/habits'

const DAYS_BEFORE_TODAY = 7

test.describe('US-02 View habits by date', () => {
  test('TC_TODAY_001 Verify the Today screen shows the heading, current week, and today\'s habits', async ({
    habitApi,
    todayPage,
    bottomNav,
  }) => {
    await habitApi.createHabit(dailyHabitStartingDaysAgo('Meditate', DAYS_BEFORE_TODAY))
    await habitApi.createHabit(dailyHabitStartingDaysAgo('Stretch', DAYS_BEFORE_TODAY))

    await todayPage.goto()

    await expect(todayPage.heading('Today', 'Oct 17')).toBeVisible()
    await expect(todayPage.weekDayButtons).toHaveCount(7)
    await expect(todayPage.weekDayButton('Monday, Oct 12')).toBeVisible()
    await expect(todayPage.weekDayButton('Sunday, Oct 18')).toBeVisible()
    await expect(todayPage.weekDayButton('Saturday, Oct 17')).toHaveAttribute('aria-pressed', 'true')
    await expect(todayPage.habitCards).toHaveCount(2)
    await expect(todayPage.pendingHabitCard('Meditate')).toBeVisible()
    await expect(todayPage.pendingHabitCard('Stretch')).toBeVisible()
    await expect(todayPage.progressPill).toHaveText('0 of 2 done')
    await expect(todayPage.addHabitButton).toBeVisible()
    await expect(bottomNav.todayTab).toHaveAttribute('aria-current', 'page')
  })
})
