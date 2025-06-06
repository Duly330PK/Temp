/**
 * configuration.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Erste Version, Basis-Einstellungen implementiert.
 * v1.1 | 2025-05-20 - Erweiterungen und Anpassungen für flexible Konfiguration.
 * v1.2 | 2025-10-07 - Zusätzliche Einstellungen und verbesserte Update-Methoden gemäß neuer Norm.
 */
export default class Configuration {
  constructor() {
    this.settings = {
      tickFrequency: 1000, // in Millisekunden
      trafficRange: { min: 50, max: 500 },
      failureProbability: 0.1
    };
  }

  updateSetting(key, value) {
    this.settings[key] = value;
  }

  getAllSettings() {
    return this.settings;
  }
}
