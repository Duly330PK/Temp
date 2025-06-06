/**
 * main.js
 * 
 * Integration module that loads the persisted state, initializes the simulation,
 * visualization (SVG, Leaflet) and the dashboard/control panel.
 * Also integrates a replay function based on the stored state history.
 * 
 * Changelog:
 * v1.0 | 2025-06052025-01-15 - Initial version with basic integration.
 * v1.1 | 2025-0605202506-01   - Adjustments in persistence and simulation.
 * v1.2 | 2025-0606202510-07   - Right column split into Dashboard and Control Panel per new standards.
 * v1.3 | 2025-0606202511-05   - Fixed duplicate node insertion by preventing double-push.
 * v1.4 | 2025-0606202511-xx   - Deduplication on load and in nodeAdded handler + added replay functionality.
 * 
 * Standards:
 * - Ausführliche Dokumentation in Kommentarblöcken.
 * - Defensive Programmierung (z. B. Prüfung, ob Elemente vorhanden sind).
 * - Saubere Trennung von Kernfunktionalitäten (Persistenz, Simulation, UI-Rendering).
 * - Modularität: Zentrale Instanzen (SimulationEngine, NetworkView, Dashboard, ControlPanel, etc.) werden
 *   über den EventBus gesteuert.
 */

'use strict';

import Node from './models/Node.js';
import Link from './models/Link.js';
import SimulationEngine from './controllers/simulationEngine.js';
import NetworkView from './views/networkView.js';
import Dashboard from './dashboard/dashboard.js';
import Configuration from './config/configuration.js';
import Persistence from './persistence/persistence.js';
import EventBus from './controllers/eventBus.js';
import ControlPanel from './ui/controlPanel.js';
import { updateDebugOverlay } from './src/debugOverlay.js';

// --- Zentralisierte Instanzen erstellen ---

// Konfiguration & Persistenz
const config = new Configuration();
const persistence = new Persistence();

// EventBus zur Nachrichtenweiterleitung
const eventBus = new EventBus();

// Leere Zustände für Knoten und Verbindungen
let nodes = [];
let links = [];

// Debug Logging Integration
const debugLogs = [];
function addDebugLog(message) {
  const timestamp = new Date().toISOString();
  debugLogs.push(`[${timestamp}] ${message}`);
  // Limit für Debug-Logs setzen
  if (debugLogs.length > 50) {
    debugLogs.shift();
  }
  updateDebugOverlay({ nodes, links }, debugLogs);
}

// --- Containergrößen für die SVG berechnen ---
const svgContainer = document.getElementById("svgContainer");
const containerWidth = svgContainer ? svgContainer.clientWidth : 800;
const containerHeight = svgContainer ? svgContainer.clientHeight : 600;

// --- Persistierten Zustand laden und Duplikate filtern ---
const savedState = persistence.loadState();
if (savedState) {
  const loadedNodes = savedState.nodes || [];
  // Deduplication basierend auf eindeutigen IDs
  nodes = loadedNodes.filter((node, index, self) =>
    index === self.findIndex(n => n.id === node.id)
  );
  links = savedState.links || [];
  console.log("Loaded saved state:", { nodes, links });
  addDebugLog("Persisted state loaded.");

  // Sicherstellen, dass geladene Knoten innerhalb der sichtbaren Grenzen sind.
  nodes.forEach((node, idx) => {
    if (
      typeof node.x !== "number" ||
      typeof node.y !== "number" ||
      node.x < 0 ||
      node.x > containerWidth ||
      node.y < 0 ||
      node.y > containerHeight
    ) {
      console.log(`Node ${idx} out of bounds (x:${node.x}, y:${node.y}), resetting to center`);
      node.x = containerWidth / 2;
      node.y = containerHeight / 2;
      addDebugLog(`Node ${node.id} reset to center.`);
    } else {
      console.log(`Node ${idx} OK at (x:${node.x}, y:${node.y})`);
    }
  });
} else {
  console.log("No saved state found. Starting with an empty simulation state.");
  addDebugLog("No persisted state; starting empty.");
  // Falls kein persistierter Zustand vorhanden ist, füge einen Testknoten hinzu.
  nodes.push({
    id: "test1",
    name: "Test Node",
    status: "online",
    capacity: 100,
    traffic: 0,
    x: containerWidth / 2,
    y: containerHeight / 2
  });
  console.log("Test node added so something is displayed.");
  addDebugLog("Test node added.");
}

// --- Kern-Komponenten initialisieren ---

