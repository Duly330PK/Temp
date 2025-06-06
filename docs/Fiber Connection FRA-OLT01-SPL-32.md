## 🔗 Segment: Glasfaser-Leitung FRA-OLT01 ⇄ SPL-32

### 📌 Verbindungsdaten
- **Typ:** Singlemode-Faser (OS2)
- **Segment-ID:** FIBER-OLT01-TO-SPL32
- **Länge:** 6.2 km (optisch)
- **Pfad:** unterirdisch, Leerrohrsystem
- **Verbindung:**  
  - **Startgerät:** Nokia 7360 ISAM FX  
  - **Zielgerät:** Splitter 1:32 (Huawei)  

### 📶 Eigenschaften
- **Dämpfung:** 0.28 dB/km  
- **Gesamtdämpfung:** 1.74 dB  
- **Fasern:** 1 von 12 belegt  
- **Reservefasern:** 11  
- **Leistungsbudget:** OK

### ⚠️ Status & Events
- **Status:** OK / gestört / geplante Wartung  
- **Letzte Störung:** 2025-04-08 – Unterbrechung bei Muffe MFF-09  
- **Reparaturzeit (simuliert):** 48 Minuten  
- **Alarmkette:** Weiterleitung an NOC

### 🧠 Simulation
- **Eventtrigger:**  
  - `break_fiber`: → Status „gestört“, Devices am Ende verlieren Sync  
  - `splice`: → Erzeugt Verzögerung (5s)  
  - `repair`: → Setzt Status zurück  
- **Routingverhalten:** L2-Backup über Segment SEG-BACKUP-02

### 🖼️ Visualisierung
- **Farbe:** grün = OK, rot = gestört  
- **Linienstärke:** 2px  
- **Tooltip:**  
  - Segment-ID  
  - Typ: OS2  
  - Dämpfung  
  - Status
