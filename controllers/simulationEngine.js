/**
 * simulationEngine.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Erste Version, löst regelmäßige Simulationsticks aus.
 * v1.1 | 2025-06-01 - Optimierung der Tick-Frequenz und Traffic-Updates.
 * v1.2 | 2025-10-07 - Erweiterte Tick-Logik und Einbindung der Konfiguration gemäß neuer Norm.
 */
export default class SimulationEngine {
  constructor(nodes, links, eventBus, config) {
    this.nodes = nodes;
    this.links = links;
    this.eventBus = eventBus;
    this.config = config;
    this.intervalId = null;
  }
  
  startSimulation() {
    if (this.intervalId) return; // Bereits gestartet
    this.intervalId = setInterval(() => {
      this.nodes.forEach(node => {
        const delta = Math.floor(Math.random() * 50) - 25;
        node.traffic = Math.max(0, (node.traffic || 0) + delta);
      });
      this.eventBus.publish("simulationTick", {});
    }, this.config.settings.tickFrequency);
    console.log("Simulation gestartet!");
  }
  
  stopSimulation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Simulation gestoppt!");
    }
  }
}
