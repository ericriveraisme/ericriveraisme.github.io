import React from 'react';
import { createRoot } from 'react-dom/client';
// import * as Sentry from '@sentry/react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import App from './FF6PortfolioApp.jsx';
import './src/tailwind.css';
import './assets/styles.css';

// TODO: Re-enable Sentry after debugging initialization error
// Initialize Sentry for error tracking (simplified)
// try {
//   Sentry.init({
//     dsn: 'https://24f9dcf084a6bdb298e927853664023b@o4510873013125120.ingest.us.sentry.io/4510873015287808',
//     environment: process.env.NODE_ENV,
//     sendDefaultPii: true,
//     tracesSampleRate: 0.1,
//   });
// } catch (err) {
//   console.warn('Sentry initialization failed:', err);
// }

// Log Web Vitals to console
try {
  onCLS(metric => console.debug('CLS:', metric.value));
  onINP(metric => console.debug('INP:', metric.value));
  onFCP(metric => console.debug('FCP:', metric.value));
  onLCP(metric => console.debug('LCP:', metric.value));
  onTTFB(metric => console.debug('TTFB:', metric.value));
} catch (err) {
  console.warn('Web Vitals initialization failed:', err);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
