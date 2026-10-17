interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-[30px] w-[52px] shrink-0 rounded-pill transition-colors active:opacity-80 ${
        checked ? 'bg-accent' : 'bg-toggle-off'
      }`}
    >
      <span
        className={`absolute top-[3px] left-0 size-6 rounded-full bg-surface shadow-toggle-knob transition-transform duration-200 ${
          checked ? 'translate-x-[25px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}