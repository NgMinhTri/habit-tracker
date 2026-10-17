import { useQuery } from '@tanstack/react-query'
import { getProgressSummary } from '../api/getProgressSummary'

export const progressKeys = {
  all: ['progress'] as const,
  summary: () => [...progressKeys.all, 'summary'] as const,
}

export function useProgressSummary() {
  return useQuery({
    queryKey: progressKeys.summary(),
    queryFn: ({ signal }) => getProgressSummary(signal),
    refetchOnMount: 'always',
  })
}