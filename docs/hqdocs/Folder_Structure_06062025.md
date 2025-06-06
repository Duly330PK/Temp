NetSim/
├── config/
│   └── configuration.js         // Dynamic configuration settings
├── controllers/
│   ├── eventBus.js              // Event-based communication logic
│   └── simulationEngine.js      // Core simulation logic (tick management, etc.)
├── dashboard/
│   └── dashboard.js             // Module for real-time dashboard visualization
├── docs/
│   ├── patchnotes.md            // Consolidated patchnotes and change history
│   ├── architecture.md          // System architecture and overall concept
│   └── ...                      // Additional Markdown documents with specifications, requirements, etc.
├── models/
│   ├── Node.js                  // Domain model: Network node (Node)
│   └── Link.js                  // Domain model: Connection lines (Link)
├── persistence/
│   └── persistence.js           // State management, storage & replay functionality
├── ui/
│   ├── controlPanel.js          // User control panel (Add Node, trigger failures, etc.)
│   ├── networkView.js           // Visual representation of network topology (using D3-force)
│   └── debugOverlay.js          // Debug UI overlay (optional for runtime logs)
├── tests/
│   ├── node.test.js             // Unit tests for the Node model
│   ├── controlPanel.integration.test.js   // Integration tests for the Control Panel (UI)
│   ├── controlPanel.test.js     // Further tests for the Control Panel
│   ├── integration.test.js      // Integration tests for the overall system (Replay, Config, etc.)
│   └── persistence.test.js      // Tests for the Persistence module
├── logger.js                    // Central logging module
├── main.js                      // Application entry point
└── package.json                 // Project configuration and dependencies
