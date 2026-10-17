import type { LucideIcon } from 'lucide-react'

interface TopBarButtonProps {
  label: string
  icon: LucideIcon
  onClick: () => void
}

export function TopBarButton({ label, icon: Icon, onClick }: TopBarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="bg-topbar-button text-topbar-button-icon flex size-11 items-center justify-center rounded-round-button active:opacity-70"
    >
      <Icon aria-hidden="true" className="size-[18px]" />
    </button>
  )
}