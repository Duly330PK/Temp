# Patchnotes

This document consolidates the changelog entries from all modules. The individual files have had their in-file changelog comment blocks removed so that the code remains lean.

---

## Configuration Module (`configuration.js`)
- **v1.0 (2025-01-15):** Initial release with basic configuration settings.
- **v1.1 (2025-05-20):** Extended adjustments for flexible configuration.
- **v1.2 (2025-10-07):** Additional settings and improved update methods per new standard.

---

## Event Bus Module (`eventBus.js`)
- **v1.0 (2025-01-15):** Basic publish/subscribe implementation.
- **v1.1 (2025-04-10):** Minor bug fixes in the subscription mechanism.
- **v1.2 (2025-10-07):** Improved management of event listeners per current standard.

---

## Simulation Engine Module (`simulationEngine.js`)
- **v1.0 (2025-01-15):** Initial version triggering regular simulation ticks.
- **v1.1 (2025-06-01):** Optimized tick frequency and traffic updates.
- **v1.2 (2025-10-07):** Extended tick logic and configuration integration per new standard.

---

## Dashboard Module (`dashboard.js`)
- **v1.0 (2025-01-15):** Basic dashboard for displaying node and link metrics.
- **v1.1 (2025-05-01):** Integrated dynamic traffic metrics.
- **v1.2 (2025-10-07):** Improved display and periodic updates per new standard.

---

## Link Module (`Link.js`)
- **v1.0 (2025-01-15):** First link model with basic attributes.
- **v1.1 (2025-06-01):** Adjusted parameter naming.
- **v1.2 (2025-10-07):** Updated constructor documentation per current standard.

---

## Node Module (`models/Node.js`)
- *No in-file changelog was present in the Node module.*

---

## Persistence Module (`persistence.js`)
- **v1.0 (2025-01-15):** Basic implementation for saving and loading state.
- **v1.1 (2025-04-05):** Added error handling.
- **v1.2 (2025-10-07):** Extended logging and adjustments per new standard.
- **v1.3 (2025-11-xx):** Added state history saving functionality for replay.
- **v1.4 (2025-11-zz):** Added history limit to prevent endless growth.

---

## Network View Module (`networkView.js`)
- **v1.0 (2025-01-15):** Basic SVG visualization using d3-force.
- **v1.1 (2025-06-01):** Improved node and link representation.
- **v1.2 (2025-10-07):** Added hover tooltips and adjusted force parameters per standard.
- **v1.3 (2025-11-xx):** Updated node colors: online green, failed red, maintenance orange, offline gray.
- **v1.4 (2025-xx-xx):** Refined getNodeColor to evaluate node.coordinates if node.status is not a string.

---

## Control Panel Module (`controlPanel.js`)
- **v1.0 (2025-01-15):** Initial Control Panel with basic functions.
- **v1.1 (2025-07-12):** Extended failure injection and configuration adjustments.
- **v1.2 (2025-10-07):** Integrated "Clear All Nodes" button with layout adjustments.
- **v1.3 (2025-11-05):** Updated node management with predefined status selection (Online, Offline, Maintenance).
- **v1.4 (2025-11-xx):** Fixed timing issues with the update of failure selectors.
- **v1.5 (2025-11-xx):** Added "Replay Simulation" button.
- **v1.6 (2025-11-yy):** Implemented error handling and input validation for node/link creation.

---

## Debug Overlay Module (`debugOverlay.js`)
- **Refactor:** Duplicate code removed. Now exports a single `createDebugOverlay` and `updateDebugOverlay` function.

---

## Logger Module (`logger.js`)
- *No in-file changelog was present in the logger module.*

---

*Note:* All files now contain concise, English comments. This combined patchnotes document should serve as the single source of truth for the release history of the project.

