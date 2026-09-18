import { AnalyticsEventRecord } from '../types';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

type EventListener = (event: AnalyticsEventRecord) => void;
const listeners: Set<EventListener> = new Set();
const eventHistory: AnalyticsEventRecord[] = [];

/**
 * Dispatches and logs an event for Google Analytics tracking.
 * If window.gtag exists (when the student installs the GA tag later), it forwards the event.
 * Also logs to developer console and notifies any UI inspectors.
 */
export function trackAnalyticsEvent(
  eventName: string,
  payload: Record<string, unknown> = {}
) {
  const eventRecord: AnalyticsEventRecord = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString('pt-BR'),
    eventName,
    payload,
  };

  eventHistory.unshift(eventRecord);
  if (eventHistory.length > 50) {
    eventHistory.pop();
  }

  // 1. Send to Google Analytics if window.gtag is available
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, payload);
    } catch (e) {
      console.warn('[Google Analytics] Erro ao disparar evento:', e);
    }
  } else if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        ...payload,
      });
    } catch (e) {
      console.warn('[DataLayer] Erro ao empurrar evento:', e);
    }
  }

  // 2. Log in console for student/professor verification in SENAI grading
  console.log(`📊 [SENAI Analytics Event] ${eventName}:`, payload);

  // 3. Notify UI listeners (e.g. Analytics Monitor bar)
  listeners.forEach((listener) => {
    try {
      listener(eventRecord);
    } catch (e) {
      console.error(e);
    }
  });

  return eventRecord;
}

export function subscribeToAnalytics(listener: EventListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getAnalyticsHistory(): AnalyticsEventRecord[] {
  return [...eventHistory];
}

export function clearAnalyticsHistory(): void {
  eventHistory.length = 0;
}
