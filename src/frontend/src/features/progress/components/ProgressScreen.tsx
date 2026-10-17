import { HabitBadge } from '../../habits'
import { useProgressSummary } from '../hooks/useProgressSummary'
import { PerfectDayCalendar } from './PerfectDayCalendar'

function RecordPanel({
  perfectDays,
  bestStreak,
  totalHabitsDone,
  unavailable,
}: {
  perfectDays?: number
  bestStreak?: number
  totalHabitsDone?: number
  unavailable: boolean
}) {
  const rows = [
    ['Perfect Days', perfectDays],
    ['Best Streak', bestStreak],
    ['Total Habits Done', totalHabitsDone],
  ] as const

  return (
    <div className="divide-y divide-line overflow-hidden rounded-card bg-surface shadow-panel">
      {rows.map(([label, value]) => {
        const displayValue = unavailable || value === undefined
          ? '–'
          : label === 'Total Habits Done'
            ? String(value)
            : `${value} ${value === 1 ? 'day' : 'days'}`

        return (
          <div
            key={label}
            className="text-record-row flex min-h-[58px] items-center justify-between px-5 text-text"
          >
            <span>{label}</span>
            <strong className="font-semibold text-ink">{displayValue}</strong>
          </div>
        )
      })}
    </div>
  )
}

function RankingPanel({
  ranking,
  isPending,
  isError,
}: {
  ranking: NonNullable<ReturnType<typeof useProgressSummary>['data']>['ranking']
  isPending: boolean
  isError: boolean
}) {
  if (isPending) {
    return (
      <div aria-label="Loading habit ranking" className="overflow-hidden rounded-card bg-surface px-4 shadow-panel">
        {[0, 1, 2].map((row) => (
          <div key={row} aria-hidden="true" className="flex items-center gap-3 border-b border-line py-3 last:border-0">
            <span className="skeleton-shimmer size-11 shrink-0 rounded-full" />
            <span className="min-w-0 flex-1 space-y-2 py-1">
              <span className="skeleton-shimmer block h-4 w-2/3 rounded" />
              <span className="skeleton-shimmer block h-1.5 w-full rounded-bar" />
            </span>
            <span className="skeleton-shimmer h-4 w-12 rounded" />
          </div>
        ))}
      </div>
    )
  }
  if (isError) return <div className="h-2" />
  if (ranking.length === 0) {
    return (
      <div className="rounded-card bg-surface py-7 text-center text-body text-muted shadow-panel">
        Add a habit to see it ranked here.
      </div>
    )
  }

  const highestDays = Math.max(...ranking.map((habit) => habit.completedDays))

  return (
    <ul className="overflow-hidden rounded-card bg-surface px-4 shadow-panel">
      {ranking.map((habit) => {
        const fillPercentage = highestDays === 0 ? 0 : (habit.completedDays / highestDays) * 100

        return (
          <li key={habit.id} className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 border-b border-line py-3 last:border-0">
            <HabitBadge icon={habit.icon} color={habit.color} />
            <div className="min-w-0">
              <p className="truncate text-[17px] font-semibold text-ink">{habit.name}</p>
              <div
                role="progressbar"
                aria-label={`${habit.name} completed days`}
                aria-valuemin={0}
                aria-valuemax={highestDays}
                aria-valuenow={habit.completedDays}
                className="mt-1.5 h-1.5 overflow-hidden rounded-bar bg-chip"
              >
                <span
                  aria-hidden="true"
                  className="block h-full rounded-bar bg-accent"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
            </div>
            <span className="whitespace-nowrap text-[15px] font-semibold text-text-secondary">
              {habit.completedDays} {habit.completedDays === 1 ? 'day' : 'days'}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function ProgressScreen() {
  const { data, isPending, isError } = useProgressSummary()
  const unavailable = isPending || isError

  return (
    <div className="space-y-5 pb-3">
      <header className="px-1 pt-5 pb-1">
        <h1 className="text-page-title text-ink">Progress</h1>
      </header>

      <section aria-labelledby="stars-heading" className="space-y-2">
        <h2 id="stars-heading" className="text-section-label px-5 text-ink">Your stars</h2>
        <PerfectDayCalendar />
      </section>

      <section aria-labelledby="record-heading" className="space-y-2">
        <h2 id="record-heading" className="text-section-label px-5 text-ink">Record</h2>
        <RecordPanel
          perfectDays={data?.perfectDays}
          bestStreak={data?.bestStreak}
          totalHabitsDone={data?.totalHabitsDone}
          unavailable={unavailable}
        />
      </section>

      <section aria-labelledby="ranking-heading" className="space-y-2">
        <h2 id="ranking-heading" className="text-section-label px-5 text-ink">Most repeated habits</h2>
        <RankingPanel ranking={data?.ranking ?? []} isPending={isPending} isError={isError} />
      </section>

      {!unavailable && (
        <p className="text-caption px-5 text-muted">
          {data?.ranking.length
            ? '⭐ A perfect day means every habit scheduled that day is done.'
            : 'Add a habit and complete it to earn your first ⭐.'}
        </p>
      )}
    </div>
  )
}