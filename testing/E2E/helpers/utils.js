// testing/E2E/helpers/utils.js

function generateRandomUsername() {
    const timestamp = Date.now();
    return `user_${timestamp}`;
}

function generateRandomDay() {
    // Generate a random number between 1 and 28 (inclusive)
    return Math.floor(Math.random() * 28) + 1;
}

function generateRandomMonthCount() {
    // Generate a random number between 1 and 10 (inclusive)
    return Math.floor(Math.random() * 10) + 1;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports = { 
    generateRandomUsername,
    generateRandomDay,
    generateRandomMonthCount,
    generateRandomString
};
