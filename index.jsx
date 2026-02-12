import React from 'react';
import { createRoot } from 'react-dom/client';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import App from './FF6PortfolioApp.jsx';
import './src/tailwind.css';
import './assets/styles.css';

// Log Web Vitals to console for performance monitoring
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
