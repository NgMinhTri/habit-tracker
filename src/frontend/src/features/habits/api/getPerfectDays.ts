import { apiClient } from '../../../lib/apiClient'
import type { PerfectDays } from './types'

export function getPerfectDays(from: string, to: string, signal?: AbortSignal) {
  const query = new URLSearchParams({ from, to })
  return apiClient.get<PerfectDays>(`/perfect-days?${query}`, signal)
}