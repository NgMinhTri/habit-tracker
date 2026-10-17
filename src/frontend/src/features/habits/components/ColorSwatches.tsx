import { Check } from 'lucide-react'
import type { HabitColor } from '../api/types'
import { HABIT_COLORS } from '../habitColors'

interface ColorSwatchesProps {
  value: HabitColor
  onChange: (color: HabitColor) => void
}

export function ColorSwatches({ value, onChange }: Readonly<ColorSwatchesProps>) {
  return (
    <div role="radiogroup" aria-label="Habit color" className="flex items-center justify-between gap-1">
      {HABIT_COLORS.map(({ key, label, fill, ring }) => {
        const selected = key === value
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-label={`${label} color`}
            aria-checked={selected}
            onClick={() => onChange(key)}
            className="flex size-11 shrink-0 items-center justify-center rounded-full active:opacity-80"
          >
            <span
              className={`flex size-[42px] items-center justify-center rounded-full border-[2.5px] text-ink transition-transform ${
                selected ? 'scale-110' : ''
              } ${fill} ${ring}`}
            >
              {selected && <Check aria-hidden="true" className="size-4 stroke-[3]" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}