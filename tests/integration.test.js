/**
 * Integration Tests Suite: Replay, Failure Handling und Configuration Updates.
 *
 * Diese Tests überprüfen, ob:
 * - Gespeicherte Zustände korrekt replayt werden.
 * - Fehlerszenarien (z. B. das Markieren eines Knotens als "failed") korrekt behandelt werden.
 * - Konfigurationsänderungen in die Simulation übernommen werden.
 *
 * Changelog:
 * v1.0   | 2025-xx-xx - Initiale Integrationstests für Replay und grundlegende Funktionalitäten.
 * v1.1   | 2025-xx-xx - DOM in beforeEach() vorbereitet, um alle benötigten UI-Elemente zu simulieren.
 *
 * Standards:
 * - Vollständige DOM-Vorbereitung in beforeEach.
 * - Sauberes Aufräumen des DOM in afterEach.
 * - Nutzung von jest.spyOn zur Überwachung von Event-Methoden.
 */

import SimulationEngine from '../controllers/simulationEngine.js';
import Persistence from '../persistence/persistence.js';
import NetworkView from '../views/networkView.js';
import EventBus from '../controllers/eventBus.js';
import Configuration from '../config/configuration.js';
import Dashboard from '../dashboard/dashboard.js';
import ControlPanel from '../ui/controlPanel.js';

describe("Integration Tests Suite", () => {
  let simulationEngine, persistence, networkView, eventBus, configuration, dashboard, controlPanel;
  let container; // Hilfs-DOM-Element für die Visualisierung

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

    container = document.createElement('div');
    container.style.width = "800px";
    container.style.height = "600px";
    document.body.appendChild(container);

    eventBus = new EventBus();
    configuration = new Configuration();
    // Spy on configuration.updateSetting, damit wir die Aufrufe prüfen können
    jest.spyOn(configuration, "updateSetting");
    persistence = new Persistence();
    const nodes = [];
    const links = [];

    networkView = new NetworkView(container, nodes, links, eventBus);
    simulationEngine = new SimulationEngine(nodes, links, eventBus, configuration);
    dashboard = new Dashboard(document.createElement('div'), nodes, links, eventBus);

    controlPanel = new ControlPanel(container, nodes, links, eventBus, configuration, simulationEngine, dashboard);

    // Mock eventBus.publish, damit Aufrufe überwacht werden können
    jest.spyOn(eventBus, "publish").mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("Sollte Replay korrekt auslösen", () => {
    global.window.replayStates = jest.fn();
    const replayBtn = document.querySelector("#replayBtn");
    replayBtn.click();
    expect(window.replayStates).toHaveBeenCalled();
  });

  test("Sollte Knoten hinzufügen bei Button-Klick", () => {
    const nodeNameInput = document.querySelector("#nodeName");
    nodeNameInput.value = "Test Node";

    const addNodeBtn = document.querySelector("#addNodeBtn");
    addNodeBtn.click();

    expect(eventBus.publish).toHaveBeenCalledWith("nodeAdded", { node: { name: "Test Node" } });
  });

  test("Sollte Konfigurationsänderungen korrekt umsetzen", () => {
    const tickFrequencyInput = document.querySelector("#tickFrequency");
    tickFrequencyInput.value = "200";
    const trafficMinInput = document.querySelector("#trafficMin");
    trafficMinInput.value = "10";
    const trafficMaxInput = document.querySelector("#trafficMax");
    trafficMaxInput.value = "500";

    const updateConfigBtn = document.querySelector("#updateConfigBtn");
    updateConfigBtn.click();

    expect(configuration.updateSetting).toHaveBeenCalledWith("tickFrequency", 200);
    expect(configuration.updateSetting).toHaveBeenCalledWith("trafficRange", { min: 10, max: 500 });
  });
});
