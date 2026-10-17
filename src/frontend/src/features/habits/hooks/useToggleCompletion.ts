import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setHabitCompletion } from '../api/setHabitCompletion'
import type { HabitDay } from '../api/types'
import { perfectDayKeys } from './usePerfectDays'
import { habitKeys } from './useHabitDay'

interface ToggleCompletionInput {
  habitId: string
  date: string
  completed: boolean
}

interface ToggleCompletionContext {
  previousDay?: HabitDay
}

export function useToggleCompletion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ habitId, date, completed }: ToggleCompletionInput) =>
      setHabitCompletion(habitId, date, completed),
    onMutate: async ({ habitId, date, completed }): Promise<ToggleCompletionContext> => {
      const queryKey = habitKeys.scheduledOn(date)
      await queryClient.cancelQueries({ queryKey })
      const previousDay = queryClient.getQueryData<HabitDay>(queryKey)

      if (previousDay) {
        const completedIds = new Set(previousDay.completedHabitIds)
        if (completed) completedIds.add(habitId)
        else completedIds.delete(habitId)
        queryClient.setQueryData<HabitDay>(queryKey, {
          ...previousDay,
          completedHabitIds: [...completedIds],
        })
      }

      return { previousDay }
    },
    onError: (_error, variables, context) => {
      if (context?.previousDay) {
        queryClient.setQueryData(habitKeys.scheduledOn(variables.date), context.previousDay)
      }
    },
    onSettled: (_data, _error, variables) => {
      void queryClient.invalidateQueries({ queryKey: habitKeys.scheduledOn(variables.date) })
      void queryClient.invalidateQueries({ queryKey: perfectDayKeys.all })
    },
  })
}