import type { HabitColor } from '../../habits/api/types'

export interface HabitRankingItem {
  id: string
  name: string
  icon: string
  color: HabitColor
  completedDays: number
}

export interface ProgressSummary {
  perfectDays: number
  bestStreak: number
  totalHabitsDone: number
  ranking: HabitRankingItem[]
}