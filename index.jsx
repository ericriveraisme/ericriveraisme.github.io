import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import App from './FF6PortfolioApp.jsx';
import LabLogsPage from './src/pages/LabLogsPage.jsx';
import LabArticlePage from './src/pages/LabArticlePage.jsx';
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

const redirectPath = sessionStorage.getItem('redirect');
if (redirectPath) {
  sessionStorage.removeItem('redirect');
  const isSafeRedirect =
    redirectPath.startsWith('/') &&
    !redirectPath.startsWith('//') &&
    !redirectPath.includes('\\');

  if (isSafeRedirect) {
    window.history.replaceState(null, '', redirectPath);
  }
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/lab-logs" element={<LabLogsPage />} />
      <Route path="/lab-logs/:slug" element={<LabArticlePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
