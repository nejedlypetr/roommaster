// testing/API/tests/rooms/getRoomById.spec.js
const { test, expect, request } = require('@playwright/test');
const { loginAsMaintainer } = require('../../helpers/auth');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
const envPath = path.resolve(__dirname, '../../../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Failed to load .env file:', result.error);
    throw result.error;
} else {
    console.log('Environment variables loaded.');
}

test.describe('Room Management Endpoints - Get Room Details by ID', () => {
    let existingRoomId;
    let token;
    test.beforeEach(async () => {
        // Initialize APIRequestContext with baseURL
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        // Fetch existing rooms to get a valid roomId
        token = await loginAsMaintainer(context);
        const response = await context.get('/v1/rooms', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status()).toBe(200);
        
        // Set existingRoomId to the roomId of the first room in the response
        const rooms = await response.json();
        existingRoomId = rooms[0]?.roomId; // Change from 'id' to 'roomId'
        expect(existingRoomId).toBeTruthy(); // Ensure we have a valid room ID
    });

    test('Maintainer can retrieve room details by ID', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });
        const response = await context.get(`/v1/rooms/${existingRoomId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Log the response body for debugging
        if (response.status() !== 200) {
            const responseBody = await response.text(); // Use text() to capture plain text response
            console.error('Error response:', responseBody);
        }

        expect(response.status()).toBe(200);
    });

    test('Unauthenticated request cannot retrieve room details (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        const response = await context.get(`/v1/rooms/${existingRoomId}`);

        expect(response.status()).toBe(401);
    });
});
