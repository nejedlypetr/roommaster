// testing/API/tests/reservations/createReservation.spec.js
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

test.describe('Reservation Management Endpoints - Create Reservation', () => {
    // Set timeout for the entire suite
    test.setTimeout(120000); // Set timeout to 120 seconds

    test('Maintainer can create a new reservation with valid data', async () => {
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
        } finally {
            await context.dispose();
        }
    });

    test('Maintainer cannot create a reservation with overlapping time slots (Conflict)', async () => {
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

            // Create a reservation first
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
            console.log('First Reservation:', createdReservation);
            

            // Wait for 30 seconds to ensure the reservation is created
            await new Promise(resolve => setTimeout(resolve, 30000));

            // Attempt to create an overlapping reservation
            const overlappingReservationResponse = await context.post('/v1/reservations', {
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

            // Log the response for debugging
            console.log('Overlapping Reservation Response:', await overlappingReservationResponse);

            expect(overlappingReservationResponse.status()).toBe(409);
        } finally {
            await context.dispose();
        }
    }, { timeout: 120000 }); // Set timeout to 120 seconds

    test('Unauthenticated request cannot create a reservation (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        try {
            // Generate random reservation data
            const reservationData = generateRandomReservationData();

            // Attempt to create a reservation without authentication
            const response = await context.post('/v1/reservations', {
                data: {
                    roomId: reservationData.roomId,
                    reservationDate: reservationData.reservationDate,
                    startTimeSlot: reservationData.startTimeSlot,
                    endTimeSlot: reservationData.endTimeSlot,
                    purpose: reservationData.purpose,
                    description: reservationData.description,
                },
            });

            expect(response.status()).toBe(401);
        } finally {
            await context.dispose();
        }
    });
});
