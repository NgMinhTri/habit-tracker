import { useState } from 'react'
import { useNavigate } from 'react-router'
import { DEFAULT_HABIT_ICON, IconPicker, NewHabitForm } from '../features/habits'

export function NewHabitPage() {
  const [choosingIcon, setChoosingIcon] = useState(false)
  const [icon, setIcon] = useState(DEFAULT_HABIT_ICON)
  const navigate = useNavigate()

  return (
    <>
      <div className={choosingIcon ? 'hidden' : undefined}>
        <NewHabitForm
          icon={icon}
          onClose={() => navigate('/')}
          onIconOpen={() => setChoosingIcon(true)}
          onSaved={() => navigate('/', { state: { toast: 'Habit added ✨' } })}
        />
      </div>
      {choosingIcon && (
        <div className="bg-app fixed inset-0 z-20 overflow-y-auto">
          <IconPicker
            value={icon}
            onBack={() => setChoosingIcon(false)}
            onSelect={(selectedIcon) => {
              setIcon(selectedIcon)
              setChoosingIcon(false)
            }}
          />
        </div>
      )}
    </>
  )
}