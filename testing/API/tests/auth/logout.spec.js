// testing/API/tests/auth/logout.spec.js
const { test, expect, request } = require('@playwright/test');
const { loginAsMaintainer } = require('../../helpers/auth');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
const envPath = path.resolve(__dirname, '../../../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Failed to load .env file in test:', result.error);
    throw result.error;
} else {
    console.log('Test environment variables loaded.');
}

test.describe('Logout Endpoint', () => {
    test('Logout Maintainer with valid token', async () => {
        // Initialize APIRequestContext with baseURL
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        // Perform login to get the token
        const token = await loginAsMaintainer(context);
        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');

        // Proceed with logout using the obtained token
        const response = await context.post('/v1/logout', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.text();
        if (responseBody) {
            const data = JSON.parse(responseBody);
            expect(data).toHaveProperty('message', 'Successfully logged out');
        } else {
            console.log('No response body returned.');
            // If an empty response is expected, assert it here
            expect(responseBody).toBe('');
        }
    });

    test('Logout Maintainer with missing token', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        // Send logout request without Authorization header
        const response = await context.post('/v1/logout', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(401);

        const responseBody = await response.text();
        if (responseBody) {
            const data = JSON.parse(responseBody);
            expect(data).toHaveProperty('error');
        } else {
            console.log('No response body returned.');
            // If an empty response is expected, assert it here
            expect(responseBody).toBe('');
        }
    });

    test('Logout Maintainer with invalid token', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        // Send logout request with an invalid token
        const response = await context.post('/v1/logout', {
            headers: {
                'Authorization': `Bearer invalidtoken123`,
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(401);

        const responseBody = await response.text();
        if (responseBody) {
            const data = JSON.parse(responseBody);
            expect(data).toHaveProperty('error');
        } else {
            console.log('No response body returned.');
            // If an empty response is expected, assert it here
            expect(responseBody).toBe('');
        }
    });
});