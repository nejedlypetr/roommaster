// testing/API/tests/auth/login.spec.js
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

test.describe('Authentication Endpoints', () => {
    test('Login Maintainer with valid credentials', async () => {
        // Initialize APIRequestContext with baseURL
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        // Perform login
        const token = await loginAsMaintainer(context);
        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');
    });

    test('Login Maintainer with invalid credentials', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        const response = await context.post('/v1/login', {
            data: {
                email: 'invalid@maintainer.com',
                password: 'wrongpassword',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(401);
    });

    test('Login Maintainer with missing email and password', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        const response = await context.post('/v1/login', {
            data: {},
            headers: {
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(400);
    });
});
