const { test, expect } = require('@playwright/test');
const { performLoginAPI, performLoginUI } = require('../helpers/auth');
const { generateRandomReservationData } = require('../../API/helpers/utils');
const RoomPage = require('../PO/roomPage');

test.describe('Cancel Room Reservation', () => {
    test('User can cancel an existing reservation', async ({ page, request }) => {
        // Perform API login to obtain authentication token
        let authToken;
        await test.step('Perform API login', async () => {
            authToken = await performLoginAPI(request);
        });

        // Generate random reservation data
        let reservationData;
        await test.step('Generate random reservation data', async () => {
            reservationData = generateRandomReservationData();
        });

        // Create a reservation via API
        await test.step('Create a reservation via API', async () => {
            const createResponse = await request.post(`${process.env.API_BASE_URL}/v1/reservations`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    roomId: reservationData.roomId,
                    reservationDate: reservationData.reservationDate,
                    startTimeSlot: reservationData.startTimeSlot,
                    endTimeSlot: reservationData.endTimeSlot,
                    purpose: reservationData.purpose,
                    description: reservationData.description,
                }
            });

            // Ensure the reservation was created successfully
            if (!createResponse.ok()) {
                const status = createResponse.status();
                const responseBody = await createResponse.text();
                console.error(`Reservation creation failed with status ${status}: ${responseBody}`);
                throw new Error(`Failed to create reservation. Status: ${status}`);
            }
        });

        // Perform UI login
        await test.step('Perform UI login', async () => {
            await performLoginUI(page);
        });

        const roomPage = new RoomPage(page);
        await test.step('Navigate to Reservations page', async () => {
            await page.click('a:has-text("Reservations")');
        });

        // Wait for the reservations table to load
        await test.step('Wait for the reservations table to load', async () => {
            await roomPage.waitForReservationsTable();
        });

        // Click the "Reservation Date" button to sort the table
        await test.step('Click the "Reservation Date" button to sort the table', async () => {
            await roomPage.clickReservationDateButton();
        });

        // Locate the row with the specific description
        let row;
        await test.step('Locate the row with the specific description', async () => {
            const desiredDescription = reservationData.description;
            row = await roomPage.getRowByDescription(desiredDescription);
            await expect(row).toHaveCount(1);
        });

        // Click the ellipsis button
        await test.step('Click the ellipsis button', async () => {
            await roomPage.clickEllipsisButton(row);
        });

        // Click the Cancel option with exact text matching
        await test.step('Click the Cancel option', async () => {
            await roomPage.clickCancelMenuItem();
        });

        // Verify the reservation status is updated to "CANCELLED"
        await test.step('Verify the reservation status is updated to "CANCELLED"', async () => {
            await roomPage.verifyReservationCancelled(row);
        });
    });
});