/**
 * persistence.js
 * 
 * Patch Notes:
 * v1.0 | 2025-01-15 - Basic implementation for saving and loading state.
 * v1.1 | 2025-04-05 - Added error handling.
 * v1.2 | 2025-10-07 - Extended logging and adjustments per new norm.
 * v1.3 | 2025-11-xx - Added state history saving functionality for replay.
 * v1.4 | 2025-11-zz - Added history limit to prevent endless growth.
 */
export default class Persistence {
  constructor() {
    this.storageKey = "simulationState";
    this.historyKey = "simulationHistory";
    // Set the max number of history entries to store.
    this.maxHistoryEntries = 100;
  }
  
  // Save the current state and add it to the history.
  saveState(state) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
      console.log("State saved successfully.");
      // Also add the current state to the history.
      this.saveStateHistory(state);
    } catch (e) {
      console.error("Error saving state:", e);
    }
  }
  
  // Load the current state.
  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        console.log("State loaded successfully.");
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error loading state:", e);
    }
    return null;
  }
  
  // Save state along with a timestamp to the history, and limit history size.
  saveStateHistory(state) {
    try {
      let history = JSON.parse(localStorage.getItem(this.historyKey)) || [];
      history.push({ timestamp: Date.now(), state: state });
      
      // Trim the history if it exceeds the max number of allowed entries.
      if (history.length > this.maxHistoryEntries) {
        history = history.slice(history.length - this.maxHistoryEntries);
      }
      
      localStorage.setItem(this.historyKey, JSON.stringify(history));
      console.log("State history updated successfully. History length:", history.length);
    } catch (e) {
      console.error("Error saving state history:", e);
    }
  }
  
  // Load the full state history.
  loadStateHistory() {
    try {
      const data = localStorage.getItem(this.historyKey);
      if (data) {
        console.log("State history loaded successfully.");
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error loading state history:", e);
    }
    return [];
  }
  
  // Clear the state history.
  clearStateHistory() {
    try {
      localStorage.removeItem(this.historyKey);
      console.log("State history cleared successfully.");
    } catch (e) {
      console.error("Error clearing state history:", e);
    }
  }
}
