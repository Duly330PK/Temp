/**
 * Link.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Erstes Link-Modell, grundlegende Attribute.
 * v1.1 | 2025-06-01 - Anpassung der Parameterbezeichnungen.
 * v1.2 | 2025-10-07 - Update der Konstruktor-Dokumentation gemäß aktueller Norm.
 */
export default class Link {
  /**
   * @param {string} source - ID oder Name des Quell-Knotens.
   * @param {string} target - ID oder Name des Ziel-Knotens.
   * @param {number} baseLatency - Basislatenz in Millisekunden.
   * @param {number} load - Aktuelle Last.
   * @param {string} status - 'online' oder 'failed'.
   */
  constructor(source, target, baseLatency, load, status) {
    this.source = source;
    this.target = target;
    this.baseLatency = baseLatency;
    this.load = load;
    this.status = status;
  }
}
