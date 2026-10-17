import { apiClient } from '../../../lib/apiClient'

export interface HealthResponse {
  status: 'healthy' | 'degraded'
  databaseConnected: boolean
  timestamp: string
}

export function getHealth(signal?: AbortSignal) {
  return apiClient.get<HealthResponse>('/health', signal)
}
