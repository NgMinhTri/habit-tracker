import type { Locator, Page } from '@playwright/test'

export class TodayPage {
  readonly noHabitsHeading: Locator
  readonly addHabitButton: Locator
  readonly weekStrip: Locator
  readonly weekDayButtons: Locator
  readonly progressPill: Locator
  readonly habitCards: Locator

  constructor(private readonly page: Page) {
    this.noHabitsHeading = page.getByRole('heading', { name: 'No habits yet' })
    // Matches the floating (+) button by its aria-label; the empty-state action has the same accessible name but no aria-label.
    this.addHabitButton = page.getByLabel('Add a habit')
    this.weekStrip = page.getByRole('group', { name: 'Week of selected date' })
    this.weekDayButtons = this.weekStrip.getByRole('button')
    this.progressPill = page.getByText(/^\d+ of \d+ done$/)
    this.habitCards = page.getByRole('button', { name: /, (not completed|completed)$/ })
  }

  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  async openNewHabit(): Promise<void> {
    await this.addHabitButton.click()
  }

  async toggleHabit(name: string): Promise<void> {
    await this.pendingHabitCard(name).click()
  }

  heading(label: string, date: string): Locator {
    return this.page.getByRole('heading', { name: `${label} ${date}` })
  }

  weekDayButton(weekdayAndDate: string): Locator {
    return this.weekStrip.getByRole('button', { name: `Select ${weekdayAndDate}` })
  }

  pendingHabitCard(name: string): Locator {
    return this.page.getByRole('button', { name: `${name}, not completed` })
  }

  completedHabitCard(name: string): Locator {
    return this.page.getByRole('button', { name: `${name}, completed` })
  }

  habitCardSubLabel(name: string, subLabel: string): Locator {
    return this.pendingHabitCard(name).getByText(subLabel, { exact: true })
  }

  habitCardName(card: Locator, name: string): Locator {
    return card.getByText(name, { exact: true })
  }

  // The completion circle is the only element holding the lucide check icon; it is aria-hidden, so no role locator exists.
  completionCircle(card: Locator): Locator {
    return card.locator('span:has(> svg.lucide-check)')
  }
}

