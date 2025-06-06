// src/simulation.js
'use strict';

import logger from './logger.js';

let currentState = {
  nodes: [],
  links: []
};

function saveState(state) {
  currentState = { ...state };
  logger.info('State saved successfully.');
}

function replayState() {
  logger.debug('Replaying saved state...');
  return currentState;
}

function injectFailure(nodeId) {
  logger.warn(`Injecting failure in node ${nodeId}`);
  const node = currentState.nodes.find(n => n.id === nodeId);
  if (node) {
    node.status = 'fallback';
    logger.error(`Node ${nodeId} switched to fallback mode.`);
  }
}

function getCurrentState() {
  return currentState;
}

// Weitere Funktionen (z. B. für zufällige Fehler) können analog hinzugefügt werden

export {
  saveState,
  replayState,
  injectFailure,
  getCurrentState
};
