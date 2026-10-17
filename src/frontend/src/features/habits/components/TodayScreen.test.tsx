import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { HomePage } from '../../../pages/HomePage'
import { addLocalDays, parseLocalIsoDate, toLocalIsoDate } from '../../../lib/localDate'
import { mockFetchResponse, renderWithProviders } from '../../../test/utils'

const habit = {
  id: 'habit-1',
  name: 'Morning run',
  icon: 'running',
  color: 'mint' as const,
  startDate: '2026-10-17',
  repeats: true,
  endDate: null,
}

function shortDate(value: string) {
  return parseLocalIsoDate(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function weekday(value: string) {
  return parseLocalIsoDate(value).toLocaleDateString('en-US', { weekday: 'long' })
}

function selectDayLabel(value: string) {
  return `Select ${weekday(value)}, ${shortDate(value)}`
}

function mockDays(
  hasAnyHabits: boolean,
  includeHabit: boolean,
  initiallyCompleted = false,
  failSave = false,
) {
  const completedByDate = new Map<string, Set<string>>()
  const today = toLocalIsoDate(new Date())
  if (initiallyCompleted) completedByDate.set(today, new Set([habit.id]))

  vi.stubGlobal(
    'fetch',
    vi.fn((input: string | URL | Request, init?: RequestInit) => {
      const url = new URL(String(input), 'http://localhost')
      if (url.pathname === '/api/perfect-days') {
        const from = url.searchParams.get('from') ?? ''
        const to = url.searchParams.get('to') ?? ''
        const dates = [...completedByDate]
          .filter(([date, completedIds]) => date >= from && date <= to && completedIds.has(habit.id))
          .map(([date]) => date)
        return Promise.resolve(mockFetchResponse({ dates }))
      }

      const completionDate = url.pathname.match(/\/completions\/([^/]+)$/)?.[1]
      if (completionDate && init?.method === 'PUT') {
        if (failSave) return Promise.resolve(mockFetchResponse({ title: 'Unavailable' }, { status: 503 }))
        const completedIds = completedByDate.get(completionDate) ?? new Set<string>()
        completedIds.add(habit.id)
        completedByDate.set(completionDate, completedIds)
        return Promise.resolve(new Response(null, { status: 204 }))
      }
      if (completionDate && init?.method === 'DELETE') {
        const completedIds = completedByDate.get(completionDate) ?? new Set<string>()
        completedIds.delete(habit.id)
        completedByDate.set(completionDate, completedIds)
        return Promise.resolve(new Response(null, { status: 204 }))
      }

      const date = url.searchParams.get('date') ?? ''
      return Promise.resolve(mockFetchResponse({
        date,
        hasAnyHabits,
        habits: includeHabit ? [habit] : [],
        completedHabitIds: [...(completedByDate.get(date) ?? [])],
      }))
    }),
  )
}

function renderHome() {
  return renderWithProviders(<HomePage />)
}

describe('TodayScreen', () => {
  it('US02-AC1 shows today, the week, progress, and scheduled habits', async () => {
    const today = toLocalIsoDate(new Date())
    mockDays(true, true)
    renderHome()

    expect(await screen.findByRole('heading', { name: `Today ${shortDate(today)}` })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^Select / })).toHaveLength(7)
    expect(screen.getByRole('button', { name: selectDayLabel(today) })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(await screen.findByText('0 of 1 done')).toBeInTheDocument()
    expect(screen.getByText('Morning run')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Morning run, not completed' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('US02-AC2 selects another date and offers a return to today', async () => {
    const user = userEvent.setup()
    const nextDay = addLocalDays(toLocalIsoDate(new Date()), 1)
    mockDays(true, true)
    renderHome()

    await user.click(await screen.findByRole('button', { name: selectDayLabel(nextDay) }))

    expect(await screen.findByRole('heading', { name: `${weekday(nextDay)} ${shortDate(nextDay)}` }))
      .toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back to today' })).toBeInTheDocument()
    expect(screen.getByText('Morning run')).toBeInTheDocument()
  })

  it('US02-AC3 moves by whole weeks and returns to today', async () => {
    const user = userEvent.setup()
    const today = toLocalIsoDate(new Date())
    const priorWeek = addLocalDays(today, -7)
    mockDays(true, true)
    renderHome()

    await user.click(await screen.findByRole('button', { name: 'Previous week' }))
    expect(await screen.findByRole('heading', { name: `${weekday(priorWeek)} ${shortDate(priorWeek)}` }))
      .toBeInTheDocument()
    expect(screen.getByRole('button', { name: selectDayLabel(priorWeek) })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.click(screen.getByRole('button', { name: 'Back to today' }))
    expect(await screen.findByRole('heading', { name: `Today ${shortDate(today)}` })).toBeInTheDocument()
  })

  it('US02-AC4 shows the first-visit empty state and opens habit creation', async () => {
    const user = userEvent.setup()
    mockDays(false, false)
    renderWithProviders(<HomePage />, {
      routes: [
        { path: '/', element: <HomePage /> },
        { path: '/habits/new', element: <p>New habit form</p> },
      ],
    })

    expect(await screen.findByText('No habits yet')).toBeInTheDocument()
    expect(screen.getByText('Plant your first habit and tick it off every day.')).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'Add a habit' })[0])
    expect(await screen.findByText('New habit form')).toBeInTheDocument()
  })

  it('US02-AC5 distinguishes a date with no scheduled habits', async () => {
    mockDays(true, false)
    renderHome()

    expect(await screen.findByText('Nothing scheduled')).toBeInTheDocument()
    expect(screen.getByText('You have no habits on this day. Enjoy the break!')).toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('US02-AC6 shows three skeleton cards while the day is loading', async () => {
    let resolveDayFetch!: (response: Response) => void
    vi.stubGlobal(
      'fetch',
      vi.fn((input: string | URL | Request) => {
        const url = new URL(String(input), 'http://localhost')
        if (url.pathname === '/api/perfect-days') {
          return Promise.resolve(mockFetchResponse({ dates: [] }))
        }
        return new Promise<Response>((resolve) => {
          resolveDayFetch = resolve
        })
      }),
    )
    renderHome()

    const loading = screen.getByRole('region', { name: 'Loading habits' })
    const placeholders = within(loading).getByRole('list', { name: 'Habit card placeholders' })
    expect(within(placeholders).getAllByRole('listitem', { hidden: true })).toHaveLength(3)
    resolveDayFetch(
      mockFetchResponse({
        date: toLocalIsoDate(new Date()),
        hasAnyHabits: true,
        habits: [habit],
        completedHabitIds: [],
      }),
    )
    expect(await screen.findByText('Morning run')).toBeInTheDocument()
  })

  it('US02-AC7 retries a failed day request', async () => {
    const user = userEvent.setup()
    const today = toLocalIsoDate(new Date())
    let dayRequests = 0
    const fetchMock = vi.fn((input: string | URL | Request) => {
      const url = new URL(String(input), 'http://localhost')
      if (url.pathname === '/api/perfect-days') return Promise.resolve(mockFetchResponse({ dates: [] }))
      dayRequests += 1
      if (dayRequests === 1) return Promise.resolve(mockFetchResponse({ title: 'Unavailable' }, { status: 503 }))
      return Promise.resolve(
        mockFetchResponse({ date: today, hasAnyHabits: true, habits: [habit], completedHabitIds: [] }),
      )
    })
    vi.stubGlobal('fetch', fetchMock)
    renderHome()

    expect(await screen.findByRole('heading', { name: "Couldn't load your habits" })).toBeInTheDocument()
    expect(
      screen.getByText('Something went wrong on our side. Check your connection and try again.'),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByText('Morning run')).toBeInTheDocument()
  })

  it('US03-AC1 marks a habit complete and updates daily progress', async () => {
    const user = userEvent.setup()
    mockDays(true, true)
    renderHome()

    await user.click(await screen.findByRole('button', { name: 'Morning run, not completed' }))

    expect(await screen.findByText('1 of 1 done')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Morning run, completed' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('progressbar', { name: 'Daily progress' })).toHaveAttribute('aria-valuenow', '1')
  })

  it('US03-AC2 undoes a completion and removes the perfect-day star', async () => {
    const user = userEvent.setup()
    const today = toLocalIsoDate(new Date())
    mockDays(true, true, true)
    renderHome()

    expect(await screen.findByRole('button', { name: `${selectDayLabel(today)}, perfect day` })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Morning run, completed' }))

    expect(await screen.findByText('0 of 1 done')).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: selectDayLabel(today) })).toBeInTheDocument()
  })

  it('US03-AC3 keeps completion state specific to each selected date', async () => {
    const user = userEvent.setup()
    const today = toLocalIsoDate(new Date())
    const nextDay = addLocalDays(today, 1)
    mockDays(true, true, true)
    renderHome()

    await user.click(await screen.findByRole('button', { name: selectDayLabel(nextDay) }))

    expect(await screen.findByText('0 of 1 done')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Morning run, not completed' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('US03-AC4 shows the perfect-day toast, full bar, and star', async () => {
    const user = userEvent.setup()
    const today = toLocalIsoDate(new Date())
    mockDays(true, true)
    renderHome()

    await user.click(await screen.findByRole('button', { name: 'Morning run, not completed' }))

    expect(await screen.findByText('Perfect day! ⭐')).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: `${selectDayLabel(today)}, perfect day` })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'Daily progress' })).toHaveAttribute('aria-valuenow', '1')
  })

  it('US03-AC5 does not mark a date with nothing scheduled as perfect', async () => {
    const today = toLocalIsoDate(new Date())
    mockDays(true, false)
    renderHome()

    expect(await screen.findByText('Nothing scheduled')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: selectDayLabel(today) })).toBeInTheDocument()
  })

  it('US03-AC6 renders a completion restored from the saved day response', async () => {
    mockDays(true, true, true)
    renderHome()

    expect(await screen.findByText('1 of 1 done')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Morning run, completed' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('restores the unchecked state and shows feedback when saving fails', async () => {
    const user = userEvent.setup()
    mockDays(true, true, false, true)
    renderHome()

    await user.click(await screen.findByRole('button', { name: 'Morning run, not completed' }))

    expect(await screen.findByText("Couldn't save your change. Try again.")).toBeInTheDocument()
    expect(screen.getByText('0 of 1 done')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Morning run, not completed' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
