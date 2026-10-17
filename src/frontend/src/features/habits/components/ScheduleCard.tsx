import { useState } from 'react'
import { MonthCalendar } from '../../../components/ui/MonthCalendar'
import { Toggle } from '../../../components/ui/Toggle'
import { formatChipDate } from '../../../lib/localDate'

interface ScheduleCardProps {
  today: string
  startDate: string
  endDate: string
  repeats: boolean
  hasEndDate: boolean
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  onRepeatsChange: (repeats: boolean) => void
  onHasEndDateChange: (enabled: boolean) => void
  dateError: string | null
  onScheduleChange: () => void
}

export function ScheduleCard({
  today,
  startDate,
  endDate,
  repeats,
  hasEndDate,
  onStartDateChange,
  onEndDateChange,
  onRepeatsChange,
  onHasEndDateChange,
  dateError,
  onScheduleChange,
}: ScheduleCardProps) {
  const [calendarOpen, setCalendarOpen] = useState(false)

  function handleRepeatChange(enabled: boolean) {
    onScheduleChange()
    onRepeatsChange(enabled)
    if (!enabled) onHasEndDateChange(false)
  }

  function handleHasEndDateChange(enabled: boolean) {
    onScheduleChange()
    onHasEndDateChange(enabled)
    if (enabled) setCalendarOpen(true)
    else setCalendarOpen(false)
  }

  function handleStartChange(value: string) {
    onStartDateChange(value)
    onScheduleChange()
  }

  function handleEndChange(value: string) {
    onEndDateChange(value)
    onScheduleChange()
  }

  return (
    <div>
      <div className="bg-surface overflow-hidden rounded-card shadow-panel">
        <div className="flex min-h-[60px] items-center justify-between px-6">
          <span className="text-row-label text-text">Repeat</span>
          <Toggle checked={repeats} label="Repeat" onChange={handleRepeatChange} />
        </div>
        {repeats ? (
          <>
            <div className="border-line flex min-h-[60px] items-center justify-between border-t px-6">
              <span className="text-row-label text-text">Start</span>
              <label className="relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center">
                <span className="text-chip-label bg-chip text-text-secondary rounded-chip px-[14px] py-2">
                  {formatChipDate(startDate, today)}
                </span>
                <input
                  aria-label="Start date"
                  type="date"
                  value={startDate}
                  onChange={(event) => handleStartChange(event.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>
            <div className="border-line flex min-h-[60px] items-center justify-between border-t px-6">
              <span className="text-row-label text-text">Frequency</span>
              <span className="text-body text-muted">Every day</span>
            </div>
            <div className="border-line flex min-h-[60px] items-center justify-between border-t px-6">
              <span className="text-row-label text-text">Set end date</span>
              <Toggle checked={hasEndDate} label="Set end date" onChange={handleHasEndDateChange} />
            </div>
            {hasEndDate && (
              <>
                <div className="border-line flex min-h-[60px] items-center justify-between border-t px-6">
                  <span className="text-row-label text-text">End</span>
                  <button
                    type="button"
                    aria-expanded={calendarOpen}
                    onClick={() => setCalendarOpen((open) => !open)}
                    className="text-chip-label bg-accent text-surface min-h-11 rounded-chip px-[14px] py-2 active:opacity-80"
                  >
                    {formatChipDate(endDate, today)}
                  </button>
                </div>
                {calendarOpen && (
                  <div className="border-line border-t px-4 pb-4 pt-3">
                    <MonthCalendar
                      selectedDate={endDate}
                      today={today}
                      onSelect={handleEndChange}
                    />
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="border-line flex min-h-[60px] items-center justify-between border-t px-6">
            <span className="text-row-label text-text">Do it once</span>
            <label className="relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center">
              <span className="text-chip-label bg-chip text-text-secondary rounded-chip px-[14px] py-2">
                {formatChipDate(startDate, today)}
              </span>
              <input
                aria-label="Do it once date"
                type="date"
                value={startDate}
                onChange={(event) => handleStartChange(event.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>
        )}
      </div>
      {dateError && (
        <p role="alert" className="text-message bg-danger-soft text-danger mt-3 rounded-message px-[14px] py-2">
          {dateError}
        </p>
      )}
    </div>
  )
}