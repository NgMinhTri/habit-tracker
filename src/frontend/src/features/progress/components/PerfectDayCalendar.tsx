import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import { usePerfectDays } from '../../habits'
import { parseLocalIsoDate, toLocalIsoDate } from '../../../lib/localDate'

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export function PerfectDayCalendar() {
  const today = toLocalIsoDate(new Date())
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const currentDate = parseLocalIsoDate(today)
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  })
  const firstDate = toLocalIsoDate(visibleMonth)
  const lastDate = toLocalIsoDate(
    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0),
  )
  const { data, isPending, isError } = usePerfectDays(firstDate, lastDate)
  const firstWeekday = (visibleMonth.getDay() + 6) % 7
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate()
  const perfectDates = isPending || isError ? [] : (data?.dates ?? [])

  function changeMonth(amount: number) {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + amount, 1))
  }

  return (
    <section aria-label="Your stars" className="overflow-hidden rounded-card bg-surface shadow-panel">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
          className="flex size-11 items-center justify-center rounded-full text-text active:bg-chip"
        >
          <span className="grid size-9 place-items-center rounded-full">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </span>
        </button>
        <h3 className="text-month-title text-ink">
          {visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
          className="flex size-11 items-center justify-center rounded-full text-text active:bg-chip"
        >
          <span className="grid size-9 place-items-center rounded-full">
            <ChevronRight aria-hidden="true" className="size-5" />
          </span>
        </button>
      </div>
      <div role="grid" aria-label="Monthly calendar" className="grid grid-cols-7 gap-y-0.5 px-3 pb-4 text-center">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} role="columnheader" className="text-calendar-header flex h-8 items-center justify-center text-muted">
            {weekday}
          </div>
        ))}
        {Array.from({ length: firstWeekday }, (_, index) => (
          <span key={`empty-${index}`} aria-hidden="true" className="size-11" />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const date = toLocalIsoDate(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1))
          const perfect = perfectDates.includes(date)
          const isToday = date === today
          const accessibleDate = parseLocalIsoDate(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })

          return (
            <div
              key={date}
              role="gridcell"
              aria-label={`${accessibleDate}${perfect ? ', perfect day' : ''}${isToday ? ', today' : ''}`}
              className="mx-auto grid size-11 place-items-center rounded-full"
            >
              <span
                className={`grid size-[38px] place-items-center rounded-full text-base ${
                  perfect
                    ? 'border-2 border-gold-ring bg-gold text-surface'
                    : 'text-calendar-day'
                } ${isToday ? 'ring-2 ring-accent' : ''}`}
              >
                {perfect ? <Star aria-hidden="true" className="size-5 fill-current" /> : index + 1}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}