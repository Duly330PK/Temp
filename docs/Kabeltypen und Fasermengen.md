Kabeltypen und Fasermengen
Das ist sehr wichtig und gut erforscht. Hier die realistischen Kabeldaten aus der Branche:
🔌 Typische Glasfaserkabeltypen (Singlemode, FTTH/Backbone)
Bezeichnung
Fasern
Außendurchmesser
Einsatzbereich
Mini-Bündel 4-fach
4
~5–6 mm
Hausanschluss innen
Microkabel 12–24F
12–24
6–9 mm
Anschlussnetz (FTTH)
Kernkabel 48F
48
10–12 mm
Verteilnetz
Backbonekabel 96F
96
12–16 mm
PoP ↔ Backbone
Core-Kabel 144–288F
144+
18–23 mm
Langstrecke, Backbone
Ribbon-Kabel
bis 864F
20–26 mm
High-Capacity-Trassen

Quelle: Corning, LEONI, Prysmian, DIN EN 60794
📎 Zusätzliche Parameter pro Kabelabschnitt:
json
KopierenBearbeiten
{
  "segment_id": "CABL-000019",
  "fiber_count": 96,
  "fiber_type": "G.652D",
  "diameter_mm": 14.2,
  "cable_type": "Loose Tube",
  "jacket_type": "PE",
  "installed": "2023-04-22",
  "from": "PoP-001",
  "to": "MUF-004",
  "length_m": 860,
  "status": "ok",
  "max_loss_db": 0.4,
  "measured_loss_db": 0.31
}


🛠 Wie bauen wir es ein?
Die fiber_segments.json bekommt jetzt:


Kabeltyp + Fasern + Durchmesser


ID, Status, Länge, Verknüpfung


Bei Simulation (z. B. Überlast, Dämpfung) wird überprüft:


„Ist zu wenig Reserve-Faser vorhanden?“


„Passt die Splitterlogik zur Kabelführung?“


Optional:
Normdaten: DIN EN 60794-1-21 (Dämpfung, Faserdichte)


Karten-Sichtbarkeit: Dicke der Linie = Kabeldicke


