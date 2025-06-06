/**
 * controlPanel.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Initial Control Panel, basic functions implemented.
 * v1.1 | 2025-07-12 - Extensions regarding failure injection and configuration adjustments.
 * v1.2 | 2025-10-07 - Integrated "Clear All Nodes" button and layout adjustments per internal norm.
 * v1.3 | 2025-11-05 - Updated Node Management: added predefined status selection (Online, Offline, Maintenance).
 * v1.4 | 2025-11-xx - Fixed timing issues in update of failure selectors.
 * v1.5 | 2025-11-xx - Added "Replay Simulation" button.
 * v1.6 | 2025-11-yy - Added error handling and validation in Node/Link creation.
 */
import Node from '../models/Node.js';
import Link from '../models/Link.js';

export default class ControlPanel {
  /**
   * @param {HTMLElement} container - Container element for the control panel.
   * @param {Array} nodes - Global array of nodes.
   * @param {Array} links - Global array of links.
   * @param {EventBus} eventBus - Central EventBus instance.
   * @param {Configuration} config - Simulation configuration.
   * @param {SimulationEngine} simulationEngine - The simulation engine.
   * @param {Dashboard} dashboard - The dashboard module.
   */
  constructor(container, nodes, links, eventBus, config, simulationEngine, dashboard) {
    this.container = container;
    this.nodes = nodes;
    this.links = links;
    this.eventBus = eventBus;
    this.config = config;
    this.simulationEngine = simulationEngine;
    this.dashboard = dashboard;
    this.initUI();
  }
  
  initUI() {
    this.container.innerHTML = `
      <h3>Control Panel</h3>
      <section id="simulationControl">
        <h4>Simulation Control</h4>
        <button id="startSimBtn">Start Simulation</button>
        <button id="stopSimBtn">Stop Simulation</button>
        <button id="startDashBtn">Start Dashboard</button>
        <button id="stopDashBtn">Stop Dashboard</button>
      </section>
      <section id="nodeManagement">
        <h4>Node Management</h4>
        <input type="text" id="nodeName" placeholder="Node Name" />
        <label for="nodeStatus">Status:</label>
        <select id="nodeStatus">
          <option value="online">Online</option>
          <option value="failed">Offline</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <input type="number" id="nodeCapacity" placeholder="Capacity" value="100" />
        <button id="addNodeBtn">Add Node</button>
        <button id="clearNodesBtn">Clear All Nodes</button>
      </section>
      <section id="linkManagement">
        <h4>Link Management</h4>
        <input type="text" id="linkSource" placeholder="Source Node Name" />
        <input type="text" id="linkTarget" placeholder="Target Node Name" />
        <input type="number" id="baseLatency" placeholder="Base Latency" value="5" />
        <button id="addLinkBtn">Add Link</button>
      </section>
      <section id="failureControl">
        <h4>Failure Control</h4>
        <div>
          <select id="failureNodeSelect"></select>
          <button id="triggerNodeFailureBtn">Trigger Node Failure</button>
        </div>
        <div>
          <select id="failureLinkSelect"></select>
          <button id="triggerLinkFailureBtn">Trigger Link Failure</button>
        </div>
      </section>
      <section id="simulationConfig">
        <h4>Simulation Configuration</h4>
        <input type="number" id="tickFrequency" placeholder="Tick Frequency" />
        <input type="number" id="trafficMin" placeholder="Traffic Min" />
        <input type="number" id="trafficMax" placeholder="Traffic Max" />
        <div>
          <input type="number" step="0.01" id="failureProb" placeholder="Failure Probability" value="0.1"/>
          <small>Probability of a failure occurring</small>
        </div>
        <button id="updateConfigBtn">Update Config</button>
      </section>
      <!-- New section for Replay -->
      <section id="replayControl">
        <h4>Replay</h4>
        <button id="replayBtn">Replay Simulation</button>
      </section>
    `;
    this.setEventListeners();
    // Use setTimeout to ensure updated data in the dropdowns.
    this.eventBus.subscribe("nodeAdded", () => setTimeout(() => this.updateFailureSelectors(), 0));
    this.eventBus.subscribe("linkAdded", () => setTimeout(() => this.updateFailureSelectors(), 0));
  }
  
  setEventListeners() {
    document.getElementById("startSimBtn").addEventListener("click", () => {
      this.simulationEngine.startSimulation();
      console.log("Simulation started via Control Panel");
    });
    document.getElementById("stopSimBtn").addEventListener("click", () => {
      this.simulationEngine.stopSimulation();
      console.log("Simulation stopped via Control Panel");
    });
    document.getElementById("startDashBtn").addEventListener("click", () => {
      this.dashboard.startUpdates();
      console.log("Dashboard updates started via Control Panel");
    });
    document.getElementById("stopDashBtn").addEventListener("click", () => {
      this.dashboard.stopUpdates();
      console.log("Dashboard updates stopped via Control Panel");
    });
    document.getElementById("addNodeBtn").addEventListener("click", () => this.addNode());
    document.getElementById("addLinkBtn").addEventListener("click", () => this.addLink());
    document.getElementById("triggerNodeFailureBtn").addEventListener("click", () => this.triggerNodeFailure());
    document.getElementById("triggerLinkFailureBtn").addEventListener("click", () => this.triggerLinkFailure());
    document.getElementById("updateConfigBtn").addEventListener("click", () => this.updateConfig());
    document.getElementById("clearNodesBtn").addEventListener("click", () => this.clearNodes());
    document.getElementById("replayBtn").addEventListener("click", () => {
      console.log("Replay button clicked.");
      // This uses the globally available replayStates() defined in index.js
      window.replayStates();
    });
  }
  
