## ⚠️ Simulationsevent: Firmware-Update auf OLT

### 🔄 Trigger
- `simulation.js → simulateFirmwareUpdate(deviceId)`

### 🧠 Ablauf
1. Status → "updating"
2. Farbwechsel auf gelb
3. Timeout 180 Sekunden
4. Nach Abschluss → "online" oder "offline" (bei Fehler)

### 📦 Gerätebetroffen
- Gerät: Nokia 7360 ISAM FX
- Segment(e): Weiterhin verbunden, Traffic ggf. umgeleitet

### 🪵 Logging
```json
{
  "timestamp": "2025-05-29T13:45:00Z",
  "event": "fw_update",
  "device": "OLT-001",
  "status": "success"
}
yaml
Copy
Edit

---

## ✅ Vorschläge für weitere Markdown-Blöcke:

- 🧩 **ONT / Endkundengerät**
- 🔁 **Splitter (1:32, 1:16 etc.)**
- 📦 **Muffe (z. B. mit Geoposition und Gehäusetyp)**
- 🌐 **Virtuelle Pfade / Service-Pfade (z. B. VLAN- oder Pseudowire-Traces)**
- 💡 **Zugriffsnetz-Zustände (Last, Bandbreite, Störungssimulation)**

---

Wenn du willst, kann ich das alles als:

- `README.md` Templates bereitstellen,
- `data.js` JSON-konvertieren für die Simulation,
- oder direkt `updateMap()`-fähig in HTML/JS einbauen.

👉 Sag einfach, welche Geräte, Details oder Formatvarianten du brauchst (Markdown, JSON, YAML, HTML-Div).