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

test.describe('Fault Management Endpoints - Add a New Fault to a Room', () => {
    let roomId;

    test.beforeAll(async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Fetch existing rooms to get a valid roomId
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            const roomsResponse = await context.get('/v1/rooms', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(roomsResponse.status()).toBe(200);

            // Get the first room ID
            const rooms = await roomsResponse.json();
            expect(rooms.length).toBeGreaterThan(0);
            roomId = rooms[0].roomId;
            console.log('Room ID:', roomId);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
            throw error;
        } finally {
            await context.dispose();
        }
    });

    test('Maintainer can add a new fault to a room', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const token = await loginAsMaintainer(context);
            const newFault = {
                cause: 'Broken window',
                description: 'The window is broken and needs to be replaced',
            };
            const response = await context.post(`/v1/rooms/${roomId}/faults`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    cause: newFault.cause,
                    description: newFault.description
                }
            });

            expect(response.status()).toBe(201);
            const createdFault = await response.json();
            expect(createdFault).toHaveProperty('id');
            expect(createdFault).toHaveProperty('created');
        } finally {
            await context.dispose();
        }
    });

    test('Unauthenticated request cannot add a fault (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const newFault = {
                cause: 'Malfunctioning HVAC',
                description: 'The HVAC'
            };

            const response = await context.post(`/v1/rooms/${roomId}/faults`, {
                data: {
                    cause: newFault.cause,
                    description: newFault.description
                }
            });

            expect(response.status()).toBe(401);
        } finally {
            await context.dispose();
        }
    });
});
