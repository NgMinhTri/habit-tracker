import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { parseLocalIsoDate, toLocalIsoDate } from '../../lib/localDate'

interface MonthCalendarProps {
  selectedDate: string
  today: string
  onSelect: (date: string) => void
}

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export function MonthCalendar({ selectedDate, today, onSelect }: MonthCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const selected = parseLocalIsoDate(selectedDate)
    return new Date(selected.getFullYear(), selected.getMonth(), 1)
  })
  const firstWeekday = (visibleMonth.getDay() + 6) % 7
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate()
  const dates = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) =>
      toLocalIsoDate(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1)),
    ),
  ]

  function changeMonth(amount: number) {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + amount, 1))
  }

  return (
    <div className="bg-icon-cell mt-2 rounded-cell p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
          className="bg-chip flex size-11 items-center justify-center rounded-full active:opacity-70"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <h3 className="text-month-title text-ink">
          {visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
          className="bg-chip flex size-11 items-center justify-center rounded-full active:opacity-70"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
      <div className="text-calendar-header text-muted grid grid-cols-7 text-center">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="flex h-8 items-center justify-center">
            {weekday}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {dates.map((date, index) => {
          if (date === null) return <span key={`empty-${index}`} className="size-11" />
          const selected = date === selectedDate
          const isToday = date === today
          return (
            <button
              key={date}
              type="button"
              aria-label={parseLocalIsoDate(date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              aria-pressed={selected}
              onClick={() => onSelect(date)}
              className={`mx-auto flex size-11 items-center justify-center rounded-full text-calendar-day active:opacity-70 ${
                selected ? 'bg-accent text-surface font-semibold' : ''
              } ${isToday && !selected ? 'ring-2 ring-accent' : ''}`}
            >
              {parseLocalIsoDate(date).getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}