import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/utils'
import { AppLayout } from './AppLayout'

const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <p>Today content</p> },
      { path: 'progress', element: <p>Progress content</p> },
    ],
  },
]

describe('AppLayout', () => {
  it('renders the routed page inside the layout', () => {
    renderWithProviders(<AppLayout />, { routes })

    expect(screen.getByText('Today content')).toBeInTheDocument()
  })

  it('renders bottom navigation with Today and Progress tabs', () => {
    renderWithProviders(<AppLayout />, { routes })

    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav).toBeInTheDocument()
    expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Today',
      'Progress',
    ])
  })

  it('marks the current tab as active', () => {
    renderWithProviders(<AppLayout />, { routes, route: '/progress' })

    expect(screen.getByRole('link', { name: 'Progress' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Today' })).not.toHaveAttribute('aria-current')
  })
})
