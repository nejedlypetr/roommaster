// testing/API/tests/reservations/cancelReservation.spec.js
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

test.describe('Reservation Management Endpoints - Cancel Reservation', () => {
    test('Maintainer can cancel their own reservation', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Login as maintainer
            const token = await loginAsMaintainer(context);
            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');

            // Generate random reservation data
            const reservationData = generateRandomReservationData();

            // Create a new reservation
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
            const createdReservation = await reservationResponse.json();
            const reservationIdToCancel = createdReservation.id;
            expect(reservationIdToCancel).toBeTruthy();

            // Now cancel the created reservation
            const cancelResponse = await context.patch(`/v1/reservations/${reservationIdToCancel}/cancel`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(cancelResponse.status()).toBe(200);
        } finally {
            await context.dispose();
        }
    });

    test('Unauthenticated request cannot cancel a reservation (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            const nonExistingReservationId = 999999; // Assuming this ID does not exist

            const response = await context.patch(`/v1/reservations/${nonExistingReservationId}/cancel`, {
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
