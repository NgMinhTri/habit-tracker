import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { mockFetchResponse, renderWithProviders } from '../../../test/utils'
import { HealthStatus } from './HealthStatus'

describe('HealthStatus', () => {
  it('shows healthy status when API responds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        mockFetchResponse({
          status: 'healthy',
          databaseConnected: true,
          timestamp: '2026-01-01T00:00:00Z',
        }),
      ),
    )

    renderWithProviders(<HealthStatus />)

    expect(await screen.findByRole('status')).toHaveTextContent('API: healthy')
  })

  it('shows unreachable when API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockFetchResponse(undefined, { status: 500 })))

    renderWithProviders(<HealthStatus />)

    expect(await screen.findByRole('status')).toHaveTextContent('API: unreachable')
  })
})
