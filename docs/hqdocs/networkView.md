/**
 * networkView.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Grundlegende SVG-Visualisierung mit d3-force.
 * v1.1 | 2025-06-01 - Verbesserung der Node- und Link-Darstellung.
 * v1.2 | 2025-10-07 - Erweiterung um Hover-Tooltips und Anpassung der Force-Parameter gemäß Norm.
 * v1.3 | 2025-11-xx - Änderung der Node-Farben: Online-Knoten grün, Failed rot, Maintenance orange, Offline grau.
 * v1.4 | 2025-xx-xx - getNodeColor angepasst: Falls node.status nicht als String vorliegt, wird node.coordinates ausgewertet.
 *
 * Standards:
 * - Ausführliche Dokumentation in Kommentarblöcken.
 * - Nutzung moderner ES-Module via Import Maps.
 * - Defensive Programmierung und klare Trennung von UI-Zuständen.
 */

import * as d3 from "d3";
import Node from "../models/Node.js";
import Link from "../models/Link.js";
import SimulationEngine from "../controllers/simulationEngine.js";
import Dashboard from "../dashboard/dashboard.js";
import Configuration from "../config/configuration.js";
import Persistence from "../persistence/persistence.js";
import EventBus from "../controllers/eventBus.js";
import ControlPanel from "../ui/controlPanel.js";

export default class NetworkView {
  constructor(container, nodes = [], links = [], eventBus) {
    this.container =
      typeof container === "string"
        ? document.getElementById(container)
        : container;
    if (!this.container) {
      console.error("Visualization container not found!");
      return;
    }
    
    this.nodes = nodes;
    this.links = links;
    this.eventBus = eventBus;
    this.svgNS = "http://www.w3.org/2000/svg";
    
    const containerWidth = this.container.clientWidth || 800;
    const containerHeight = this.container.clientHeight || 600;
    
    this.svg = document.createElementNS(this.svgNS, "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    this.svg.setAttribute("viewBox", `0 0 ${containerWidth} ${containerHeight}`);
    this.container.appendChild(this.svg);
    
    // Gruppen für Links und Nodes
    this.linkGroup = document.createElementNS(this.svgNS, "g");
    this.nodeGroup = document.createElementNS(this.svgNS, "g");
    this.svg.appendChild(this.linkGroup);
    this.svg.appendChild(this.nodeGroup);
    
    // d3-force Simulation mit angepassten Kräften
    this.simulation = d3.forceSimulation(this.nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2).strength(0.2))
      .force("x", d3.forceX(containerWidth / 2).strength(0.1))
      .force("y", d3.forceY(containerHeight / 2).strength(0.1))
      .force("collision", d3.forceCollide(35))
      .on("tick", () => this.ticked());
  }
  
  ticked() {
    this.clear();
    this.drawLinks();
    this.drawNodes();
  }
  
  drawNodes() {
    this.nodes.forEach(node => {
      if (node.x == null || node.y == null) return;
      
      // Erstelle den SVG-Kreis für den Knoten
      const circle = document.createElementNS(this.svgNS, "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "10");
      circle.setAttribute("fill", this.getNodeColor(node));
      
      // Tooltip für Hover-Informationen
      const tooltip = document.createElementNS(this.svgNS, "title");
      tooltip.textContent = `Name: ${node.name} - Status: ${(node.status && typeof node.status === 'string') ? node.status : node.coordinates}`;
      circle.appendChild(tooltip);
      
      this.nodeGroup.appendChild(circle);
      
      // Textbeschriftung des Knotens
      const label = document.createElementNS(this.svgNS, "text");
      label.setAttribute("x", node.x + 12);
      label.setAttribute("y", node.y + 4);
      label.setAttribute("font-size", "12px");
      label.setAttribute("fill", "black");
      label.style.pointerEvents = "none";
      label.textContent = node.name;
      this.nodeGroup.appendChild(label);
    });
  }
  
  drawLinks() {
    this.links.forEach(link => {
      const sourceNode =
        this.nodes.find(n => n.id === link.source) ||
        this.nodes.find(n => n.name === link.source);
      const targetNode =
        this.nodes.find(n => n.id === link.target) ||
        this.nodes.find(n => n.name === link.target);
      if (!sourceNode || !targetNode) return;
      
      const line = document.createElementNS(this.svgNS, "line");
      line.setAttribute("x1", sourceNode.x);
      line.setAttribute("y1", sourceNode.y);
      line.setAttribute("x2", targetNode.x);
      line.setAttribute("y2", targetNode.y);
      line.setAttribute("stroke", this.getLinkColor(link.status));
      line.setAttribute("stroke-width", "2");
      this.linkGroup.appendChild(line);
    });
  }
  
  clear() {
    while (this.nodeGroup.firstChild) {
      this.nodeGroup.removeChild(this.nodeGroup.firstChild);
    }
    while (this.linkGroup.firstChild) {
      this.linkGroup.removeChild(this.linkGroup.firstChild);
    }
  }
  
  render() {
    this.simulation.nodes(this.nodes);
    this.simulation.alpha(1).restart();
  }
  
  /**
   * Ermittelt die Farbe eines Knotens basierend auf seinem Status.
   * Zuerst wird geprüft, ob der Knoten in der Eigenschaft "status" einen String besitzt.
   * Falls nicht, wird der Wert aus "node.coordinates" ausgewertet.
   */
  getNodeColor(node) {
    let state = "online"; // Standardwert
    
    if (node.status && typeof node.status === "string") {
      state = node.status;
    } else if (node.coordinates && typeof node.coordinates === "string") {
      state = node.coordinates;
    }
    
    let normalized = state.toLowerCase();
    
    switch (normalized) {
      case "online":
        return "green";
      case "failed":
        return "red";
      case "maintenance":
        return "orange";
      case "offline":
        return "gray";
      default:
        return "black";
    }
  }
  
  getLinkColor(status) {
    return status === "failed" ? "red" : "gray";
  }
}
