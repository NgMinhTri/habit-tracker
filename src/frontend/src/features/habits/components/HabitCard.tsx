import { Check } from 'lucide-react'
import type { Habit } from '../api/types'
import { getHabitColor } from '../habitColors'
import { getHabitIcon } from '../habitIcons'

interface HabitCardProps {
  habit: Habit
  completed: boolean
  onToggle: () => void
}

export function HabitCard({ habit, completed, onToggle }: HabitCardProps) {
  const colorOption = getHabitColor(habit.color)

  return (
    <button
      type="button"
      aria-label={`${habit.name}, ${completed ? 'completed' : 'not completed'}`}
      aria-pressed={completed}
      onClick={onToggle}
      className={`flex min-h-[84px] w-full items-center gap-3 rounded-card p-5 text-left transition active:scale-[0.985] ${colorOption.fill} ${completed ? 'opacity-[0.62]' : ''}`}
    >
      <span aria-hidden="true" className="flex w-14 shrink-0 items-center justify-center text-[38px]">
        {getHabitIcon(habit.icon)}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`text-card-title block truncate ${completed ? 'text-done-title line-through' : 'text-text'}`}>
          {habit.name}
        </span>
        <span className="text-card-sub text-muted block">
          {habit.repeats ? 'Every day' : 'Just once'}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`grid size-[34px] shrink-0 place-items-center rounded-full border-2 ${completed ? 'animate-completion-pop border-success-border bg-success text-surface' : 'border-check-outline'}`}
      >
        {completed && <Check aria-hidden="true" className="size-5" strokeWidth={3} />}
      </span>
    </button>
  )
}