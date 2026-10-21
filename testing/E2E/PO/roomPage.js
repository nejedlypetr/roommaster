const { expect } = require('@playwright/test');

class RoomPage {
    constructor(page) {
        this.page = page;

        // Room Selection
        this.selectRoomButton = (roomNumber) => `text=${roomNumber}`;

        // Reservation Elements
        this.reserveButton = 'button:text("Reserve now!")';
        this.descriptionField = 'textarea[name="description"]';
        this.purposeDropdown = 'span:text("Select purpose")';
        this.purposeOption = (purposeText) => `div[role="option"]:has-text("${purposeText}")`;
        this.dateButton = 'label:text("Date") + button[aria-haspopup="dialog"]';
        this.nextMonthButton = 'button[name="next-month"]';
        this.dayButton = (day) => `button[name="day"]:has-text("${day}")`;
        this.startTimeButton = 'label:text("Start Time") + button[aria-haspopup="dialog"]';
        this.endTimeButton = 'label:text("End Time") + button[aria-haspopup="dialog"]';
        this.reserveRoomButton = 'button:text("Reserve Room")';
        this.successMessage = 'text=Your room reservation has been created.';

        // Fault Reporting Elements
        this.addFaultButton = 'button:text("Add fault")';
        this.causeField = 'input[name="cause"]';
        this.descriptionFieldFault = 'textarea[name="description"]';
        this.submitFaultButton = 'button:text("Add room fault")';
        this.faultSuccessMessage = 'text=Fault added successfully';
        this.faultLogSection = 'text=Fault Log';

        // Cancel Reservation Elements
        this.reservationsTable = 'table';
        this.reservationDateButton = 'button:has-text("Reservation Date")';
        this.ellipsisButton = 'button[aria-haspopup="menu"]';
        this.cancelMenuItem = 'div[role="menuitem"]:text-is("Cancel")';
        this.statusCell = (row) => row.locator('td').nth(4); // Assuming 5th column is Status
    }

    // Room Selection Method
    async selectRoom(roomNumber) {
        await this.page.click(this.selectRoomButton(roomNumber));
    }

    // Reservation Method
    async reserveRoom(roomNumber, randomString, randomDay, monthCount, purposeText = 'MEETING') {
        await this.selectRoom(roomNumber);
        await this.page.click(this.reserveButton);
        await this.page.fill(this.descriptionField, randomString);
        await this.selectPurpose(purposeText);
        await this.page.click(this.dateButton);

        // Select Month
        for (let i = 0; i < monthCount; i++) {
            await this.page.click(this.nextMonthButton);
        }

        // Select Day
        await this.page.click(this.dayButton(randomDay));
        await this.page.click(this.dateButton);

        // Select Time
        await this.page.click(this.startTimeButton);
        await this.page.click('div.flex.flex-col.p-2 button:first-child');
        await this.page.click(this.endTimeButton);
        await this.page.click('div.flex.flex-col.p-2 button:last-child');
        await this.page.click(this.endTimeButton);

        // Reserve Room
        await this.page.click(this.reserveRoomButton);
    }

    // Method to Select Purpose
    async selectPurpose(purposeText) {
        await this.page.click(this.purposeDropdown);
        await this.page.click(this.purposeOption(purposeText));
    }

    async verifyReservationSuccess() {
        await expect(this.page.locator(this.successMessage).nth(1)).toBeVisible({ timeout: 3000 });
    }

    // Cancel Reservation Methods
    async clickReservationDateButton() {
        await this.page.click(this.reservationDateButton);
    }

    async waitForReservationsTable() {
        await this.page.waitForSelector(this.reservationsTable);
    }

    async getRowByDescription(description) {
        return this.page.locator('table tbody tr').filter({
            has: this.page.locator(`td:has-text("${description}")`)
        });
    }

    async clickEllipsisButton(row) {
        const ellipsisButton = row.locator(this.ellipsisButton);
        await ellipsisButton.click();
    }

    async clickCancelMenuItem() {
        await this.page.click(this.cancelMenuItem);
    }

    async verifyReservationCancelled(row) {
        const statusCell = this.statusCell(row);
        await expect(statusCell).toContainText('CANCELLED');
    }

    // Fault Reporting Methods
    async navigateToFaultLog() {
        await this.page.click(this.faultLogSection);
    }

    async clickAddFault() {
        await this.page.click(this.addFaultButton);
    }

    async fillFaultReport(cause, description) {
        await this.page.fill(this.causeField, cause);
        await this.page.fill(this.descriptionFieldFault, description);
    }

    async submitFaultReport() {
        await this.page.click(this.submitFaultButton);
    }

    async verifyFaultAdded() {
        await expect(this.page.locator(this.faultSuccessMessage).nth(1)).toBeVisible({ timeout: 3000 });
    }
}

module.exports = RoomPage; 