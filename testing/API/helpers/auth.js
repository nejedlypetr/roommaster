// testing/API/helpers/auth.js
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
const envPath = path.resolve(__dirname, '../../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Failed to load .env file:', result.error);
    throw result.error;
} else {
    console.log('Environment variables loaded.');
}

/**
 * Logs in as a maintainer and retrieves the JWT token.
 * @param {Object} apiRequest - Playwright's APIRequestContext instance.
 * @returns {Promise<string>} - JWT token.
 */
// helpers/auth.js
async function loginAsMaintainer(request) {
    const email = process.env.MAINTAINER_USER_EMAIL;
    const password = process.env.MAINTAINER_USER_PASSWORD;
    if (!email || !password) {
        throw new Error('MAINTAINER_USER_EMAIL and MAINTAINER_USER_PASSWORD must be set in testing/.env');
    }

    try {
        const response = await request.post('/v1/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
        const data = await response.json();
        console.log('Login Response Data:', data);
        // Ensure 'token' is the correct key
        return data.token;
    } catch (error) {
        console.error('Error during maintainer login:', error);
        throw error;
    }
}

module.exports = { loginAsMaintainer };
