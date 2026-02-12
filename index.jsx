import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import App from './FF6PortfolioApp.jsx';
import './src/tailwind.css';
import './assets/styles.css';

// Initialize Sentry for error tracking
Sentry.init({
  dsn: 'https://24f9dcf084a6bdb298e927853664023b@o4510873013125120.ingest.us.sentry.io/4510873015287808',
  integrations: [
    new BrowserTracing(),
  ],
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
  sendDefaultPii: true,
});

// Log Web Vitals to console (can integrate with analytics later)
onCLS(metric => console.debug('CLS:', metric.value));
onINP(metric => console.debug('INP:', metric.value));
onFCP(metric => console.debug('FCP:', metric.value));
onLCP(metric => console.debug('LCP:', metric.value));
onTTFB(metric => console.debug('TTFB:', metric.value));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
