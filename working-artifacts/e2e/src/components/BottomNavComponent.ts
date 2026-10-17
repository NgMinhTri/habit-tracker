import type { Locator, Page } from '@playwright/test'

export class BottomNavComponent {
  readonly todayTab: Locator
  readonly progressTab: Locator

  constructor(page: Page) {
    const navigation = page.getByRole('navigation', { name: 'Main' })
    this.todayTab = navigation.getByRole('link', { name: 'Today' })
    this.progressTab = navigation.getByRole('link', { name: 'Progress' })
  }

  async openProgress(): Promise<void> {
    await this.progressTab.click()
  }
}