  // Validate input and add a new node.
  addNode() {
    const name = document.getElementById("nodeName").value.trim();
    if (!name) {
      alert("Node name cannot be empty.");
      return;
    }
    const status = document.getElementById("nodeStatus").value;
    const capacity = parseInt(document.getElementById("nodeCapacity").value, 10);
    // Generate a unique ID.
    const id = Math.random().toString(36).substr(2, 9);
    const newNode = new Node(id, name, status, capacity, 0);
    console.log("New Node created:", newNode);
    this.eventBus.publish("nodeAdded", { node: newNode });
  }
  
  // Validate and add a new link.
  addLink() {
    const sourceName = document.getElementById("linkSource").value.trim();
    const targetName = document.getElementById("linkTarget").value.trim();
    if (!sourceName || !targetName) {
      alert("Both Source and Target node names must be provided.");
      return;
    }
    // Suche die zugehörigen Nodes anhand ihres Namens.
    const sourceNode = this.nodes.find(n => n.name === sourceName);
    const targetNode = this.nodes.find(n => n.name === targetName);
    if (!sourceNode) {
      alert(`Source node "${sourceName}" does not exist.`);
      return;
    }
    if (!targetNode) {
      alert(`Target node "${targetName}" does not exist.`);
      return;
    }
    // Falls einer der Nodes den Status "failed" hat (offline), verhindern wir die Link-Erstellung.
    if (sourceNode.status === "failed" || targetNode.status === "failed") {
      alert("Cannot create link: One or both of the nodes are offline (failed).");
      return;
    }
    const baseLatency = parseInt(document.getElementById("baseLatency").value, 10);
    if (isNaN(baseLatency) || baseLatency < 0) {
      alert("Base Latency must be a positive number.");
      return;
    }
    const newLink = new Link(sourceName, targetName, baseLatency, 0, "online");
    console.log("New Link created:", newLink);
    this.eventBus.publish("linkAdded", { link: newLink });
  }
  
  clearNodes() {
    console.log("Clearing all nodes. Previous node count:", this.nodes.length);
    this.nodes.splice(0, this.nodes.length);
    this.links.splice(0, this.links.length);
    console.log("All nodes cleared. Current node count:", this.nodes.length);
    this.eventBus.publish("nodesCleared", {});
    this.simulationEngine.stopSimulation();
    this.simulationEngine.startSimulation();
  }
  
  // Trigger a node failure for the selected node.
  triggerNodeFailure() {
    const select = document.getElementById("failureNodeSelect");
    const selectedName = select.value;
    const node = this.nodes.find(n => n.name === selectedName);
    if (node) {
      node.status = "failed";
      node.traffic = 0;
      console.log("Node failure triggered for:", node);
      this.eventBus.publish("nodeFailed", { node: node });
    }
  }
  
  // Trigger link failure for the selected link.
  triggerLinkFailure() {
    const select = document.getElementById("failureLinkSelect");
    const selectedKey = select.value;
    if (!selectedKey) {
      console.log("No link selected.");
      return;
    }
    const [sourceName, targetName] = selectedKey.split("-");
    const link = this.links.find(l => {
      const sName = typeof l.source === "object" ? l.source.name : l.source;
      const tName = typeof l.target === "object" ? l.target.name : l.target;
      return sName === sourceName && tName === targetName;
    });
    if (link) {
      link.status = "failed";
      link.load = 0;
      console.log("Link failure triggered for:", link);
      this.eventBus.publish("linkFailed", { link: link });
    } else {
      console.log("No link found for key:", selectedKey);
    }
  }
  
  updateConfig() {
    const tickFrequency = parseInt(document.getElementById("tickFrequency").value, 10);
    const trafficMin = parseInt(document.getElementById("trafficMin").value, 10);
    const trafficMax = parseInt(document.getElementById("trafficMax").value, 10);
    const failureProb = parseFloat(document.getElementById("failureProb").value);
    this.config.updateSetting("tickFrequency", tickFrequency);
    this.config.updateSetting("trafficRange", { min: trafficMin, max: trafficMax });
    this.config.updateSetting("failureProbability", failureProb);
    console.log("Configuration updated via Control Panel:", this.config.getAllSettings());
    this.simulationEngine.stopSimulation();
    this.simulationEngine.startSimulation();
  }
  
  updateFailureSelectors() {
    const nodeSelect = document.getElementById("failureNodeSelect");
    nodeSelect.innerHTML = "";
    this.nodes.forEach(n => {
      const option = document.createElement("option");
      option.value = n.name;
      option.innerText = n.name;
      nodeSelect.appendChild(option);
    });
    const linkSelect = document.getElementById("failureLinkSelect");
    linkSelect.innerHTML = "";
    this.links.forEach(l => {
      const sourceName = typeof l.source === "object" ? l.source.name : l.source;
      const targetName = typeof l.target === "object" ? l.target.name : l.target;
      const key = sourceName + "-" + targetName;
      const option = document.createElement("option");
      option.value = key;
      option.innerText = key;
      linkSelect.appendChild(option);
    });
  }
}
