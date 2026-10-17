import type { HabitColor } from './api/types'

export const HABIT_COLORS: { key: HabitColor; label: string; fill: string; ring: string }[] = [
  { key: 'rose', label: 'Rose', fill: 'bg-habit-rose', ring: 'border-habit-rose-ring' },
  { key: 'peach', label: 'Peach', fill: 'bg-habit-peach', ring: 'border-habit-peach-ring' },
  { key: 'yellow', label: 'Yellow', fill: 'bg-habit-yellow', ring: 'border-habit-yellow-ring' },
  { key: 'green', label: 'Green', fill: 'bg-habit-green', ring: 'border-habit-green-ring' },
  { key: 'mint', label: 'Mint', fill: 'bg-habit-mint', ring: 'border-habit-mint-ring' },
  { key: 'blue', label: 'Blue', fill: 'bg-habit-blue', ring: 'border-habit-blue-ring' },
  { key: 'lilac', label: 'Lilac', fill: 'bg-habit-lilac', ring: 'border-habit-lilac-ring' },
]

export function getHabitColor(color: HabitColor) {
  return HABIT_COLORS.find((option) => option.key === color) ?? HABIT_COLORS[0]
}