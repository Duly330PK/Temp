/**
 * eventBus.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Basale Publish/Subscribe-Implementierung.
 * v1.1 | 2025-04-10 - Kleinere Bugfixes im Subscription-Mechanismus.
 * v1.2 | 2025-10-07 - Verbesserte Verwaltung der Event-Listeners gemäß aktueller Norm.
 */
export default class EventBus {
  constructor() {
    this.events = {};
  }
  
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  
  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
}