// SimulationEngine: Steuert die Simulation logik
const simulationEngine = new SimulationEngine(nodes, links, eventBus, config);

// Netzwerk-Visualisierung (SVG)
const networkView = new NetworkView('svgContainer', nodes, links, eventBus);

// Dashboard: Zeigt Kennzahlen und Statistiken im rechten Bereich an
const dashboard = new Dashboard('dashboardContainer', nodes, links, eventBus);

// ControlPanel: Bedienfeld zur Steuerung der Simulation
new ControlPanel(
  document.getElementById("controlPanelContainer"),
  nodes,
  links,
  eventBus,
  config,
  simulationEngine,
  dashboard
);

// --- Leaflet Map initialisieren (falls vorhanden) ---
const mapContainer = document.getElementById("mapContainer");
let mapInstance = null;
if (mapContainer) {
  // Initialisiere die Karte centriert auf Deutschland
  mapInstance = L.map(mapContainer).setView([51.1657, 10.4515], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);
  setTimeout(() => {
    mapInstance.invalidateSize();
  }, 500);
}

// --- EventBus-Subscriptions ---
// Knoten hinzufügen behandeln: Doppelte Einfügungen verhindern
eventBus.subscribe('nodeAdded', data => {
  // Setze Standardposition falls x oder y fehlen
  if (data.node.x === null || data.node.y === null) {
    data.node.x = containerWidth / 2;
    data.node.y = containerHeight / 2;
  }
  if (!nodes.some(n => n.id === data.node.id)) {
    nodes.push(data.node);
    console.log("nodeAdded:", data.node, "Current node count:", nodes.length);
    addDebugLog(`Node ${data.node.id} added. Total: ${nodes.length}`);
  } else {
    console.log("nodeAdded event ignored; node already exists:", data.node);
    addDebugLog(`Duplicate node ${data.node.id} ignored.`);
  }
  networkView.render();
});

// Link hinzufügen
eventBus.subscribe('linkAdded', data => {
  links.push(data.link);
  console.log("linkAdded:", data.link, "Current link count:", links.length);
  addDebugLog(`Link added. Total: ${links.length}`);
  networkView.render();
});

// Simulationstakt
eventBus.subscribe('simulationTick', () => {
  console.log("Simulation tick – Current node count:", nodes.length);
  addDebugLog("Simulation tick executed.");
  nodes.forEach((n, i) => console.log(`Tick - Node ${i}: x=${n.x}, y=${n.y}`));
  networkView.render();
});

// --- Simulation und Rendering starten ---
simulationEngine.startSimulation();
networkView.render();
addDebugLog("Simulation started.");

// Dashboard-Metriken aktuell halten (jede Sekunde aktualisieren)
setInterval(() => {
  dashboard.updateMetrics();
}, 1000);

// Zustand alle 5 Sekunden speichern
setInterval(() => {
  persistence.saveState({ nodes, links });
  addDebugLog("State saved to persistence.");
}, 5000);

// Zustand beim Verlassen des Fensters sichern
window.addEventListener('beforeunload', () => {
  persistence.saveState({ nodes, links });
  addDebugLog("State saved on unload.");
});

/* Replay Funktionalität */
// Die Funktion replayStates lädt die state history und spielt alle Zustände
// im Intervall von 1 Sekunde ab.
function replayStates(persistence, networkView) {
  const history = persistence.loadStateHistory();
  if (history.length === 0) {
    console.log("No state history available for replay.");
    addDebugLog("Replay aborted – no state history.");
    return;
  }
  let index = 0;
  console.log("Starting replay. Total states:", history.length);
  addDebugLog(`Starting replay of ${history.length} states.`);
  const intervalId = setInterval(() => {
    if (index >= history.length) {
      clearInterval(intervalId);
      console.log("Replay finished.");
      addDebugLog("Replay finished.");
      return;
    }
    const snapshot = history[index].state;
    console.log(`Replaying state ${index + 1}/${history.length} from ${new Date(history[index].timestamp).toLocaleTimeString()}`);
    addDebugLog(`Replaying state ${index + 1} of ${history.length}.`);
    // Aktualisiere die Visualisierung anhand des Snapshots.
    networkView.nodes.splice(0, networkView.nodes.length, ...snapshot.nodes);
    networkView.links.splice(0, networkView.links.length, ...snapshot.links);
    networkView.render();
    index++;
  }, 1000);
}

// Replay-Funktion global verfügbar machen, sodass das Control Panel sie aufrufen kann.
window.replayStates = () => replayStates(persistence, networkView);
