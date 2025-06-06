// src/debugOverlay.js
'use strict';

/**
 * Erstellt ein Debug-Overlay am unteren Bildschirmrand.
 * @returns {HTMLElement} Das Overlay-DOM-Element.
 */
function createDebugOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'debug-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    bottom: '0',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: '10px',
    fontSize: '12px',
    zIndex: '1000',
    width: '100%',
    maxHeight: '200px',
    overflowY: 'scroll'
  });
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Aktualisiert das Debug-Overlay mit dem aktuellen Zustand und Logs.
 * Der neueste Log-Eintrag wird oben angezeigt.
 * @param {object} state - Der aktuelle Zustand (z.B. { nodes, links }).
 * @param {string[]} logs - Array der Lognachrichten.
 */
function updateDebugOverlay(state, logs) {
  const overlay = document.getElementById('debug-overlay') || createDebugOverlay();
  overlay.innerHTML = `
    <h4>Debug Overlay</h4>
    <pre>${JSON.stringify(state, null, 2)}</pre>
    <h4>Logs</h4>
    <pre>${logs.slice().reverse().join('\n')}</pre>
  `;
}

export { createDebugOverlay, updateDebugOverlay };
