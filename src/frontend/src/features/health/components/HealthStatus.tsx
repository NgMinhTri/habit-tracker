import { useHealth } from '../hooks/useHealth'

export function HealthStatus() {
  const { data, isPending, isError } = useHealth()

  if (isPending) {
    return <div className="bg-chip h-12 animate-pulse rounded-chip" aria-label="Loading" />
  }

  const healthy = !isError && data.status === 'healthy'

  return (
    <div
      role="status"
      className={`text-message flex min-h-12 items-center gap-3 rounded-chip px-4 ${
        healthy ? 'bg-habit-mint text-ink' : 'bg-danger-soft text-danger'
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-2.5 rounded-full ${healthy ? 'bg-success' : 'bg-danger'}`}
      />
      {isError ? 'API: unreachable' : `API: ${data.status}`}
    </div>
  )
}
