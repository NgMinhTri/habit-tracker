import { test as base } from '@playwright/test'
import { HabitApi } from '../api/habit-api'
import { BottomNavComponent } from '../components/BottomNavComponent'
import { ToastComponent } from '../components/ToastComponent'
import { NewHabitPage } from '../pages/NewHabitPage'
import { ProgressPage } from '../pages/ProgressPage'
import { TodayPage } from '../pages/TodayPage'
import { FIXED_NOW } from '../test-data/clock'
import { resetHabitData } from '../utils/database'

interface HabitTrackerFixtures {
  todayPage: TodayPage
  newHabitPage: NewHabitPage
  progressPage: ProgressPage
  bottomNav: BottomNavComponent
  toast: ToastComponent
  habitApi: HabitApi
  isolatedState: void
}

export const test = base.extend<HabitTrackerFixtures>({
  // Applies to every test: empty habit tables and a fixed browser clock.
  isolatedState: [
    async ({ page }, use) => {
      resetHabitData()
      await page.clock.setFixedTime(new Date(FIXED_NOW))
      await use()
    },
    { auto: true },
  ],
  habitApi: async ({ request }, use) => {
    await use(new HabitApi(request))
  },
  todayPage: async ({ page }, use) => {
    await use(new TodayPage(page))
  },
  newHabitPage: async ({ page }, use) => {
    await use(new NewHabitPage(page))
  },
  progressPage: async ({ page }, use) => {
    await use(new ProgressPage(page))
  },
  bottomNav: async ({ page }, use) => {
    await use(new BottomNavComponent(page))
  },
  toast: async ({ page }, use) => {
    await use(new ToastComponent(page))
  },
})

export { expect } from '@playwright/test'
