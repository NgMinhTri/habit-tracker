import { Pencil, X } from 'lucide-react'
import { useState, type SubmitEvent } from 'react'
import { ApiError } from '../../../lib/apiClient'
import { addLocalDays, toLocalIsoDate } from '../../../lib/localDate'
import type { HabitColor } from '../api/types'
import { getHabitIcon } from '../habitIcons'
import { useCreateHabit } from '../hooks/useCreateHabit'
import { ColorSwatches } from './ColorSwatches'
import { ScheduleCard } from './ScheduleCard'

interface NewHabitFormProps {
  icon: string
  onClose: () => void
  onIconOpen: () => void
  onSaved: () => void
}

export function NewHabitForm({ icon, onClose, onIconOpen, onSaved }: Readonly<NewHabitFormProps>) {
  const today = toLocalIsoDate(new Date())
  const [name, setName] = useState('')
  const [color, setColor] = useState<HabitColor>('rose')
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(() => addLocalDays(today, 1))
  const [repeats, setRepeats] = useState(false)
  const [hasEndDate, setHasEndDate] = useState(false)
  const [nameError, setNameError] = useState<string | null>(null)
  const [dateError, setDateError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const createHabit = useCreateHabit()

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setNameError(null)
    setDateError(null)
    setSubmitError(null)

    try {
      await createHabit.mutateAsync({
        name,
        icon,
        color,
        startDate,
        repeats,
        endDate: repeats && hasEndDate ? endDate : null,
      })
      onSaved()
    } catch (error) {
      if (error instanceof ApiError) {
        setNameError(error.problem?.errors?.name?.[0] ?? null)
        setDateError(error.problem?.errors?.endDate?.[0] ?? null)
        setSubmitError(
          error.problem?.errors?.icon?.[0] ?? error.problem?.errors?.color?.[0] ?? null,
        )
      } else {
        setSubmitError('Unable to save habit. Please try again.')
      }
    }
  }

  function handleStartDateChange(date: string) {
    setStartDate(date)
    if (!hasEndDate) setEndDate(addLocalDays(date, 1))
  }

  return (
    <div className="bg-app min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-app flex-col px-4 pt-safe">
        <header className="relative flex h-[64px] shrink-0 items-center justify-center">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="bg-topbar-button text-topbar-button-icon absolute left-0 flex size-11 items-center justify-center rounded-round-button active:opacity-70"
          >
            <X aria-hidden="true" className="size-[18px]" />
          </button>
          <h1 className="text-screen-title text-ink">New Habit</h1>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 pb-[120px]">
          <div className="flex justify-center pt-1">
            <button
              type="button"
              aria-label="Choose an icon"
              onClick={onIconOpen}
              className="shadow-panel relative flex size-28 items-center justify-center rounded-full bg-surface active:scale-[0.98]"
            >
              <span aria-hidden="true" className="text-[68px] leading-none">{getHabitIcon(icon)}</span>
              <span className="bg-accent text-surface absolute -right-0.5 -bottom-0.5 flex size-8 items-center justify-center rounded-full border-[3px] border-surface">
                <Pencil aria-hidden="true" className="size-4" />
              </span>
            </button>
          </div>

          <div>
            <label className="sr-only" htmlFor="habit-name">Habit name</label>
            <input
              id="habit-name"
              name="name"
              autoComplete="off"
              maxLength={41}
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setNameError(null)
                setSubmitError(null)
              }}
              aria-invalid={nameError !== null}
              aria-describedby={nameError ? 'habit-name-error' : undefined}
              placeholder="Name your habit"
              className={`text-name-input text-ink placeholder:text-placeholder w-full border-b-2 border-dashed bg-transparent py-1 text-center outline-none ${
                nameError ? 'border-danger' : 'border-accent-soft focus:border-accent'
              }`}
            />
            {nameError && (
              <p id="habit-name-error" role="alert" className="text-message bg-danger-soft text-danger mt-2 rounded-message px-[14px] py-2">
                {nameError}
              </p>
            )}
            {submitError && (
              <p role="alert" className="text-message bg-danger-soft text-danger mt-2 rounded-message px-[14px] py-2">
                {submitError}
              </p>
            )}
          </div>

          <ColorSwatches
            value={color}
            onChange={(nextColor) => {
              setColor(nextColor)
              setSubmitError(null)
            }}
          />

          <ScheduleCard
            today={today}
            startDate={startDate}
            endDate={endDate}
            repeats={repeats}
            hasEndDate={hasEndDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={(date) => setEndDate(date)}
            onRepeatsChange={setRepeats}
            onHasEndDateChange={setHasEndDate}
            dateError={dateError}
            onScheduleChange={() => setDateError(null)}
          />

          <button
            type="submit"
            disabled={createHabit.isPending}
            className="text-button-primary bg-ink text-surface shadow-button-primary fixed inset-x-4 bottom-[calc(24px+env(safe-area-inset-bottom))] z-10 mx-auto flex h-16 max-w-[408px] items-center justify-center rounded-pill disabled:opacity-60"
          >
            {createHabit.isPending ? 'Saving…' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  )
}