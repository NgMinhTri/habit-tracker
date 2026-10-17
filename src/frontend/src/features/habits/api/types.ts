export interface Habit {
  id: string
  name: string
  icon: string
  color: HabitColor
  startDate: string
  repeats: boolean
  endDate: string | null
}

export interface HabitDay {
  date: string
  hasAnyHabits: boolean
  habits: Habit[]
  completedHabitIds: string[]
}

export interface PerfectDays {
  dates: string[]
}

export interface CreateHabitInput {
  name: string
  icon: string
  color: HabitColor
  startDate: string
  repeats: boolean
  endDate: string | null
}

export type HabitColor = 'rose' | 'peach' | 'yellow' | 'green' | 'mint' | 'blue' | 'lilac'