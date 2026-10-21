// testing/API/helpers/utils.js

/**
 * Generates a random email address for creating unique users during tests.
 * @returns {string} - Random email address.
 */
function generateRandomEmail() {
    const timestamp = Date.now();
    return `user_${timestamp}@example.com`;
}

/**
 * Generates a random date in the format "YYYY-MM-DD" between 2025 and 2040.
 * @returns {string} - Random date in "YYYY-MM-DD" format.
 */
function generateRandomDate() {
    const year = Math.floor(Math.random() * 16) + 2025; // Random year between 2025 and 2040
    const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
    const day = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28

    const randomDate = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
    return randomDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
}

/**
 * Generates random reservation data for testing.
 * @returns {Object} - Object containing random reservation data.
 */
function generateRandomReservationData() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomDescription = '';
    for (let i = 0; i < 32; i++) {
        randomDescription += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return {
        roomId: 1, 
        reservationDate: generateRandomDate(),
        startTimeSlot: Math.floor(Math.random() * 96) + 1, // Random start time slot between 1 and 96
        endTimeSlot: Math.floor(Math.random() * 96) + 1, // Random end time slot between 1 and 96
        purpose: 'MEETING', // Example purpose
        description: randomDescription
    };
}

module.exports = { generateRandomEmail, generateRandomReservationData };