// testing/API/tests/reservations/getUserReservations.spec.js
const { test, expect, request } = require('@playwright/test');
const { loginAsMaintainer } = require('../../helpers/auth');
const dotenv = require('dotenv');
const path = require('path');
const { generateRandomReservationData } = require('../../helpers/utils');

// Load environment variables
const envPath = path.resolve(__dirname, '../../../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('Failed to load .env file in test:', result.error);
    throw result.error;
} else {
    console.log('Test environment variables loaded.');
    console.log('API Base URL:', process.env.API_BASE_URL); // Log the base URL for debugging
}

test.describe('Reservation Management Endpoints - Get User Reservations', () => {
    test('Maintainer can retrieve all reservations for a specific user', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Login as maintainer and retrieve user ID
            const token = await loginAsMaintainer(context);

            // Create a random reservation for the user
            const reservationData = generateRandomReservationData();
            const reservationResponse = await context.post('/v1/reservations', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    roomId: reservationData.roomId,
                    reservationDate: reservationData.reservationDate,
                    startTimeSlot: reservationData.startTimeSlot,
                    endTimeSlot: reservationData.endTimeSlot,
                    purpose: reservationData.purpose,
                    description: reservationData.description,
                },
            });

            expect(reservationResponse.status()).toBe(201);

            // Retrieve all reservations for the specific user
            const response = await context.get(`/v1/reservations/users/11`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(response.status()).toBe(200);
        } finally {
            await context.dispose();
        }
    });

    test('Unauthenticated request cannot retrieve user reservations (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const userId = 999999; // Assuming this ID does not exist

            const response = await context.get(`/v1/reservations/users/${userId}`);

            expect(response.status()).toBe(401);
        } finally {
            await context.dispose();
        }
    });

});
