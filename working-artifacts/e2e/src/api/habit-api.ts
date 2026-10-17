import { expect, type APIRequestContext } from '@playwright/test'
import { API_URL } from '../config/env'

export interface HabitSeed {
  readonly name: string
  readonly startDate: string
  readonly repeats: boolean
  readonly icon?: string
  readonly color?: string
  readonly endDate?: string | null
}

export interface SeededHabit {
  readonly id: string
  readonly name: string
}

const DEFAULT_ICON = 'water'
const DEFAULT_COLOR = 'rose'

export class HabitApi {
  constructor(private readonly request: APIRequestContext) {}

  async createHabit(seed: HabitSeed): Promise<SeededHabit> {
    const response = await this.request.post(`${API_URL}/api/habits`, {
      data: {
        name: seed.name,
        icon: seed.icon ?? DEFAULT_ICON,
        color: seed.color ?? DEFAULT_COLOR,
        startDate: seed.startDate,
        repeats: seed.repeats,
        endDate: seed.endDate ?? null,
      },
    })
    expect(response.status(), `Seeding habit "${seed.name}" failed`).toBe(201)
    return (await response.json()) as SeededHabit
  }

  async completeHabit(habit: SeededHabit, date: string): Promise<void> {
    const response = await this.request.put(`${API_URL}/api/habits/${habit.id}/completions/${date}`)
    expect(response.ok(), `Completing "${habit.name}" on ${date} failed`).toBe(true)
  }
}
