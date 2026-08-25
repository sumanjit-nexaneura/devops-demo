// Test the Express app in-process with supertest — no network, no port,
// so nothing (including any proxy) can interfere.
const request = require('supertest');
const createApp = require('../src/app');

const app = createApp();

describe('devops-demo', () => {
    test('GET /health returns 200 and status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    test('GET / returns a message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

    test('unknown route returns 404', async () => {
        const res = await request(app).get('/does-not-exist');
        expect(res.status).toBe(404);
    });
});