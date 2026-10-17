import { Outlet } from 'react-router'
import { BottomNav } from './BottomNav'

export function AppLayout() {
  return (
    <div className="bg-app mx-auto flex min-h-dvh max-w-app flex-col">
      <main className="pt-safe flex-1 px-4 pb-[calc(110px+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
