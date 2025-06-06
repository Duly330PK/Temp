🧱 2. Technische Tabelle (z. B. Router- oder Muffen-Spezifikationen)
markdown
Copy
Edit
| Komponente        | Typ              | Ports          | Geschwindigkeit | Stromversorgung |
|-------------------|------------------|----------------|------------------|------------------|
| Nokia 7750 SR-7   | Backbone-Router  | 10x 100GE      | Bis zu 2 Tb/s    | AC/DC redundant |
| Cisco ASR 1006-X  | Aggregation      | 6 Slots        | 100GE / 40GE     | Dual PSU        |
🧪 3. Statusfarben (z. B. aus der SVG-Karte)
markdown
Copy
Edit
### Gerätestatus

- 🟦 `#1e90ff` = Online
- 🟧 `#f0ad4e` = Gestört
- ⚪ `#aaa` = Offline/Unbekannt
🔧 4. SQL-Query-Dokumentation
markdown
Copy
Edit
### Alle Tabellen anzeigen
```sql
SHOW TABLES;
Geräte nach Status filtern
sql
Copy
Edit
SELECT * FROM devices WHERE status = 'online';
yaml
Copy
Edit

---

## 🧭 **5. Netzwerkpfad-Darstellung (ASCII/Markdown-artig)**
```markdown
POP-BER-01 ─── KT-23-B ─── MFN-A1.12 ─── MFN-B5.03 ─── KDN-02115
   ↑                           ↑                         ↑
 Rechenzentrum        48F-Spleißmuffe              FTTH-Kunde
🔄 6. Ereignisse und Synchronisierung (Pseudocode / Eventflow)
markdown
Copy
Edit
### Beispiel: Klick im Panel triggert Map-Zoom

`controlPanel.js`
→ Klick auf Kunde
→ sendEvent("focusDevice", deviceId)
→ `map.js` empfängt → map.setView(coords)
📌 7. To-Do / Roadmap-Liste
markdown
Copy
Edit
### ✅ Erledigt
- [x] SVG-Karte eingebunden
- [x] Geräte anzeigen

### 🚧 In Arbeit
- [ ] Live-Simulation von Status
- [ ] Kundenpfad-Analyse

### 🔜 Geplant
- [ ] NAT-Tabelle visualisieren
- [ ] Lichtlaufzeit-Tool
📄 8. Gerätedetails in Doku-Ansicht
markdown
Copy
Edit
### Gerät: MFN-B5.03
- Typ: 24F Spleißmuffe
- Standort: Koordinate (313, 122)
- Verbindungen: KT-23-B, KT-West-Ost
- Status: Online
- Letzte Prüfung: 2025-05-12
