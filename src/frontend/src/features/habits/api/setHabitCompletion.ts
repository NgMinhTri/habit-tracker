import { apiClient } from '../../../lib/apiClient'

export function setHabitCompletion(habitId: string, date: string, completed: boolean) {
  const path = `/habits/${encodeURIComponent(habitId)}/completions/${encodeURIComponent(date)}`
  return completed ? apiClient.put<void>(path) : apiClient.delete(path)
}