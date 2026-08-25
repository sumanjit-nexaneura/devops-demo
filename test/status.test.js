const request = require('supertest');
const createApp = require('../src/app');
const { version, name } = require('../package.json');

const app = createApp();

describe('GET /api/status', () => {
    test('returns 200', async () => {
        const res = await request(app).get('/api/status');
        expect(res.status).toBe(200);
    });

    test('reports the service name and version from package.json', async () => {
        const res = await request(app).get('/api/status');
        expect(res.body.service).toBe(name);
        expect(res.body.version).toBe(version);
    });

    test('reports uptime as a non-negative whole number', async () => {
        const res = await request(app).get('/api/status');
        expect(Number.isInteger(res.body.uptimeSeconds)).toBe(true);
        expect(res.body.uptimeSeconds).toBeGreaterThanOrEqual(0);
    });

    test('reports a valid ISO timestamp', async () => {
        const res = await request(app).get('/api/status');
        expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
    });
});
