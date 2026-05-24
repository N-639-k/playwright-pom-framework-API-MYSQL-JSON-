import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Feature/Test Folder
  testDir: './featureFiles',

  // Run tests in parallel
  fullyParallel: false,

  // Fail build if test.only exists
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Workers
  workers: process.env.CI ? 1 : 1,

  // Reporter Configuration
  reporter: [

    ['list'],

    ['html', {
      open: 'on-failure'
    }],

    ['allure-playwright']

  ],

  // Shared Settings
  use: {

    // Base URL
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

    // Browser Head Mode
    headless: false,

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video Recording
    video: 'retain-on-failure',

    // Trace
    trace: 'on-first-retry',

    // Action Timeout
    actionTimeout: 30000,

    // Navigation Timeout
    navigationTimeout: 120000,
  },

  // Browser Projects
  projects: [

    {
      name: 'Chromium',

      use: {
        ...devices['Desktop Chrome'],

        viewport: {
          width: 1920,
          height: 1080
        }
      },
    },

    {
      name: 'Firefox',

      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'Webkit',

      use: {
        ...devices['Desktop Safari'],
      },
    },

  ],

  // Folder for screenshots/videos/traces
  outputDir: 'test-results/',

  // Global Timeout
  timeout: 60000,

  // Expect Timeout
  expect: {
    timeout: 10000,
  },

});
