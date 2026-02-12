import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import App from './FF6PortfolioApp.jsx';
import './src/tailwind.css';
import './assets/styles.css';

// Initialize Sentry for error tracking in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0', // Replace with your Sentry DSN
    integrations: [
      new BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });
}

// Log Web Vitals to console (can integrate with analytics later)
onCLS(metric => console.debug('CLS:', metric.value));
onFID(metric => console.debug('FID:', metric.value));
onFCP(metric => console.debug('FCP:', metric.value));
onLCP(metric => console.debug('LCP:', metric.value));
onTTFB(metric => console.debug('TTFB:', metric.value));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
