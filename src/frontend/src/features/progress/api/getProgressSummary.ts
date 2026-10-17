import { apiClient } from '../../../lib/apiClient'
import type { ProgressSummary } from './types'

export function getProgressSummary(signal?: AbortSignal) {
  return apiClient.get<ProgressSummary>('/progress', signal)
}