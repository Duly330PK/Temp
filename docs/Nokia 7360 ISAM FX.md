## 🛰️ Gerät: Nokia 7360 ISAM FX

### 📌 Grunddaten
- **Typ:** OLT (Optical Line Terminal)
- **Modell:** 7360 ISAM FX-16
- **Hersteller:** Nokia
- **Firmware:** SR OS v23.3.R1
- **Geräte-ID:** OLT-001-FRANKFURT
- **Standort:** Rechenzentrum FRA-01
- **Status:** online / gestört / offline

### 📐 Physikalische Eigenschaften
- **Abmessungen:** 442 × 263 × 311 mm
- **Gewicht:** 14,2 kg
- **Montage:** 19" Rack, 7 HE
- **Stromversorgung:** -48V DC (redundant)

### 🔌 Schnittstellen & Ports
| Slot | Typ          | Anzahl | Max. Clients | Protokoll |
|------|--------------|--------|--------------|-----------|
| 1–8  | GPON SFP     | 8      | 512          | ITU-T G.984 |
| 9–12 | XGS-PON SFP+ | 4      | 256          | ITU-T G.9807 |
| 13   | 10GBASE-LR   | 2      | –            | Ethernet  |
| 14   | 100G QSFP28  | 1      | –            | Uplink    |

### 🧠 Logik & Simulation
- **Statusmodell:** online, gestört, offline, updating, rebooting
- **Events:**  
  - `fw_update`: Startet Firmwarewechsel  
  - `alarm_minor`: Loggt Störung  
  - `offline_event`: Verbindung verloren  
- **Reaktion auf Segmentfehler:** Wechsel auf Backup-Pfad

### 🧪 Firmware
- **Version:** SR OS v23.3.R1  
- **Letztes Update:** 2025-03-17 04:12 UTC  
- **Update-Dauer (simuliert):** 180 Sekunden  
- **Rollback:** möglich

### 🖼️ Visualisierung (SVG)
- **Symbol:** blauer Kreis (15 px) bei online  
- **Tooltip:**  
  - Typ: OLT  
  - ID: OLT-001  
  - Firmware: SR OS 23.3  
  - Status: online  
- **Auswahlrahmen:** roter Kreis (Stroke 2px)

---
