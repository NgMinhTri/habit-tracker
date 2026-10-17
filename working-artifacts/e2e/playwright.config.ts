import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from '@playwright/test'
import {
  API_PROJECT_PATH,
  API_URL,
  BASE_URL,
  E2E_DB_PATH,
  FRONTEND_PATH,
  MOBILE_VIEWPORT,
  WEB_PORT,
} from './src/config/env'
import { TEST_LOCALE, TEST_TIMEZONE } from './src/test-data/clock'

const SERVER_STARTUP_TIMEOUT_MS = 180_000

mkdirSync(path.dirname(E2E_DB_PATH), { recursive: true })

export default defineConfig({
  testDir: './test/functions',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    viewport: MOBILE_VIEWPORT,
    timezoneId: TEST_TIMEZONE,
    locale: TEST_LOCALE,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: [
    {
      // Release output avoids file-lock clashes with a developer's running Debug API.
      command: `dotnet run -c Release --project "${API_PROJECT_PATH}" --no-launch-profile --urls ${API_URL}`,
      url: `${API_URL}/api/health`,
      reuseExistingServer: false,
      timeout: SERVER_STARTUP_TIMEOUT_MS,
      env: {
        ASPNETCORE_ENVIRONMENT: 'Development',
        ConnectionStrings__Default: `Data Source=${E2E_DB_PATH}`,
      },
    },
    {
      command: `npm --prefix "${FRONTEND_PATH}" run dev -- --port ${WEB_PORT}`,
      url: BASE_URL,
      reuseExistingServer: false,
      timeout: SERVER_STARTUP_TIMEOUT_MS,
      env: { VITE_API_TARGET: API_URL },
    },
  ],
})
