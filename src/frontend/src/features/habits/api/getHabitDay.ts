import { apiClient } from '../../../lib/apiClient'
import type { HabitDay } from './types'

export function getHabitDay(date: string, signal?: AbortSignal) {
  return apiClient.get<HabitDay>(`/habits?date=${encodeURIComponent(date)}`, signal)
}