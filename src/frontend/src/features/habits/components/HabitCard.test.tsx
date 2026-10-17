import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../../test/utils'
import { HabitBadge } from './HabitBadge'
import { HabitCard } from './HabitCard'

const habit = {
  id: 'habit-1',
  name: 'Morning run',
  icon: 'running',
  color: 'mint' as const,
  startDate: '2026-10-17',
  repeats: false,
  endDate: null,
}

describe('HabitCard', () => {
  it('US01-AC9 shows the selected icon, name, and schedule', () => {
    renderWithProviders(<HabitCard habit={habit} completed={false} onToggle={() => {}} />)

    expect(screen.getByText('Morning run')).toBeInTheDocument()
    expect(screen.getByText('Just once')).toBeInTheDocument()
    expect(screen.getByText('🏃')).toBeInTheDocument()
  })

  it('US03-AC1 marks a card completed and invokes its toggle action', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    renderWithProviders(<HabitCard habit={habit} completed onToggle={onToggle} />)

    const card = screen.getByRole('button', { name: 'Morning run, completed' })
    expect(card).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Morning run')).toHaveClass('line-through')
    await user.click(card)

    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('US01-AC9 shows the same icon in the Progress ranking badge', () => {
    renderWithProviders(<HabitBadge icon="running" color="mint" />)

    expect(screen.getByText('🏃')).toBeInTheDocument()
  })
})