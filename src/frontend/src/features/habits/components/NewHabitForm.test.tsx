import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { mockFetchResponse, renderWithProviders } from '../../../test/utils'
import { NewHabitForm } from './NewHabitForm'

function renderForm(onSaved = vi.fn()) {
  return renderWithProviders(
    <NewHabitForm icon="sun" onClose={vi.fn()} onIconOpen={vi.fn()} onSaved={onSaved} />,
  )
}

function errorResponse(field: string, message: string) {
  return mockFetchResponse({ errors: { [field]: [message] } }, { status: 400 })
}

describe('NewHabitForm', () => {
  it('US01-AC1 creates a one-time habit with its selected values', async () => {
    const user = userEvent.setup()
    const onSaved = vi.fn()
    const fetchMock = vi.fn().mockResolvedValue(
      mockFetchResponse(
        {
          id: 'habit-1',
          name: 'Walk',
          icon: 'walking',
          color: 'mint',
          startDate: '2026-10-17',
          repeats: false,
          endDate: null,
        },
        { status: 201 },
      ),
    )
    vi.stubGlobal('fetch', fetchMock)
    renderForm(onSaved)

    await user.type(screen.getByLabelText('Habit name'), 'Walk')
    await user.click(screen.getByRole('radio', { name: 'Mint color' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => expect(onSaved).toHaveBeenCalledOnce())
    const [, request] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(JSON.parse(request.body as string)).toMatchObject({
      name: 'Walk',
      icon: 'sun',
      color: 'mint',
      repeats: false,
      endDate: null,
    })
  })

  it('US01-AC2 submits a repeating habit with its end date', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue(
      mockFetchResponse(
        {
          id: 'habit-1',
          name: 'Walk',
          icon: 'sun',
          color: 'rose',
          startDate: '2026-10-20',
          repeats: true,
          endDate: '2026-10-20',
        },
        { status: 201 },
      ),
    )
    vi.stubGlobal('fetch', fetchMock)
    const onSaved = vi.fn()
    renderForm(onSaved)

    await user.type(screen.getByLabelText('Habit name'), 'Walk')
    await user.click(screen.getByRole('switch', { name: 'Repeat' }))
    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '2026-10-20' } })
    await user.click(screen.getByRole('switch', { name: 'Set end date' }))
    await user.click(screen.getByRole('button', { name: 'October 20, 2026' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() => expect(onSaved).toHaveBeenCalledOnce())
    const [, request] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(JSON.parse(request.body as string)).toMatchObject({
      startDate: '2026-10-20',
      repeats: true,
      endDate: '2026-10-20',
    })
  })

  it('US01-AC3 rejects an empty name and clears the error when typing', async () => {
    const user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(errorResponse('name', 'Please give your habit a name.')))
    renderForm()

    await user.click(screen.getByLabelText('Habit name'))
    await user.keyboard('{Enter}')

    expect(await screen.findByText('Please give your habit a name.')).toBeInTheDocument()
    expect(screen.getByLabelText('Habit name')).toHaveAttribute('aria-invalid', 'true')
    await user.type(screen.getByLabelText('Habit name'), 'W')
    expect(screen.queryByText('Please give your habit a name.')).not.toBeInTheDocument()
  })

  it('US01-AC4 keeps an overlong name and shows the exact error', async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(errorResponse('name', 'Name must be 40 characters or fewer.')),
    )
    renderForm()
    const nameInput = screen.getByLabelText('Habit name')
    await user.type(nameInput, 'x'.repeat(41))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('Name must be 40 characters or fewer.')).toBeInTheDocument()
    expect(nameInput).toHaveValue('x'.repeat(41))
  })

  it('US01-AC5 shows the exact case-insensitive duplicate error', async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        errorResponse('name', 'You already have a habit called "stretch".'),
      ),
    )
    renderForm()
    await user.type(screen.getByLabelText('Habit name'), ' stretch ')
    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findByText('You already have a habit called "stretch".')).toBeInTheDocument()
  })

  it('US01-AC6 shows the end-date error below the schedule and clears it on change', async () => {
    const user = userEvent.setup()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        errorResponse('endDate', 'End date must be on or after the start date.'),
      ),
    )
    renderForm()
    await user.type(screen.getByLabelText('Habit name'), 'Walk')
    await user.click(screen.getByRole('switch', { name: 'Repeat' }))
    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '2026-10-20' } })
    await user.click(screen.getByRole('switch', { name: 'Set end date' }))
    await user.click(screen.getByRole('button', { name: 'October 19, 2026' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))

    const error = await screen.findByText('End date must be on or after the start date.')
    expect(error).toBeInTheDocument()
    expect(screen.getByLabelText('Habit name')).not.toHaveAttribute('aria-invalid', 'true')
    await user.click(screen.getByRole('button', { name: 'October 20, 2026' }))
    expect(screen.queryByText('End date must be on or after the start date.')).not.toBeInTheDocument()
  })
})