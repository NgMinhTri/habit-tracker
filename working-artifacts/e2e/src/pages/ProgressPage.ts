import type { Locator, Page } from '@playwright/test'

export class ProgressPage {
  readonly monthHeading: Locator
  readonly perfectDayCells: Locator
  private readonly calendar: Locator

  constructor(page: Page) {
    // Two nested regions share the accessible name "Your stars", so the calendar is addressed through its grid.
    this.calendar = page.getByRole('grid', { name: 'Monthly calendar' })
    this.monthHeading = page.getByRole('heading', { level: 3 })
    this.perfectDayCells = this.calendar.getByRole('gridcell', { name: /, perfect day/ })
  }

  perfectDayCell(longDate: string): Locator {
    return this.calendar.getByRole('gridcell', { name: `${longDate}, perfect day` })
  }

  regularDayCell(longDate: string): Locator {
    return this.calendar.getByRole('gridcell', { name: longDate, exact: true })
  }
}
