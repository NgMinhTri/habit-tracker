import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProgressScreen } from './ProgressScreen'
import { mockFetchResponse, renderWithProviders } from '../../../test/utils'
import { toLocalIsoDate } from '../../../lib/localDate'

const ranking = [
  { id: 'walk', name: 'Walk', icon: 'walking', color: 'mint', completedDays: 3 },
  { id: 'read', name: 'Read', icon: 'reading', color: 'blue', completedDays: 1 },
  { id: 'stretch', name: 'Stretch', icon: 'stretch', color: 'rose', completedDays: 0 },
]

function mockProgress({
  summary = { perfectDays: 3, bestStreak: 2, totalHabitsDone: 2, ranking },
  perfectDates = [toLocalIsoDate(new Date())],
  failSummary = false,
}: {
  summary?: unknown
  perfectDates?: string[]
  failSummary?: boolean
} = {}) {
  vi.stubGlobal(
    'fetch',
    vi.fn((input: string | URL | Request) => {
      const url = new URL(String(input), 'http://localhost')
      if (url.pathname === '/api/perfect-days') {
        return Promise.resolve(mockFetchResponse({ dates: perfectDates }))
      }
      if (failSummary) {
        return Promise.resolve(mockFetchResponse({ title: 'Unavailable' }, { status: 503 }))
      }
      return Promise.resolve(mockFetchResponse(summary))
    }),
  )
}

function renderProgress() {
  return renderWithProviders(<ProgressScreen />)
}

describe('ProgressScreen', () => {
  it('US04-AC1 marks perfect dates with stars and outlines today', async () => {
    const today = toLocalIsoDate(new Date())
    mockProgress({ perfectDates: [today] })
    renderProgress()

    const month = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    expect(await screen.findByRole('heading', { name: month })).toBeInTheDocument()
    expect(await screen.findByRole('gridcell', { name: new RegExp('perfect day, today') })).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(7)
  })

  it('US04-AC1 browses to the previous and next month', async () => {
    const user = userEvent.setup()
    mockProgress()
    renderProgress()

    const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const previousMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
      .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    await user.click(await screen.findByRole('button', { name: 'Previous month' }))
    expect(screen.getByRole('heading', { name: previousMonth })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next month' }))
    expect(screen.getByRole('heading', { name: monthName })).toBeInTheDocument()
  })

  it('US04-AC2 shows record values with singular day wording', async () => {
    mockProgress({ summary: { perfectDays: 1, bestStreak: 1, totalHabitsDone: 1, ranking } })
    renderProgress()

    const record = screen.getByRole('region', { name: 'Record' })
    expect(await within(record).findAllByText('1 day')).toHaveLength(2)
    expect(within(record).getByText('1', { selector: 'strong' })).toBeInTheDocument()
  })

  it('US04-AC2 shows dashes while the summary is loading or failed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((input: string | URL | Request) => {
        const url = new URL(String(input), 'http://localhost')
        if (url.pathname === '/api/perfect-days') return Promise.resolve(mockFetchResponse({ dates: [] }))
        return new Promise<Response>(() => {})
      }),
    )
    const { unmount } = renderProgress()
    expect(screen.getAllByText('–')).toHaveLength(3)
    unmount()

    mockProgress({ failSummary: true })
    renderProgress()
    const record = screen.getByRole('region', { name: 'Record' })
    expect(await within(record).findAllByText('–')).toHaveLength(3)
  })

  it('US04-AC4 lists every habit including zero days in ranking order', async () => {
    mockProgress()
    renderProgress()

    const list = await screen.findByRole('list')
    const rows = within(list).getAllByRole('listitem')
    expect(rows).toHaveLength(3)
    expect(within(rows[0]).getByText('Walk')).toBeInTheDocument()
    expect(within(rows[0]).getByText('3 days')).toBeInTheDocument()
    expect(within(rows[1]).getByText('Read')).toBeInTheDocument()
    expect(within(rows[1]).getByText('1 day')).toBeInTheDocument()
    expect(within(rows[2]).getByText('Stretch')).toBeInTheDocument()
    expect(within(rows[2]).getByText('0 days')).toBeInTheDocument()
    expect(screen.getByText('⭐ A perfect day means every habit scheduled that day is done.')).toBeInTheDocument()
  })

  it('US04-AC5 shows zero records and the empty ranking state', async () => {
    mockProgress({ summary: { perfectDays: 0, bestStreak: 0, totalHabitsDone: 0, ranking: [] } })
    renderProgress()

    expect(await screen.findByText('Add a habit to see it ranked here.')).toBeInTheDocument()
    expect(screen.getByText('Add a habit and complete it to earn your first ⭐.')).toBeInTheDocument()
    expect(screen.getAllByText('0 days')).toHaveLength(2)
    expect(screen.getByText('0', { selector: 'strong' })).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})