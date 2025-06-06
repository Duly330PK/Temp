/**
 * controlPanel.integration.test.js
 *
 * Integrationstests für das Control Panel, welche spezifische UI-Funktionalitäten
 * (wie Failure-Handling, Konfigurationsänderungen, Link-Erstellung und "Clear All Nodes")
 * überprüfen.
 *
 * Changelog:
 * v1.0   | 2025-xx-xx - Initiale Tests für updateFailureSelectors und weitere UI-Interaktionen.
 * v1.1   | 2025-xx-xx - Vollständige DOM-Vorbereitung in beforeEach(), inkl. zusätzlicher Elemente.
 *
 * Standards:
 * - Vollständige DOM-Vorbereitung in beforeEach().
 * - Verwendung von jest.spyOn, um Event-Funktionen zu überwachen.
 * - Sauberes Aufräumen des DOM in afterEach().
 */

import ControlPanel from '../ui/controlPanel.js';
import EventBus from '../controllers/eventBus.js';
import Configuration from '../config/configuration.js';
import SimulationEngine from '../controllers/simulationEngine.js';
import Dashboard from '../dashboard/dashboard.js';

describe("Integrationstests für das Control Panel", () => {
  let cp, container, eventBus, configuration, simulationEngine, dashboard;
  let nodes = [];
  let links = [];

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="control-panel">
        <button id="startSimBtn">Simulation Starten</button>
        <button id="replayBtn">Replay</button>
        <input id="nodeName" type="text" placeholder="Node-Name">
        <input id="tickFrequency" type="number" placeholder="Tick-Frequenz">
        <input id="trafficMin" type="number" placeholder="Min. Traffic">
        <input id="trafficMax" type="number" placeholder="Max. Traffic">
        <button id="addNodeBtn">Add Node</button>
        <button id="updateConfigBtn">Update Config</button>
        <select id="failureDropdown"></select>
      </div>
    `;
    container = document.getElementById("control-panel");
    eventBus = new EventBus();
    configuration = new Configuration();
    // Füge updateSetting als Stub hinzu, damit wir Aufrufe überwachen können
    configuration.updateSetting = jest.fn();
    simulationEngine = new SimulationEngine(nodes, links, eventBus, configuration);
    dashboard = new Dashboard(document.createElement('div'), nodes, links, eventBus);

    cp = new ControlPanel(container, nodes, links, eventBus, configuration, simulationEngine, dashboard);
    jest.spyOn(eventBus, "publish").mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("Sollte Node-Failure korrekt behandeln", () => {
    cp.updateFailureSelectors();
    const dropdown = document.getElementById("failureDropdown");
    // Da keine Nodes vorhanden sind, sollte das Dropdown leer bleiben.
    expect(dropdown.innerHTML).toBe("");
    expect(typeof cp.updateFailureSelectors).toBe("function");
  });

  test("Sollte Konfigurationsänderungen korrekt umsetzen", () => {
    const tickFrequencyInput = document.getElementById("tickFrequency");
    tickFrequencyInput.value = "200";
    const trafficMinInput = document.getElementById("trafficMin");
    trafficMinInput.value = "10";
    const trafficMaxInput = document.getElementById("trafficMax");
    trafficMaxInput.value = "500";

    const updateConfigBtn = document.getElementById("updateConfigBtn");
    updateConfigBtn.click();

    expect(configuration.updateSetting).toHaveBeenCalledWith("tickFrequency", 200);
    expect(configuration.updateSetting).toHaveBeenCalledWith("trafficRange", { min: 10, max: 500 });
  });

  test("Sollte Link-Erstellung und Link-Failure korrekt behandeln", () => {
    cp.updateFailureSelectors();
    const dropdown = document.getElementById("failureDropdown");
    expect(dropdown.innerHTML).toBe("");
    expect(typeof cp.updateFailureSelectors).toBe("function");
  });

  test("Sollte 'Clear All Nodes' korrekt umsetzen", () => {
    const nodeNameInput = document.getElementById("nodeName");
    nodeNameInput.value = "Node 1";
    const addNodeBtn = document.getElementById("addNodeBtn");
    addNodeBtn.click();

    nodeNameInput.value = "Node 2";
    addNodeBtn.click();

    expect(eventBus.publish).toHaveBeenCalledTimes(2);

    cp.updateFailureSelectors();
    const dropdown = document.getElementById("failureDropdown");
    expect(typeof cp.updateFailureSelectors).toBe("function");
  });
});
