import { initializeApp } from 'firebase-admin/app';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import { createApp } from './infrastructure/http/create-app';
import { getWiring } from './infrastructure/config/wiring';

initializeApp();

setGlobalOptions({ region: 'us-central1', maxInstances: 10 });

let expressApp: ReturnType<typeof createApp> | null = null;

function getExpressApp(): ReturnType<typeof createApp> {
  if (!expressApp) {
    const { factory, tokens } = getWiring();
    expressApp = createApp(factory, tokens);
  }
  return expressApp;
}

export const api = onRequest((req, res) => {
  getExpressApp()(req, res);
});
