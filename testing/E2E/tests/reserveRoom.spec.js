const { test, expect } = require('@playwright/test');
const { performLoginUI } = require('../helpers/auth');
const { generateRandomDay, generateRandomString, generateRandomMonthCount } = require('../helpers/utils');
const RoomPage = require('../PO/roomPage');

test.describe('Room Reservation', () => {
    test('User can reserve a room successfully', async ({ page }) => {
        let randomString, randomDay, monthCount;
        const roomPage = new RoomPage(page);

        await test.step('Perform login', async () => {
            await performLoginUI(page);
        });

        await test.step('Generate random data', async () => {
            randomString = generateRandomString(32);
            randomDay = generateRandomDay();
            monthCount = generateRandomMonthCount();
        });

        await test.step('Reserve a room', async () => {
            await roomPage.reserveRoom('101', randomString, randomDay, monthCount, 'MEETING');
        });

        await test.step('Verify reservation success', async () => {
            await roomPage.verifyReservationSuccess();
        });
    });
});