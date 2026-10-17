import { describe, expect, it, vi } from 'vitest'
import { mockFetchResponse } from '../test/utils'
import { ApiError, apiClient } from './apiClient'

describe('apiClient', () => {
  it('prefixes requests with /api and returns parsed JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockFetchResponse({ value: 42 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await apiClient.get<{ value: number }>('/things')

    expect(result).toEqual({ value: 42 })
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/things',
      expect.objectContaining({ method: 'GET' }),
    )
  })

  it('serializes the body as JSON on POST', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockFetchResponse({ id: '1' }, { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)

    await apiClient.post('/things', { name: 'x' })

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(init.body).toBe(JSON.stringify({ name: 'x' }))
    expect(init.headers).toMatchObject({ 'Content-Type': 'application/json' })
  })

  it('throws ApiError with ProblemDetails on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(mockFetchResponse({ title: 'Not Found', status: 404 }, { status: 404 })),
    )

    const error = await apiClient.get('/missing').catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 404, message: 'Not Found' })
  })

  it('returns undefined for 204 No Content', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 204 })))

    await expect(apiClient.delete('/things/1')).resolves.toBeUndefined()
  })
})
