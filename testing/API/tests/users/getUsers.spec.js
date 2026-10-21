// testing/API/tests/users/getUsers.spec.js
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
    console.log('API Base URL:', process.env.API_BASE_URL); // Log the base URL
}

test.describe('User Management Endpoints - Get All Users', () => {
    test('Maintainer can retrieve all users', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            const response = await context.get('/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(response.status()).toBe(200);
            const users = await response.json();
            expect(Array.isArray(users)).toBe(true);
        } finally {
            await context.dispose();
        }
    });
});
