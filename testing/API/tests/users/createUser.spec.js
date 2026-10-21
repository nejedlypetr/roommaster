// testing/API/tests/users/createUser.spec.js
const { test, expect, request } = require('@playwright/test');
const { loginAsMaintainer } = require('../../helpers/auth');
const { generateRandomEmail } = require('../../helpers/utils');
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

test.describe('User Management Endpoints - Create User', () => {

    test('Maintainer can create a new user with valid data', async () => {
        // Initialize APIRequestContext with baseURL
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Perform login to obtain token
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            const newUser = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: generateRandomEmail(),
                password: 'SecureP@ssw0rd',
                department: 'IT',
                role: 'USER',
                isHeadOfDepartment: false,
            };

            const response = await context.post('/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: newUser,
            });



            expect(response.status()).toBe(201);
            const createdUser = await response.json();
            expect(createdUser).toMatchObject({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
                department: newUser.department,
                isHeadOfDepartment: newUser.isHeadOfDepartment,
            });
            expect(createdUser).toHaveProperty('id');
        } finally {
            await context.dispose();
        }
    });

    test('Maintainer cannot create a user with existing email (Conflict)', async () => {
        // Initialize APIRequestContext with baseURL
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Perform login to obtain token
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            const existingEmail = 'maintainer@roommaster.com';
            const newUser = {
                firstName: 'John',
                lastName: 'Smith',
                email: existingEmail,
                password: 'AnotherP@ssw0rd',
                department: 'HR',
                role: 'USER',
                isHeadOfDepartment: false,
            };

            const response = await context.post('/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: newUser,
            });

            expect(response.status()).toBe(409);
        } finally {
            await context.dispose();
        }
    });

    test('Anonymous registration cannot assign the maintainer role', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const newUser = {
                firstName: 'Public',
                lastName: 'Signup',
                email: generateRandomEmail(),
                password: 'SecureP@ssw0rd',
                department: 'IT',
                role: 'MAINTAINER',
                isHeadOfDepartment: false,
            };

            const response = await context.post('/v1/users', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: newUser,
            });

            expect(response.status()).toBe(201);
            const createdUser = await response.json();
            expect(createdUser.role).toBe('USER');
        } finally {
            await context.dispose();
        }
    });
});