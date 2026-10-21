// testing/API/tests/reservations/createReservation.spec.js
const { test, expect, request } = require('@playwright/test');
const { loginAsMaintainer } = require('../../helpers/auth');
const { generateRandomReservationData } = require('../../helpers/utils');
const dotenv = require('dotenv');
const path = require('path');

try {
    const envPath = path.resolve(__dirname, '../../../.env');
    const result = dotenv.config({ path: envPath });

    if (result.parsed) {
        console.log('Test environment variables loaded.');
        console.log('API Base URL:', process.env.API_BASE_URL); // Log the base URL for debugging
    }
} catch (error) {
    // Prevent running tests if the .env file is not loaded
    console.error('Failed to load .env file in test:', error);
    throw error;
}

test.describe('Fault Management Endpoints - Resolve a Fault', () => {
    let faultId;
    let roomId;

    test.beforeEach(async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Fetch existing rooms to get a valid roomId
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            const faultsResponse = await context.get('/v1/faults', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(faultsResponse.status()).toBe(200);

            // Get the first room ID
            const faults = await faultsResponse.json();
            expect(faults.length).toBeGreaterThan(0);

            // Find the first unresolved fault
            try {
                const unresolvedFault = faults.find(fault => fault.resolved === false);
                console.log('Found Unresolved Fault:', unresolvedFault);
                console.log('Unresolved Fault ID:', unresolvedFault.id);
                console.log('Unresolved Fault Room ID:', unresolvedFault.roomId);
                faultId = unresolvedFault.id;
                roomId = unresolvedFault.roomId;
            } catch (error) {
                console.error('Failed to find any unresolved fault:', error);
                throw error;
            } finally {
                await context.dispose();
            }
        } finally {
            await context.dispose();
        }
    });

    test('Maintainer can resolve a fault', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL
        });

        try {
            const token = await loginAsMaintainer(context);

            const response = await context.patch(`/v1/rooms/${roomId}/faults/${faultId}/resolve`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    resolved: true
                }
            });

            expect(response.status()).toBe(200);
        } finally {
            await context.dispose();
        }
    });

    test('Unauthenticated request cannot resolve a fault (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL
        });

        try {
            const response = await context.patch(`/v1/rooms/${roomId}/faults/${faultId}/resolve`, {
                data: {
                    resolved: true
                }
            });

            expect(response.status()).toBe(401);
        } finally {
            await context.dispose();
        }
    });
});
