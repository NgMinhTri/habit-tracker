import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { HomePage } from '../../../pages/HomePage'
import { NewHabitPage } from '../../../pages/NewHabitPage'
import { mockFetchResponse, renderWithProviders } from '../../../test/utils'

describe('NewHabitPage', () => {
  it('US01-AC1 returns to Today with the saved card and confirmation toast', async () => {
    const user = userEvent.setup()
    const habit = {
      id: 'habit-1',
      name: 'Morning run',
      icon: 'running',
      color: 'mint',
      startDate: '2026-10-17',
      repeats: false,
      endDate: null,
    }
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string, init?: RequestInit) =>
        Promise.resolve(
          url === '/api/habits' && init?.method === 'POST'
            ? mockFetchResponse(habit, { status: 201 })
            : mockFetchResponse({ date: '2026-10-17', hasAnyHabits: true, habits: [habit], completedHabitIds: [] }),
        ),
      ),
    )
    renderWithProviders(<HomePage />, {
      routes: [
        { path: '/', element: <HomePage /> },
        { path: '/habits/new', element: <NewHabitPage /> },
      ],
    })

    await user.click(screen.getAllByRole('button', { name: 'Add a habit' })[0])
    await user.type(screen.getByLabelText('Habit name'), 'Morning run')
    await user.click(screen.getByRole('button', { name: 'Choose an icon' }))
    await user.click(screen.getByRole('option', { name: 'running' }))
    await user.click(screen.getByRole('radio', { name: 'Mint color' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Morning run')).toBeInTheDocument()
    expect(screen.getByText('Just once')).toBeInTheDocument()
    expect(await screen.findByRole('status')).toHaveTextContent('Habit added ✨')
  })

  it('US01-AC7 selects an icon and preserves the unsaved form values', async () => {
    const user = userEvent.setup()
    renderWithProviders(<NewHabitPage />)

    await user.type(screen.getByLabelText('Habit name'), 'Morning run')
    await user.click(screen.getByRole('button', { name: 'Choose an icon' }))
    await user.click(screen.getByRole('option', { name: 'running' }))

    expect(screen.getByLabelText('Habit name')).toHaveValue('Morning run')
    expect(screen.getByRole('button', { name: 'Choose an icon' })).toHaveTextContent('🏃')
  })

  it('US01-AC10 closes the form without sending a create request', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    renderWithProviders(<NewHabitPage />, {
      route: '/habits/new',
      routes: [
        { path: '/', element: <p>Today screen</p> },
        { path: '/habits/new', element: <NewHabitPage /> },
      ],
    })

    await user.type(screen.getByLabelText('Habit name'), 'Discard me')
    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(await screen.findByText('Today screen')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })
})