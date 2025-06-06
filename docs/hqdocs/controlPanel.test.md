'use strict';

import ControlPanel from '../ui/controlPanel.js';
import EventBus from '../controllers/eventBus.js';

describe('ControlPanel Integration Tests', () => {
  let container, nodes, links, eventBus, config, simulationEngine, dashboard;

  beforeEach(() => {
    document.body.innerHTML = '<div id="controlPanelContainer"></div>';
    container = document.getElementById('controlPanelContainer');
    nodes = [];
    links = [];
    eventBus = new EventBus();
    // Stubs für Konfiguration, SimulationEngine und Dashboard.
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
    new ControlPanel(container, nodes, links, eventBus, config, simulationEngine, dashboard);
  });

  test('should add a node when clicking Add Node button', () => {
    const nodeNameInput = container.querySelector('#nodeName');
    nodeNameInput.value = 'Test Node';
    const publishSpy = jest.spyOn(eventBus, 'publish');
    const addNodeBtn = container.querySelector('#addNodeBtn');
    addNodeBtn.click();
    expect(publishSpy).toHaveBeenCalled();
    const [eventName, payload] = publishSpy.mock.calls[0];
    expect(eventName).toBe('nodeAdded');
    expect(payload).toHaveProperty('node');
  });

  test('should trigger simulation start when clicking Start Simulation button', () => {
    const startSimBtn = container.querySelector('#startSimBtn');
    startSimBtn.click();
    expect(simulationEngine.startSimulation).toHaveBeenCalled();
  });

  // Weitere Tests können hier ergänzt werden.
});
