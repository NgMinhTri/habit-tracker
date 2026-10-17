import type { Locator, Page } from '@playwright/test'

export class ToastComponent {
  readonly root: Locator

  constructor(page: Page) {
    // The toast is rendered as an <output> element, which exposes the "status" role.
    this.root = page.getByRole('status')
  }
}
