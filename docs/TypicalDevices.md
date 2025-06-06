Typische Geräte in FTTH/Backbone-Glasfasernetzen
Mit Hersteller, Modellreihe, Typ, Beschreibung, ideal für Simulation

🔌 Zugangsnetz (FTTH bis Haus)
Typ
Hersteller
Modell/Serie
Beschreibung
ONT
Nokia
G-010G-Q
Optical Network Terminal, beim Kunden
ONT
Huawei
EchoLife HG8010H
Single-port GPON ONT
NT
AVM
FRITZ!Box 5590 Fiber
Endgerät mit LWL-Modul
Hausanschlussdose
Telegärtner
OAD1
Glasfaseranschlussdose innen, passiv


🏢 Zugangsverteilung / Aggregationsebene
Typ
Hersteller
Modell/Serie
Beschreibung
OLT
Nokia
ISAM FX-16
GPON/NG-PON2 Line-Termination
OLT
Huawei
MA5800-X7
Aggregation OLT mit 10G
DSLAM
ADTRAN
Total Access 5000
Multiservice Access Node (Kupfer + Glas)
Splitter
Corning
PLC Splitter 1:32
Passiv, Verteilung im FTTH


🛠 Technikräume / PoP (Point of Presence)
Typ
Hersteller
Modell/Serie
Beschreibung
PoP-Schrank
Rittal
VX25
Schrank für aktive Technik
Patchpanel
Rosenberger
FOMP-Series
LWL-Kupplung, Rangierfeld
Spleißbox
FIST
GCO2-B
Für Muffen, PoPs, 12–96 Fasern
ODF
Telegärtner
ODF-96
Optical Distribution Frame


🌐 Backbone / Core / DWDM
Typ
Hersteller
Modell/Serie
Beschreibung
Edge Router
Cisco
ASR 9001
Aggregation Layer 3 Router
DWDM Mux
ADVA
FSP 3000
Dense Wavelength Division Multiplexer
Amplifier
Ciena
6500 Family
Optical Amplifier für Backbone
Transportplattform
Infinera
GX G30
DWDM + Switching + OTN


🧱 Passiv: Muffen / Kabel / Installationen
Typ
Hersteller
Modell/Serie
Beschreibung
Muffe
3M
2178-S
Universal-Spleißmuffe
Muffe
FIST (Nokia/Corning)
GCO2-BC
High-Density-Muffe
LWL-Kabel
LEONI
LWL 96x SM
96-Faser Singlemode
Stecker
Huber+Suhner
E-2000 APC
Hochwertiger LWL-Stecker (grün)


🧬 Vorschlag: Struktur in devices.json
Jedes Gerät bekommt:
json
KopierenBearbeiten
{
  "device_id": "ONT-0001",
  "type": "ONT",
  "manufacturer": "Nokia",
  "model": "G-010G-Q",
  "location": "Kunde, Haus 34",
  "status": "online",
  "optical_metrics": {...},
  "firmware_version": "3.2.1",
  "outdated": false,
  "interface": {
    "port_count": 1,
    "standards": ["GPON", "ITU G.984"]
  }
}
