const express = require('express');
const { version, name } = require('../../package.json');

const router = express.Router();

// Service metadata — useful after a deploy to confirm which build is live
// and which environment it thinks it is running in.
router.get('/status', (req, res) => {
    res.status(200).json({
        service: name,
        version,
        environment: process.env.NODE_ENV || 'development',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
