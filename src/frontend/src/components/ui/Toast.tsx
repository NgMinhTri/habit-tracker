import { useEffect } from 'react'

interface ToastProps {
  message: string
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: Readonly<ToastProps>) {
  useEffect(() => {
    const timeout = window.setTimeout(onDismiss, 1800)
    return () => window.clearTimeout(timeout)
  }, [message, onDismiss])

  return (
    <output
      className="text-message bg-ink text-surface fixed inset-x-0 bottom-[calc(112px+env(safe-area-inset-bottom))] z-20 mx-auto w-fit max-w-[calc(100vw-32px)] rounded-pill px-[18px] py-2.5 shadow-panel"
    >
      {message}
    </output>
  )
}