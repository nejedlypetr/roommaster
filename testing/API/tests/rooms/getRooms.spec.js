// testing/API/tests/rooms/getRooms.spec.js
const { test, expect, request } = require('@playwright/test');
const { loginAsMaintainer } = require('../../helpers/auth');

test.describe('Room Management Endpoints - Get All Rooms', () => {
    let token;

    test.beforeEach(async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        token = await loginAsMaintainer(context);
    });

    test('Maintainer can retrieve all rooms', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });
        const response = await context.get('/v1/rooms', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        expect(response.status()).toBe(200);
    });

    test('Unauthenticated request cannot retrieve rooms (Unauthorized)', async () => {
        const context = await request.newContext({
            baseURL: process.env.API_BASE_URL,
        });

        const response = await context.get('/v1/rooms');

        expect(response.status()).toBe(401);
    });
});
