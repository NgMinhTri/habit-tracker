import { createBrowserRouter } from 'react-router'
import { AppLayout } from '../components/layout/AppLayout'
import { HomePage } from '../pages/HomePage'
import { NewHabitPage } from '../pages/NewHabitPage'
import { ProgressPage } from '../pages/ProgressPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'progress', Component: ProgressPage },
    ],
  },
  { path: '/habits/new', Component: NewHabitPage },
])
