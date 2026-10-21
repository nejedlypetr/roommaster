const { test, expect } = require('@playwright/test');
const { performLoginUI } = require('../helpers/auth');
const RoomPage = require('../PO/roomPage');

test.describe('Report a Fault', () => {
    test('User can report a fault for a room', async ({ page }) => {
        const roomPage = new RoomPage(page);

        await test.step('Perform login', async () => {
            await performLoginUI(page);
        });

        await test.step('Select a specific room', async () => {
            await roomPage.selectRoom('101');
        });

        await test.step('Navigate to Fault Log section', async () => {
            await roomPage.navigateToFaultLog();
        });

        await test.step('Click on "Add fault" button', async () => {
            await roomPage.clickAddFault();
        });

        await test.step('Fill out the fault report form', async () => {
            await roomPage.fillFaultReport('Broken Projector', 'The projector in the conference room is not working.');
        });

        await test.step('Submit the fault report', async () => {
            await roomPage.submitFaultReport();
        });

        await test.step('Verify fault report success', async () => {
            await roomPage.verifyFaultAdded();
        });
    });
});