/**
 * dashboard.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Basis-Dashboard zur Anzeige von Knoten- und Link-Metriken.
 * v1.1 | 2025-05-01 - Integration dynamischer Traffic-Angaben.
 * v1.2 | 2025-10-07 - Verbesserte Darstellung und periodisches Update gemäß neuer Norm.
 */
export default class Dashboard {
  constructor(containerId, nodes, links, eventBus) {
    this.container = document.getElementById(containerId);
    this.nodes = nodes;
    this.links = links;
    this.eventBus = eventBus;
    this.intervalId = null;
  }
  
  updateMetrics() {
    if (!this.container) return;
    const nodeCount = this.nodes.length;
    const linkCount = this.links.length;
    const avgTraffic = nodeCount > 0
      ? (this.nodes.reduce((sum, n) => sum + (n.traffic || 0), 0) / nodeCount).toFixed(2)
      : 0;
    this.container.innerHTML = `
      <h3>Dashboard</h3>
      <p>Knoten: ${nodeCount}</p>
      <p>Links: ${linkCount}</p>
      <p>Durchschnittlicher Traffic: ${avgTraffic}</p>
    `;
  }
  
  startUpdates() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.updateMetrics(), 1000);
    console.log("Dashboard-Updates gestartet.");
  }
  
  stopUpdates() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Dashboard-Updates gestoppt.");
    }
  }
}
