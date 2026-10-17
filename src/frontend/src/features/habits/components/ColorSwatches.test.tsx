import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../../test/utils'
import { ColorSwatches } from './ColorSwatches'

describe('ColorSwatches', () => {
  it('US01-AC8 moves the single selected color', async () => {
    const user = userEvent.setup()
    let selectedColor: 'rose' | 'mint' = 'rose'
    const { rerender } = renderWithProviders(
      <ColorSwatches value={selectedColor} onChange={(color) => (selectedColor = color as 'rose' | 'mint')} />,
    )

    await user.click(screen.getByRole('radio', { name: 'Mint color' }))
    rerender(
      <ColorSwatches value={selectedColor} onChange={(color) => (selectedColor = color as 'rose' | 'mint')} />,
    )

    expect(screen.getByRole('radio', { name: 'Mint color' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Rose color' })).toHaveAttribute('aria-checked', 'false')
  })
})