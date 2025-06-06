1. Basis-Vorlage: Gerätedetails
markdown
Copy
Edit
### 📡 Gerät: Nokia 7750 SR-7

**Typ:** Backbone-Router  
**Hersteller:** Nokia  
**Modell:** 7750 SR-7  
**Verwendung:** Aggregation, Backbone  

#### 🔌 Technische Spezifikationen
- **Line Card Slots:** 7
- **Ports:** Bis zu 80x 100GE (abhängig vom Line-Card-Typ)
- **Switching-Kapazität:** Bis zu 2 Tbps
- **Stromversorgung:** Dual AC oder DC
- **Lüftung:** Front-to-Back Airflow
- **Betriebssystem:** SR OS
- **Management:** CLI, SNMP, Netconf/YANG

#### 📦 Module & Erweiterungen
- SR-s CPM2 (Control Plane)
- IOM Modules: 100GE, 40GE, 10GE
- SFM: Fabric Modules für Switching

#### 🏷️ Statusfarben (für SVG)
- Online: `#1e90ff`
- Gestört: `#f0ad4e`
- Offline: `#aaa`

#### 🖼️ Bilder
- [Vorderseite (Module sichtbar)](https://example.com/nokia-7750-front.jpg)
- [Rückseite (Lüfter, Strom)](https://example.com/nokia-7750-rear.jpg)
📶 2. Template: Muffe / Glasfaser-Verteiler
markdown
Copy
Edit
### 🔧 Gerät: Spleißmuffe MFN-A1.12

**Typ:** Glasfasermuffe  
**Modell:** Micos FDN 96  
**Hersteller:** Micos Telcom  
**Verwendung:** FTTH-Verbindung, Trassenverteiler  

#### 🔌 Technische Spezifikationen
- **Kapazität:** 96 Fasern (8x12)
- **Kabelzuführung:** 4 Eingänge, 4 Ausgänge
- **Dichtigkeit:** IP68
- **Montage:** Erdverlegung / Schachtmontage
- **Spleißhalter:** 8x 12-Faser-Kassetten

#### 🖼️ Bild
- ![Muffe FDN 96](https://example.com/muffe-fdn96.jpg)
🌐 3. Template: ONT / Kundenendgerät
markdown
Copy
Edit
### 🏠 Gerät: ONT GPON-HG8010H

**Typ:** Optical Network Terminal (ONT)  
**Hersteller:** Huawei  
**Modell:** EchoLife HG8010H  
**Verwendung:** FTTH-Kundenanschluss  

#### 🔌 Technische Spezifikationen
- **Port:** 1x GE RJ45
- **Upstream:** GPON
- **Downstream:** bis 2,5 Gbit/s
- **Stromversorgung:** 12V DC, 0.5A
- **Montage:** Wandmontage / Tischgerät
- **Management:** OMCI / Web-GUI

#### 🖼️ Bild
- ![ONT HG8010H](https://example.com/huawei-ont.jpg)
🧱 4. Vergleichstabelle (Mehrere Geräte)
markdown
Copy
Edit
| Gerät            | Typ            | Ports       | Speed        | Strom       | OS     |
|------------------|----------------|-------------|--------------|-------------|--------|
| Nokia 7750 SR-7  | Router (Core)  | bis 80x100G | bis 2 Tbps   | AC/DC Red.  | SR OS  |
| Cisco ASR1006-X  | Aggregation    | 6 Slots     | 100GE / 40GE | Dual PSU    | IOS-XE |
| HG8010H          | ONT (Kunde)    | 1x GE       | bis 2,5 Gbps | 12V DC      | OMCI   |
