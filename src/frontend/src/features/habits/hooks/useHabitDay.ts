import { useQuery } from '@tanstack/react-query'
import { getHabitDay } from '../api/getHabitDay'

export const habitKeys = {
  all: ['habits'] as const,
  scheduledOn: (date: string) => [...habitKeys.all, date] as const,
}

export function useHabitDay(date: string) {
  return useQuery({
    queryKey: habitKeys.scheduledOn(date),
    queryFn: ({ signal }) => getHabitDay(date, signal),
  })
}