// testing/playwright.config.js
const { defineConfig } = require('@playwright/test');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
    testDir: '.', // Current directory; projects separate API and E2E
    timeout: 120 * 1000, // Set global timeout to 120 seconds
    expect: {
        timeout: 5000, // 5 seconds
    },
    reporter: [['list'], ['json', { outputFile: 'test-results.json' }]],
    projects: [
        {
            name: 'API Tests',
            testDir: 'API/tests',
            use: {
                baseURL: process.env.API_BASE_URL || 'http://localhost:8080/v1',
                extraHTTPHeaders: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                trace: 'retain-on-failure',
            },
        },
        {
            name: 'E2E Tests',
            testDir: 'E2E/tests',
            use: {
                baseURL: process.env.E2E_BASE_URL || 'http://localhost:5173',
                browserName: 'chromium',
                headless: true,
                viewport: { width: 1280, height: 720 },
                ignoreHTTPSErrors: true,
                video: 'retain-on-failure',
                trace: 'retain-on-failure',
            },
        },
    ],
    use: {
        // Global settings applicable to all projects
    },
});
