// testing/E2E/helpers/auth.js
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

/**
 * Performs UI login using Playwright Page.
 * @param {Object} page - Playwright Page instance.
 */
async function performLoginUI(page) {
    await page.goto('/login'); // Adjust the route based on your frontend routing
    await page.fill('input[name="email"]', process.env.MAINTAINER_USER_EMAIL);
    await page.fill('input[name="password"]', process.env.MAINTAINER_USER_PASSWORD);
    await page.click('button[type="submit"]');
    // Wait for navigation or an element that signifies successful login
    await page.waitForSelector('text=Room Master'); // Adjust based on your frontend
}

/**
 * Performs API login to obtain authentication token.
 * @param {Object} request - Playwright APIRequestContext instance.
 * @returns {Promise<string>} - Authentication token.
 */
async function performLoginAPI(request) {
    const response = await request.post(`${process.env.API_BASE_URL}/v1/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            email: process.env.MAINTAINER_USER_EMAIL,
            password: process.env.MAINTAINER_USER_PASSWORD,
        },
    });

    if (!response.ok()) {
        throw new Error(`API Login failed with status ${response.status()}`);
    }

    const data = await response.json();
    return data.token; // Adjust based on your API's response structure
}

module.exports = { performLoginAPI, performLoginUI };
