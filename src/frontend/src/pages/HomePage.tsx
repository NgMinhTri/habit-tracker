import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Toast } from '../components/ui/Toast'
import { TodayScreen } from '../features/habits'

export function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [toast, setToast] = useState(() => {
    const state = location.state as { toast?: string } | null
    return state?.toast ?? null
  })
  useEffect(() => {
    if (location.state) void navigate('.', { replace: true, state: null })
  }, [location.key, location.state, navigate])

  return (
    <>
      <TodayScreen onToast={setToast} />
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  )
}
