import { ChartColumn, House, type LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Today', icon: House },
  { to: '/progress', label: 'Progress', icon: ChartColumn },
]

export function BottomNav() {
  return (
    <nav
      aria-label="Main"
      className="rounded-t-nav bg-surface shadow-nav fixed inset-x-0 bottom-0 z-10 mx-auto h-[calc(88px+env(safe-area-inset-bottom))] max-w-app px-10 pt-2.5 pb-[calc(14px+env(safe-area-inset-bottom))]"
    >
      <ul className="grid h-full grid-cols-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `text-nav-label flex h-full min-h-11 flex-col items-center justify-center gap-1 active:opacity-70 ${
                  isActive ? 'text-ink font-semibold' : 'text-nav-inactive'
                }`
              }
            >
              <Icon aria-hidden="true" className="size-7" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
