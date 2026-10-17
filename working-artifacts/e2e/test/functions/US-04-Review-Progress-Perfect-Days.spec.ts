/**
 * Traceability : TC_PROGRESS_002 — US-04 AC1 (working-artifacts/test-cases/TC-US-04-Review-Habit-Progress.md)
 * Approach     : A2 (frontend source analysis) confirmed by A1 (live run against the real API + SQLite).
 * Locator source: PerfectDayCalendar gridcells (aria-label "<Month D, YYYY>[, perfect day][, today]").
 * Data         : Daily habit "Meditate" from Oct 1, completed on Oct 5, 9 and 16 only, seeded through the API.
 *                Browser clock fixed to T = Sat 2026-10-17 (see isolatedState fixture).
 * Assumption   : The star glyph is aria-hidden, so "star instead of the number" is verified through the
 *                "perfect day" accessible name plus the absence of the day number in the cell text.
 */
import { expect, test } from '../../src/fixtures/test-fixtures'

const PERFECT_DAYS = [5, 9, 16]
const MONTH_START_DATE = '2026-10-01'

function isoDate(day: number): string {
  return `2026-10-${String(day).padStart(2, '0')}`
}

test.describe('US-04 Review habit progress', () => {
  test('TC_PROGRESS_002 Verify every perfect day in the displayed month is marked with a star', async ({
    habitApi,
    todayPage,
    bottomNav,
    progressPage,
  }) => {
    const meditate = await habitApi.createHabit({ name: 'Meditate', startDate: MONTH_START_DATE, repeats: true })
    for (const day of PERFECT_DAYS) {
      await habitApi.completeHabit(meditate, isoDate(day))
    }
    await todayPage.goto()

    await bottomNav.openProgress()

    await expect(progressPage.monthHeading).toHaveText('October 2026')
    await expect(progressPage.perfectDayCells).toHaveCount(PERFECT_DAYS.length)
    for (const day of PERFECT_DAYS) {
      const perfectCell = progressPage.perfectDayCell(`October ${day}, 2026`)
      await expect(perfectCell).toBeVisible()
      await expect(perfectCell).not.toHaveText(String(day))
    }
    await expect(progressPage.regularDayCell('October 6, 2026')).toHaveText('6')
    await expect(progressPage.regularDayCell('October 15, 2026')).toHaveText('15')
  })
})
