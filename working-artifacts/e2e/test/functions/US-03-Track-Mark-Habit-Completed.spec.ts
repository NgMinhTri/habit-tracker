/**
 * Traceability : TC_COMPLETION_001 — US-03 AC1 (working-artifacts/test-cases/TC-US-03-Track-Daily-Completion.md)
 * Approach     : A2 (frontend source analysis) confirmed by A1 (live run against the real API + SQLite).
 * Locator source: HabitCard accessible name/aria-pressed, plus computed styles for the visual expectations.
 * Data         : Daily habits "Meditate", "Stretch", "Read" scheduled on T, none completed, seeded through the API.
 * Risk         : The completion circle is aria-hidden; it is located through its lucide check icon
 *                (TodayPage.completionCircle). Colors come from the design tokens in src/frontend/src/index.css
 *                (--color-success #5FCB71, --color-done-title #7D8597).
 */
import { expect, test } from '../../src/fixtures/test-fixtures'
import { dailyHabitStartingDaysAgo } from '../../src/test-data/habits'

const HABIT_STARTED_DAYS_AGO = 3
const COMPLETED_CARD_OPACITY = '0.62'
const DONE_TITLE_COLOR = 'rgb(125, 133, 151)'
const SUCCESS_COLOR = 'rgb(95, 203, 113)'

test.describe('US-03 Track daily completion', () => {
  test('TC_COMPLETION_001 Verify tapping a not-completed card marks the habit completed', async ({
    habitApi,
    todayPage,
  }) => {
    for (const name of ['Meditate', 'Stretch', 'Read']) {
      await habitApi.createHabit(dailyHabitStartingDaysAgo(name, HABIT_STARTED_DAYS_AGO))
    }
    await todayPage.goto()
    await expect(todayPage.habitCards).toHaveCount(3)

    await todayPage.toggleHabit('Meditate')

    const completedCard = todayPage.completedHabitCard('Meditate')
    await expect(completedCard).toBeVisible()
    await expect(completedCard).toHaveCSS('opacity', COMPLETED_CARD_OPACITY)
    const cardName = todayPage.habitCardName(completedCard, 'Meditate')
    await expect(cardName).toHaveCSS('text-decoration-line', 'line-through')
    await expect(cardName).toHaveCSS('color', DONE_TITLE_COLOR)
    await expect(todayPage.completionCircle(completedCard)).toHaveCSS('background-color', SUCCESS_COLOR)
  })
})
