/**
 * Performance Monitoring Utilities
 * Tracks and reports Web Vitals and error metrics
 */

import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/react';

/**
 * Initialize Web Vitals monitoring
 * Reports Core Web Vitals to console and Sentry (if configured)
 */
export const initializeWebVitals = () => {
  const metrics = {
    CLS: null, // Cumulative Layout Shift
    FID: null, // First Input Delay
    FCP: null, // First Contentful Paint
    LCP: null, // Largest Contentful Paint
    TTFB: null, // Time to First Byte
  };

  onCLS(metric => {
    metrics.CLS = metric.value;
    console.debug('[Web Vitals] CLS:', metric.value);
    if (metric.value > 0.1) {
      Sentry.captureMessage('High CLS detected', 'warning');
    }
  });

  onFID(metric => {
    metrics.FID = metric.value;
    console.debug('[Web Vitals] FID:', metric.value);
    if (metric.value > 100) {
      Sentry.captureMessage('High FID detected', 'warning');
    }
  });

  onFCP(metric => {
    metrics.FCP = metric.value;
    console.debug('[Web Vitals] FCP:', metric.value);
  });

  onLCP(metric => {
    metrics.LCP = metric.value;
    console.debug('[Web Vitals] LCP:', metric.value);
    if (metric.value > 2500) {
      Sentry.captureMessage('High LCP detected', 'warning');
    }
  });

  onTTFB(metric => {
    metrics.TTFB = metric.value;
    console.debug('[Web Vitals] TTFB:', metric.value);
  });

  return metrics;
};

/**
 * Capture custom event for Sentry
 * @param {string} eventName - Name of the event
 * @param {object} data - Event data
 */
export const captureEvent = (eventName, data = {}) => {
  console.debug('[Event]', eventName, data);
  if (typeof Sentry !== 'undefined' && Sentry.captureMessage) {
    Sentry.captureMessage(eventName, 'info');
  }
};

/**
 * Report performance timing
 * @param {string} name - Name of the timing
 * @param {number} duration - Duration in milliseconds
 */
export const reportTiming = (name, duration) => {
  console.debug('[Timing]', name, `${duration}ms`);
  if (typeof Sentry !== 'undefined' && Sentry.captureMessage) {
    if (duration > 1000) {
      Sentry.captureMessage(`Slow operation: ${name} took ${duration}ms`, 'warning');
    }
  }
};
