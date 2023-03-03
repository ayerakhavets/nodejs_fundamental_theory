import express from 'express';
import loaders from './loaders';
import config from './config';

async function startServer() {
  const app = express();
  await loaders({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`
      ===========================================
      Server is listening on port: ${config.port}
      ===========================================
    `);
  });
}

startServer();
