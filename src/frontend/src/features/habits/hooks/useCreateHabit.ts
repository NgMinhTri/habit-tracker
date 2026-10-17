import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createHabit } from '../api/createHabit'
import { habitKeys } from './useHabitDay'
import { perfectDayKeys } from './usePerfectDays'

export function useCreateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: habitKeys.all })
      void queryClient.invalidateQueries({ queryKey: perfectDayKeys.all })
    },
  })
}