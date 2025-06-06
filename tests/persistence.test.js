// tests/persistence.test.js

import Persistence from '../persistence/persistence.js';

describe('Persistence Module', () => {
  // Vor jedem Test den LocalStorage leeren.
  beforeEach(() => {
    localStorage.clear();
  });
  
  test('should save and load state correctly', () => {
    const persistence = new Persistence();
    const state = {
      nodes: [{ id: 'node1', name: 'Test Node', status: 'online', capacity: 100, traffic: 0, x: 100, y: 100 }],
      links: []
    };
    persistence.saveState(state);
    const loadedState = persistence.loadState();
    expect(loadedState).toEqual(state);
  });
  
  test('should limit state history to maxHistoryEntries', () => {
    const persistence = new Persistence();
    const state = { nodes: [], links: [] };
    
    // Speichere 150 Zustände, wobei maxHistoryEntries auf 100 gesetzt ist.
    for (let i = 0; i < 150; i++) {
      persistence.saveState(state);
    }
    
    const history = persistence.loadStateHistory();
    expect(history.length).toBeLessThanOrEqual(persistence.maxHistoryEntries);
  });
});
