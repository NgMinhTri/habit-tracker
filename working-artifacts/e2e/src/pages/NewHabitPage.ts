import type { Locator, Page } from '@playwright/test'

export class NewHabitPage {
  readonly title: Locator
  readonly nameInput: Locator
  readonly saveButton: Locator

  constructor(page: Page) {
    this.title = page.getByRole('heading', { name: 'New Habit' })
    this.nameInput = page.getByLabel('Habit name')
    this.saveButton = page.getByRole('button', { name: 'Save' })
  }

  async enterName(name: string): Promise<void> {
    await this.nameInput.fill(name)
  }

  async save(): Promise<void> {
    await this.saveButton.click()
  }
}
