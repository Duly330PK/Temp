/**
 * index.js
 * 
 * Integration module that loads the persisted state, initializes the simulation,
 * visualization (SVG, Leaflet) and the dashboard/control panel.
 * Also integrates a replay function based on the stored state history.
 * 
 * Patch Notes:
 * v1.0 | 2025-06052025-01-15 - Initial version with basic integration.
 * v1.1 | 2025-06052025-06-01 - Adjustments in persistence and simulation.
 * v1.2 | 2025-06062025-10-07 - Right column split into Dashboard and Control Panel per new standards.
 * v1.3 | 2025-06062025-11-05 - Fixed duplicate node insertion by preventing double-push.
 * v1.4 | 2025-06062025-11-xx - Deduplication on load and in nodeAdded handler + added replay functionality.
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

// Create central instances
const config = new Configuration();
const persistence = new Persistence();
const eventBus = new EventBus();

let nodes = [];
let links = [];

// Debug logging integration
const debugLogs = [];
function addDebugLog(message) {
  const timestamp = new Date().toISOString();
  debugLogs.push(`[${timestamp}] ${message}`);
  // Limitiere die Anzahl der Logs, um Speicher zu sparen
  if (debugLogs.length > 50) {
    debugLogs.shift();
  }
  // Aktualisiere das Debug-Overlay
  updateDebugOverlay({ nodes, links }, debugLogs);
}

// Get the container dimensions for SVG
const svgContainer = document.getElementById("svgContainer");
const containerWidth = svgContainer ? svgContainer.clientWidth : 800;
const containerHeight = svgContainer ? svgContainer.clientHeight : 600;

// Load persisted state if available and filter duplicates
const savedState = persistence.loadState();
if (savedState) {
  const loadedNodes = savedState.nodes || [];
  // Deduplicate nodes based on unique id.
  nodes = loadedNodes.filter((node, index, self) =>
    index === self.findIndex(n => n.id === node.id)
  );
  links = savedState.links || [];
  console.log("Loaded saved state:", { nodes, links });
  addDebugLog("Persisted state loaded.");

  // Ensure loaded nodes are within visible bounds.
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
  // Add a test node if no persisted state exists.
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

// Initialize SimulationEngine
const simulationEngine = new SimulationEngine(nodes, links, eventBus, config);

// Initialize Visualization (SVG)
const networkView = new NetworkView('svgContainer', nodes, links, eventBus);
// Initialize Dashboard in its container (dashboardContainer)
const dashboard = new Dashboard('dashboardContainer', nodes, links, eventBus);
// Initialize Control Panel in its container (controlPanelContainer)
new ControlPanel(document.getElementById("controlPanelContainer"), nodes, links, eventBus, config, simulationEngine, dashboard);

// Initialize interactive map with Leaflet
const mapContainer = document.getElementById("mapContainer");
let mapInstance = null;
if (mapContainer) {
  mapInstance = L.map(mapContainer).setView([51.1657, 10.4515], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);
  setTimeout(() => {
    mapInstance.invalidateSize();
  }, 500);
}

// EventBus: Handle new node addition – prevent duplicates.
eventBus.subscribe('nodeAdded', data => {
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

// EventBus: Handle new link addition.
eventBus.subscribe('linkAdded', data => {
  links.push(data.link);
  console.log("linkAdded:", data.link, "Current link count:", links.length);
  addDebugLog(`Link added. Total: ${links.length}`);
  networkView.render();
});

// EventBus: Simulation tick.
eventBus.subscribe('simulationTick', () => {
  console.log("Simulation tick – Current node count:", nodes.length);
  addDebugLog("Simulation tick executed.");
  nodes.forEach((n, i) => console.log(`Tick - Node ${i}: x=${n.x}, y=${n.y}`));
  networkView.render();
});

// Start simulation and force initial rendering.
simulationEngine.startSimulation();
networkView.render();
addDebugLog("Simulation started.");

// Update Dashboard metrics every 1 second.
setInterval(() => {
  dashboard.updateMetrics();
}, 1000);

// Save state every 5 seconds.
setInterval(() => {
  persistence.saveState({ nodes, links });
  addDebugLog("State saved to persistence.");
}, 5000);

// Save state on window unload.
window.addEventListener('beforeunload', () => {
  persistence.saveState({ nodes, links });
  addDebugLog("State saved on unload.");
});

/* Replay Functionality */

// The replayStates function loads the state history from persistence and then
// iterates through all snapshots (every second) to update the networkView.
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
    // Update networkView nodes and links with the snapshot.
    networkView.nodes.splice(0, networkView.nodes.length, ...snapshot.nodes);
    networkView.links.splice(0, networkView.links.length, ...snapshot.links);
    networkView.render();
    index++;
  }, 1000);
}

// Export the replay function globally so it can be called from the Control Panel.
window.replayStates = () => replayStates(persistence, networkView);
