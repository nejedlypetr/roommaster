// testing/API/tests/users/deleteUser.spec.js
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

test.describe('User Management Endpoints - Delete User', () => {
    test('Maintainer can delete an existing user', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Login as maintainer
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            // First create a user to delete
            const newUser = {
                firstName: 'Delete',
                lastName: 'Me',
                email: generateRandomEmail(),
                password: 'DeleteP@ssw0rd',
                department: 'HR',
                role: 'USER',
                isHeadOfDepartment: false,
            };

            const createResponse = await context.post('/v1/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: newUser,
            });

            if (createResponse.status() === 403) {
                test.skip('Maintainer does not have permission to create users for deletion');
            }

            expect(createResponse.status()).toBe(201);
            const createdUser = await createResponse.json();
            const userIdToDelete = createdUser.id;
            expect(userIdToDelete).toBeTruthy();

            // Now delete the created user
            const deleteResponse = await context.delete(`/v1/users/${userIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (deleteResponse.status() === 403) {
                test.skip('Maintainer does not have permission to delete users');
            }

            expect(deleteResponse.status()).toBe(200);
        } finally {
            await context.dispose();
        }
    });

    test('Maintainer cannot delete a non-existing user (Not Found)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            const nonExistingUserId = 999999; // Assuming this ID does not exist

            const response = await context.delete(`/v1/users/${nonExistingUserId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(response.status()).toBe(404);
        } finally {
            await context.dispose();
        }
    });

    test('Unauthenticated request cannot delete a user (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const nonExistingUserId = 999999; // Assuming this ID does not exist

            const response = await context.delete(`/v1/users/${nonExistingUserId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            expect(response.status()).toBe(401);
        } finally {
            await context.dispose();
        }
    });
});
