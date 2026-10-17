import { apiClient } from '../../../lib/apiClient'
import type { CreateHabitInput, Habit } from './types'

export function createHabit(input: CreateHabitInput) {
  return apiClient.post<Habit>('/habits', input)
}