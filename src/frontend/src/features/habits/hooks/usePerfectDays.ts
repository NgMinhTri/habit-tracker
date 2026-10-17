import { useQuery } from '@tanstack/react-query'
import { getPerfectDays } from '../api/getPerfectDays'

export const perfectDayKeys = {
  all: ['perfect-days'] as const,
  between: (from: string, to: string) => [...perfectDayKeys.all, from, to] as const,
}

export function usePerfectDays(from: string, to: string) {
  return useQuery({
    queryKey: perfectDayKeys.between(from, to),
    queryFn: ({ signal }) => getPerfectDays(from, to, signal),
  })
}