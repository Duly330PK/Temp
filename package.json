{
  "name": "netsim",
  "version": "1.0.0",
  "description": "NetSim - A Network Simulation Project",
  "main": "index.js",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "setupFiles": [
      "jest-localstorage-mock"
    ],
    "transform": {
      "^.+\\.js$": "babel-jest"
    },
    "transformIgnorePatterns": [
      "<rootDir>/node_modules/(?!(d3(-.*)?|internmap|delaunator|robust-predicates)/)"
    ]
  },
  "keywords": [
    "simulation",
    "network",
    "netsim"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-env": "^7.22.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^30.0.0-beta.3",
    "jest-localstorage-mock": "^2.4.20"
  },
  "dependencies": {
    "d3": "^7.9.0"
  }
}