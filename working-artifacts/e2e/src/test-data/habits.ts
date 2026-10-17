import type { HabitSeed } from '../api/habit-api'
import { addDays } from '../utils/dates'
import { TODAY } from './clock'

export interface HabitTestData {
  readonly name: string
  readonly scheduleLabel: string
}

export const OneTimeHabit: HabitTestData = {
  name: 'Drink water',
  scheduleLabel: 'Just once',
}

export const HABIT_ADDED_TOAST = 'Habit added ✨'

export function dailyHabitStartingDaysAgo(name: string, daysAgo: number): HabitSeed {
  return { name, startDate: addDays(TODAY, -daysAgo), repeats: true }
}
