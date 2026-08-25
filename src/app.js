const express = require('express');

function createApp() {
    const app = express();

    // Health check — Cloud Run and uptime checks hit this.
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok', uptime: process.uptime() });
    });

    // Sample route.
    app.get('/', (req, res) => {
        res.json({ message: 'Hello from DevOps Demo V2' });
    });

    return app;
}

module.exports = createApp;
