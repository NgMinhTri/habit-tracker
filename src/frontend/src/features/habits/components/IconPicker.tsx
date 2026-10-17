import { ArrowLeft } from 'lucide-react'
import { TopBarButton } from '../../../components/ui/TopBarButton'
import { HABIT_ICONS } from '../habitIcons'

interface IconPickerProps {
  value: string
  onBack: () => void
  onSelect: (icon: string) => void
}

export function IconPicker({ value, onBack, onSelect }: IconPickerProps) {
  return (
    <section className="mx-auto flex min-h-dvh max-w-app flex-col px-4 pt-safe">
      <header className="relative flex h-[72px] items-center justify-center">
        <div className="absolute left-0">
          <TopBarButton label="Back" icon={ArrowLeft} onClick={onBack} />
        </div>
        <h1 className="text-screen-title text-ink">Choose an Icon</h1>
      </header>
      <div
        role="listbox"
        aria-label="Habit icons"
        className="grid grid-cols-5 gap-3 overflow-y-auto px-0 pb-8 pt-3"
      >
        {HABIT_ICONS.map(({ key, glyph }) => (
          <button
            key={key}
            type="button"
            role="option"
            aria-label={key}
            aria-selected={value === key}
            onClick={() => onSelect(key)}
            className={`aspect-square min-h-11 rounded-cell text-[34px] active:scale-[0.97] ${
              value === key
                ? 'bg-icon-cell-selected shadow-[inset_0_0_0_2.5px_var(--color-accent)]'
                : 'bg-icon-cell'
            }`}
          >
            {glyph}
          </button>
        ))}
      </div>
    </section>
  )
}