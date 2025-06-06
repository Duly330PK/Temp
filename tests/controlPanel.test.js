// tests/controlPanel.test.js

import ControlPanel from '../ui/controlPanel.js';
import EventBus from '../controllers/eventBus.js';

describe('ControlPanel Integration Tests', () => {
  let container, nodes, links, eventBus, config, simulationEngine, dashboard;

  beforeEach(() => {
    // Setze eine Testdomäne (jsdom) auf und füge ein Container-Element hinzu.
    document.body.innerHTML = '<div id="controlPanelContainer"></div>';
    container = document.getElementById('controlPanelContainer');
    nodes = [];
    links = [];
    eventBus = new EventBus();
    // Erstelle einfache Stubs für config, simulationEngine und dashboard.
    config = {
      updateSetting: jest.fn(),
      getAllSettings: () => ({})
    };
    simulationEngine = {
      startSimulation: jest.fn(),
      stopSimulation: jest.fn()
    };
    dashboard = {
      startUpdates: jest.fn(),
      stopUpdates: jest.fn()
    };
    // Instanziiere das Control Panel – hier wird der gesamte HTML-Inhalt erzeugt.
    new ControlPanel(container, nodes, links, eventBus, config, simulationEngine, dashboard);
  });

  test('should add a node when clicking Add Node button', () => {
    // Simuliere eine Eingabe für den Node-Namen.
    const nodeNameInput = container.querySelector('#nodeName');
    nodeNameInput.value = 'Test Node';

    // Setze einen Spy auf eventBus.publish
    const publishSpy = jest.spyOn(eventBus, 'publish');

    // Finde den Add Node-Button und simuliere einen Klick.
    const addNodeBtn = container.querySelector('#addNodeBtn');
    addNodeBtn.click();

    // Überprüfe, ob das Event "nodeAdded" mit einem gültigen Node-Objekt veröffentlicht wurde.
    expect(publishSpy).toHaveBeenCalled();
    const [eventName, payload] = publishSpy.mock.calls[0];
    expect(eventName).toBe('nodeAdded');
    expect(payload).toHaveProperty('node');
    // Optional: Überprüfe, ob der Node korrekt in den nodes-Array eingefügt wird (abhängig von der Implementation)
  });

  test('should trigger simulation start when clicking Start Simulation button', () => {
    const startSimBtn = container.querySelector('#startSimBtn');
    startSimBtn.click();
    expect(simulationEngine.startSimulation).toHaveBeenCalled();
  });

  // Ergänze weitere Tests für andere Buttons und Abläufe, z. B. config-Updates, Failure-Trigger, usw.
});
