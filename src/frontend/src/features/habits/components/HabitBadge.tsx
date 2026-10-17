import type { HabitColor } from '../api/types'
import { getHabitColor } from '../habitColors'
import { getHabitIcon } from '../habitIcons'

interface HabitBadgeProps {
  icon: string
  color: HabitColor
}

export function HabitBadge({ icon, color }: HabitBadgeProps) {
  const colorOption = getHabitColor(color)

  return (
    <span
      aria-hidden="true"
      className={`flex size-11 shrink-0 items-center justify-center rounded-full text-2xl ${colorOption.fill}`}
    >
      {getHabitIcon(icon)}
    </span>
  )
}