import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { addLocalDays, parseLocalIsoDate, toLocalIsoDate } from '../../../lib/localDate'
import type { HabitDay } from '../api/types'
import { useHabitDay } from '../hooks/useHabitDay'
import { usePerfectDays } from '../hooks/usePerfectDays'
import { useToggleCompletion } from '../hooks/useToggleCompletion'
import { HabitCard } from './HabitCard'

const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getWeekDates(value: string) {
  const date = parseLocalIsoDate(value)
  const mondayOffset = (date.getDay() + 6) % 7
  return Array.from({ length: 7 }, (_, index) => addLocalDays(value, index - mondayOffset))
}

function formatShortDate(value: string) {
  return parseLocalIsoDate(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatWeekday(value: string) {
  return parseLocalIsoDate(value).toLocaleDateString('en-US', { weekday: 'long' })
}

interface TodayHeaderProps {
  readonly heading: string
  readonly date: string
  readonly onPreviousWeek: () => void
  readonly onNextWeek: () => void
}

function TodayHeader({ heading, date, onPreviousWeek, onNextWeek }: TodayHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-2 px-5 pt-5 pb-3">
      <h1 aria-label={`${heading} ${date}`} className="text-page-title min-w-0 truncate text-ink">
        {heading}
        <span className="text-page-date ml-2 font-medium text-muted">{date}</span>
      </h1>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          aria-label="Previous week"
          onClick={onPreviousWeek}
          className="flex size-11 items-center justify-center rounded-round-button bg-chip text-text active:opacity-70"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next week"
          onClick={onNextWeek}
          className="flex size-11 items-center justify-center rounded-round-button bg-chip text-text active:opacity-70"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </header>
  )
}

interface WeekStripProps {
  readonly selectedDate: string
  readonly today: string
  readonly perfectDates: readonly string[]
  readonly onSelect: (date: string) => void
}

function WeekStrip({ selectedDate, today, perfectDates, onSelect }: WeekStripProps) {
  return (
    <fieldset className="grid grid-cols-7 gap-0.5 border-0 px-3 pb-4">
      <legend className="sr-only">Week of selected date</legend>
      {getWeekDates(selectedDate).map((date, index) => {
        const selected = date === selectedDate
        const isCurrentDay = date === today
        const isPerfect = perfectDates.includes(date)

        return (
          <button
            key={date}
            type="button"
            aria-label={`Select ${formatWeekday(date)}, ${formatShortDate(date)}${isPerfect ? ', perfect day' : ''}`}
            aria-pressed={selected}
            onClick={() => onSelect(date)}
            className={`flex min-h-[72px] flex-col items-center gap-1.5 rounded-[26px] px-0.5 py-2 text-[13px] font-medium text-muted active:opacity-70 ${selected ? 'bg-accent-soft text-ink' : ''}`}
          >
            <span
              className={`grid size-[38px] place-items-center rounded-full text-sm font-semibold ${isPerfect ? 'bg-gold text-surface ring-2 ring-inset ring-gold-ring' : selected ? 'bg-surface text-ink' : 'bg-chip text-muted'} ${isCurrentDay && !selected && !isPerfect ? 'ring-2 ring-inset ring-accent' : ''}`}
            >
              {isPerfect ? <Star aria-hidden="true" className="size-5 fill-current" /> : parseLocalIsoDate(date).getDate()}
            </span>
            <span>{WEEKDAY_SHORT[index]}</span>
          </button>
        )
      })}
    </fieldset>
  )
}

interface DayMessageProps {
  readonly emoji: string
  readonly heading: string
  readonly description: string
  readonly actionLabel?: string
  readonly onAction?: () => void
}

function DayMessage({ emoji, heading, description, actionLabel, onAction }: DayMessageProps) {
  return (
    <div className="px-5 py-12 text-center">
      <div aria-hidden="true" className="mb-3 text-[64px] leading-none">
        {emoji}
      </div>
      <h2 className="text-state-heading text-text">{heading}</h2>
      <p className="text-body mt-1 text-muted">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="text-button-soft mt-4 min-h-11 rounded-pill bg-accent px-[22px] py-3 text-surface active:opacity-80"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

function LoadingCards() {
  return (
    <section aria-label="Loading habits">
      <ul aria-label="Habit card placeholders" className="space-y-3">
        {[0, 1, 2].map((item) => (
          <li key={item} aria-hidden="true" className="skeleton-shimmer h-24 rounded-card" />
        ))}
      </ul>
    </section>
  )
}

interface ScheduledHabitsProps {
  readonly habits: HabitDay['habits']
  readonly completedHabitIds: readonly string[]
  readonly isToday: boolean
  readonly onToggle: (habitId: string, completed: boolean) => void
  readonly onBackToToday: () => void
}

function ScheduledHabits({ habits, completedHabitIds, isToday, onToggle, onBackToToday }: ScheduledHabitsProps) {
  const completedCount = habits.filter((habit) => completedHabitIds.includes(habit.id)).length
  const isPerfectDay = habits.length > 0 && completedCount === habits.length
  const progressPercentage = (completedCount / habits.length) * 100

  return (
    <>
      <div className="mb-4 flex items-center gap-3 px-2">
        <span className="rounded-pill bg-chip px-3 py-1 text-[13px] font-semibold text-text-secondary">
          {completedCount} of {habits.length} done
        </span>
        <div
          role="progressbar"
          aria-label="Daily progress"
          aria-valuemin={0}
          aria-valuemax={habits.length}
          aria-valuenow={completedCount}
          className="daily-progress min-w-0 flex-1"
        >
          <div
            aria-hidden="true"
            className={`daily-progress-fill ${isPerfectDay ? 'daily-progress-fill-perfect' : ''}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {!isToday && (
          <button
            type="button"
            onClick={onBackToToday}
            className="min-h-11 shrink-0 text-[13px] font-semibold text-accent active:opacity-70"
          >
            Back to today
          </button>
        )}
      </div>
      <ul className="space-y-3">
        {habits.map((habit) => (
          <li key={habit.id}>
            <HabitCard
              habit={habit}
              completed={completedHabitIds.includes(habit.id)}
              onToggle={() => onToggle(habit.id, completedHabitIds.includes(habit.id))}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

interface HabitDayContentProps {
  readonly day: HabitDay | undefined
  readonly isPending: boolean
  readonly isError: boolean
  readonly isToday: boolean
  readonly onRetry: () => void
  readonly onAddHabit: () => void
  readonly onBackToToday: () => void
  readonly onToggle: (habitId: string, completed: boolean) => void
}

function HabitDayContent({
  day,
  isPending,
  isError,
  isToday,
  onRetry,
  onAddHabit,
  onBackToToday,
  onToggle,
}: HabitDayContentProps) {
  if (isPending) return <LoadingCards />
  if (isError) {
    return (
      <div role="alert">
        <DayMessage
          emoji="🙈"
          heading="Couldn't load your habits"
          description="Something went wrong on our side. Check your connection and try again."
          actionLabel="Try again"
          onAction={onRetry}
        />
      </div>
    )
  }
  if (!day) return null
  if (!day.hasAnyHabits) {
    return (
      <DayMessage
        emoji="🌱"
        heading="No habits yet"
        description="Plant your first habit and tick it off every day."
        actionLabel="Add a habit"
        onAction={onAddHabit}
      />
    )
  }
  if (day.habits.length === 0) {
    return (
      <DayMessage
        emoji="🌤️"
        heading="Nothing scheduled"
        description="You have no habits on this day. Enjoy the break!"
      />
    )
  }
  return (
    <ScheduledHabits
      habits={day.habits}
      completedHabitIds={day.completedHabitIds}
      isToday={isToday}
      onToggle={onToggle}
      onBackToToday={onBackToToday}
    />
  )
}

interface TodayScreenProps {
  readonly onToast: (message: string) => void
}

export function TodayScreen({ onToast }: TodayScreenProps) {
  const navigate = useNavigate()
  const today = toLocalIsoDate(new Date())
  const [selectedDate, setSelectedDate] = useState(today)
  const { data, isPending, isError, refetch } = useHabitDay(selectedDate)
  const weekDates = getWeekDates(selectedDate)
  const { data: perfectDays } = usePerfectDays(weekDates[0], weekDates[6])
  const toggleCompletion = useToggleCompletion()
  const isToday = selectedDate === today
  const heading = isToday ? 'Today' : formatWeekday(selectedDate)

  function openNewHabit() {
    void navigate('/habits/new')
  }

  function toggleHabit(habitId: string, completed: boolean) {
    const completedCount = data?.habits.filter((habit) => data.completedHabitIds.includes(habit.id)).length ?? 0
    const nextCompletedCount = completedCount + (completed ? -1 : 1)
    const willBePerfect = !completed && Boolean(data?.habits.length) && nextCompletedCount === data?.habits.length

    toggleCompletion.mutate(
      { habitId, date: selectedDate, completed: !completed },
      {
        onSuccess: () => {
          if (willBePerfect) onToast('Perfect day! ⭐')
        },
        onError: () => onToast("Couldn't save your change. Try again."),
      },
    )
  }

  return (
    <section className="-mx-4 -mt-2 flex min-h-full flex-col">
      <TodayHeader
        heading={heading}
        date={formatShortDate(selectedDate)}
        onPreviousWeek={() => setSelectedDate((date) => addLocalDays(date, -7))}
        onNextWeek={() => setSelectedDate((date) => addLocalDays(date, 7))}
      />
      <WeekStrip
        selectedDate={selectedDate}
        today={today}
        perfectDates={perfectDays?.dates ?? []}
        onSelect={setSelectedDate}
      />
      <div className="mt-1 flex-1 rounded-t-sheet bg-surface px-4 pt-6 shadow-sheet">
        <div className="max-h-[calc(100dvh-430px)] overflow-y-auto overscroll-contain">
          <HabitDayContent
            day={data}
            isPending={isPending}
            isError={isError}
            isToday={isToday}
            onRetry={() => void refetch()}
            onAddHabit={openNewHabit}
            onBackToToday={() => setSelectedDate(today)}
            onToggle={toggleHabit}
          />
        </div>
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(104px+env(safe-area-inset-bottom))] z-10 mx-auto flex max-w-app justify-end px-5">
        <button
          type="button"
          aria-label="Add a habit"
          onClick={openNewHabit}
          className="shadow-fab pointer-events-auto flex size-[68px] items-center justify-center rounded-full bg-accent text-surface active:scale-95"
        >
          <Plus aria-hidden="true" className="size-8" />
        </button>
      </div>
    </section>
  )
}