const express = require('express');
const statusRoutes = require('./routes/status');

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

    // Application routes.
    app.use('/api', statusRoutes);

    return app;
}

module.exports = createApp;
