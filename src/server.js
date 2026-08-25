const createApp = require('./app');

const app = createApp();
const port = parseInt(process.env.PORT || '8080', 10);

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// Graceful shutdown — Cloud Run sends SIGTERM when recycling instances.
process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});