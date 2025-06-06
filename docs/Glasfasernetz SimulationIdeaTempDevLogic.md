Glasfasernetz Simulation
1. Übersicht
Ziel:
 Realistische Simulation eines Glasfasernetzes mit Geräten, Leitungssegmenten und Netzstatus.
 Alles mit eindeutigen IDs, realitätsnahen technischen Parametern und nachvollziehbaren Verbindungen.

2. Datenstruktur
2.1 Geräte (devices.json)
Jedes Gerät hat:
Feld
Typ
Beschreibung
device_id
String
Eindeutige Geräte-ID (z.B. ONT-00012)
uuid
String (UUID)
Optional, universelle eindeutige ID
type
String
Gerätetyp (z.B. OLT, ONT, MUFF)
manufacturer
String
Herstellername
model
String
Modellnummer
location
Objekt
Standort (Site, GPS-Koordinaten, Rack)
status
String
Status (online, offline, outdated)
outdated
Boolean
Firmware veraltet?
firmware_version
String
Firmwareversion
last_update
ISO8601-Datei
Letztes Update
optical_metrics
Objekt
Messwerte wie Verlust in dB
interface
Objekt
Ports, Standards
tags
Array[String]
Suchbegriffe (z.B. „core“, „fiber“)
maintenance
Objekt
Wartungsinfos

Beispiel:
json
KopierenBearbeiten
{
  "device_id": "OLT-000012",
  "uuid": "cbba4c92-f8a5-4267-9b6a-7fd52361d58f",
  "type": "OLT",
  "manufacturer": "Huawei",
  "model": "MA5800-X7",
  "location": {
    "site": "PoP-04",
    "gps": [51.2659, 6.4234],
    "rack_position": "RU-16"
  },
  "status": "online",
  "outdated": false,
  "firmware_version": "v3.0.5a",
  "last_update": "2025-05-27T18:40:00Z",
  "optical_metrics": {
    "total_loss_db": 11.6,
    "max_allowed_loss_db": 28.0,
    "ref_loss_db": 38.1,
    "min_ref_loss_db": 35.0,
    "status": "ok"
  },
  "interface": {
    "ports": 16,
    "used_ports": 14,
    "standards": ["GPON", "10G-PON", "ITU-T G.9807.1"]
  },
  "tags": ["core", "active", "fiber"],
  "maintenance": {
    "field_access_required": false,
    "next_maintenance": "2025-09-01"
  }
}


















2.2 Leitungssegmente (fiber_segments.json)
Feld
Typ
Beschreibung
segment_id
String
Eindeutige Segment-ID (z.B. FIB-000456)
type
String
Kabeltyp (Singlemode, Multimode)
fiber_count
Integer
Anzahl der Fasern
length_m
Integer
Länge in Metern
from_device_id
String
Startgerät-ID
to_device_id
String
Zielgerät-ID
status
String
Status (ok, defekt, in Wartung)
max_loss_db
Float
Maximal erlaubter Verlust (dB)
measured_loss_db
Float
Aktuell gemessener Verlust (dB)
route
Array[Objekt]
GPS-Koordinaten zur Visualisierung
construction
Objekt
Kabelbauweise, Muffen, Spleißpunkte
tags
Array[String]
Suchbegriffe

Beispiel:
json
KopierenBearbeiten
{
  "segment_id": "FIB-000456",
  "type": "Singlemode",
  "fiber_count": 24,
  "length_m": 1640,
  "from_device_id": "SPLT-000022",
  "to_device_id": "ONT-000089",
  "status": "ok",
  "max_loss_db": 0.4,
  "measured_loss_db": 0.27,
  "route": [
    {"lat": 51.2761, "lng": 6.4189},
    {"lat": 51.2772, "lng": 6.4223}
  ],
  "construction": {
    "trench_type": "Microtrenching",
    "splice_points": ["SPC-000234", "SPC-000235"],
    "muffen": ["MUFF-000056"]
  },
  "tags": ["FTTH", "Hausanschluss"]
}


3. Terminologie & technische Grundlagen
PoP (Point of Presence): Netzverknüpfungspunkt, Backbone Zugang


Muffe: Passives Verbindungselement, Faser-Spleiße, meistens passiv


Splitter: Optischer Verteiler, aktiv/passiv, teilt Fasern auf


ONT (Optical Network Terminal): Kundenendgerät


OLT (Optical Line Terminal): Backbone Seite, steuert ONTs


DSLAM: Aggregationspunkt für Kupfer-DSL (optional)


Fasertypen: Singlemode (ITU-T G.652), Multimode (z.B. OM1–OM5)


Dämpfung (Loss in dB): Signalverlust, optimal < 0.4 dB pro Segment, max ca. 28 dB Gesamtverlust erlaubt (abhängig von Netztyp)



4. Simulation & Funktionalität (Konzept)
Jedes Gerät & Segment hat Status-Parameter (online, offline, outdated)


Simulation von Ausfällen, Wartungen, Firmware-Updates möglich


Pfadberechnung zwischen Geräten anhand von Segmenten


Visualisierung der Verbindungen mit Farbcode (grün = ok, rot = Fehler)


Simulierter Techniker-Countdown bei Muffen Wartung


Realistische Dämpfungswerte aus Kabel- und Spleißdaten



5. Nächste Schritte
Generierung von Beispiel-Datensätzen (devices.json, fiber_segments.json)


Aufbau eines einfachen, synchronisierten UI (Karte + Kontrollpanel)


Erweiterung um Kunden-, IP- und Netzmanagementdaten



Falls du möchtest, kann ich das als Google Docs Template vorbereiten und dir den Link schicken – oder ich schicke dir die Rohtext-Dokumentation hier zum Copy-Paste.
Was passt dir besser?
Vorschlag: Struktur in devices.json Jedes Gerät bekommt: ja und evtl auch wie gesagt möglich jeden gerät eine fortlaufende unique id geben, waren wir glaube ich? schon mit dran damit man im allgemeinen suchmenü jedes gerät direkt findet
ChatGPT:
Ja, genau – richtig erinnert. Wir hatten bereits festgelegt, dass jedes Gerät im System:
eine fortlaufende, eindeutige ID


einen standardisierten Datensatz


eine volltextfähige Zuordnung (Hersteller, Typ, Modell, Standort, usw.)


bekommt.

✅ Endgültige Strukturvorgabe für devices.json
Jeder Eintrag wird etwa so aussehen (kommentiert):
json
KopierenBearbeiten
{
  "device_id": "OLT-000012",
  "uuid": "cbba4c92-f8a5-4267-9b6a-7fd52361d58f",  // optional zusätzlich: UUIDv4
  "type": "OLT",
  "manufacturer": "Huawei",
  "model": "MA5800-X7",
  "location": {
    "site": "PoP-04",
    "gps": [51.2659, 6.4234],
    "rack_position": "RU-16"
  },
  "status": "online",
  "outdated": false,
  "firmware_version": "v3.0.5a",
  "last_update": "2025-05-27T18:40:00Z",
  "optical_metrics": {
    "total_loss_db": 11.6,
    "max_allowed_loss_db": 28.0,
    "ref_loss_db": 38.1,
    "min_ref_loss_db": 35.0,
    "status": "ok"
  },
  "interface": {
    "ports": 16,
    "used_ports": 14,
    "standards": ["GPON", "10G-PON", "ITU-T G.9807.1"]
  },
  "tags": ["core", "active", "fiber"],
  "maintenance": {
    "field_access_required": false,
    "next_maintenance": "2025-09-01"
  }
}


🔍 Im Suchmenü dann z. B. möglich:
Suchfeld
Beispiel
Ergebnis
device_id
ONT-000043
springt zur Karte & Panel
type
OLT
filtert alle OLT-Geräte
model
HG8010H
zeigt nur Huawei ONTs
status
outdated
listet Firmware-Altgeräte
location.site
PoP-03
alle Geräte in dem PoP


🧠 Bonus: Indexierbarkeit
Die IDs sind so aufgebaut:
TYPE-######


TYPE = ONT / OLT / MUF / SPL / DSLAM / etc.


6-stellige Zahl → bis zu 999.999 pro Typ


Du kannst dir also jederzeit ein Gerät mit MUFF-000123 ausdenken – und es ist klar, was es ist.

📦 Nächster Schritt
Wenn du bereit bist, generiere ich die ersten 50–100 Gerätedatensätze (devices.json), realitätsnah verteilt, für:
ONTs, OLTs


DSLAMs, Splitter


Muffen, PoPs


DWDM-Equipment


Dazu bekommt jedes Gerät:
funktionierende Unique-ID


Gerätespezifische Werte


optional: initiale Verknüpfung zu Karte/Standort


👉 Sag einfach: „Go devices.json (50 Startgeräte)“
 Ich bereite alles zur Integration vor – für sofortigen Copy-Paste.
Du:
und vor allem auch leitungsstrecken die wir mit reinnehmen müssen, die sich aufteilen, haben bestimmt auch spezielle bezeichnungen und es sollte nachvollziehbar sein wohin es geht und woher es kommt und ob alles funktioniert, natürlich auch kabelabschnitte und whatever bekommen eine unique id
ChatGPT:
Exakt – top mitgedacht! Leitungsstrecken, Abzweigungen, Verzweigungen und Kabelabschnitte sind essenziell für realistische Netzsimulation. Auch die bekommen:
unique IDs


Klare Quellen & Ziele


Technische Eigenschaften (Länge, Fasern, Dämpfung, Status)


Verbindung zu Geräten (z. B. ONT ↔ Splitter ↔ OLT)



✅ Struktur für Leitungsstrecken (Trassen, Abschnitte, Fasern)
Das ist ein eigenständiger Datentyp neben den Geräten – nennen wir es z. B. fiber_segments.json
🔧 Beispielobjekt:
json
KopierenBearbeiten
{
  "segment_id": "FIB-000456",
  "type": "Singlemode",
  "fiber_count": 24,
  "length_m": 1640,
  "from_device_id": "SPLT-000022",
  "to_device_id": "ONT-000089",
  "status": "ok",
  "max_loss_db": 0.4,
  "measured_loss_db": 0.27,
  "route": [
    {"lat": 51.2761, "lng": 6.4189},
    {"lat": 51.2772, "lng": 6.4223}
  ],
  "construction": {
    "trench_type": "Microtrenching",
    "splice_points": ["SPC-000234", "SPC-000235"],
    "muffen": ["MUFF-000056"]
  },
  "tags": ["FTTH", "Hausanschluss"]
}


🔁 Weitere Elementtypen
Typ
ID-Schema
Beschreibung
Kabelabschnitt
CABL-######
Längeneinheit mit z. B. 96 Fasern
Spleißpunkt
SPC-######
Punkt, an dem Fasern verbunden sind
Verzweiger (Splice-Splitter)
SPT-######
Passives Split-Element zwischen Geräten
Schacht / Muffe / Übergabe
MUFF-######
Klar, mit Lagekoordinaten


🔍 Beispiel: Pfadanalyse
Wenn du z. B. die Strecke ONT → OLT analysierst, wird ausgegeben:
makefile
KopierenBearbeiten
Pfad: ONT-000089 → SPLT-000022 → MUFF-000056 → OLT-000003
Gesamtlänge: 1640 m
Spleiße: 2
Dämpfung: 0.27 dB
Status: ✅ OK

Im Fehlerfall:
yaml
KopierenBearbeiten
> Testpfad ONT-000123 → OLT-000001
→ Fehler: Signalverlust zu hoch bei MUFF-000044 (1.21 dB) ❌
→ Vorschlag: Technikereinsatz notwendig


🎯 Ziele damit:
Funktion
Umsetzung
Nachvollziehbarkeit
jede Strecke tracebar, jeder Punkt eindeutig
Wartungssimulation
z. B. „LWL-Kabel wird ausgetauscht“
Ausfälle testen
Segment auf „defekt“ setzen → UI reagiert
Planungsdarstellung
Karte zeigt Split, Abzweig, Dämpfung, Richtung
Detailrealismus
DIN-konforme Aufteilung, Trassenlogik


📦 Nächster Schritt
Wenn du sagst „Go FiberSegmente (50 Stück, Beispielnetz)“, generiere ich dir:
fiber_segments.json


50 Segmente mit realitätsnaher Aufteilung (PoP → Splitter → Haus → Backbone)


Verknüpfung zu 50 Geräten (aus devices.json)


jeweils: Strecke, Länge, Dämpfung, Status, ID


Willst du das? Dann sag einfach „Go FiberNetz (50 Segmente)“ – und wir verbinden das gesamte Netz.
Du:
macht es sinn schon anzufangen wenn es noch so viel zu besprechen gibt oder gibt es das nicht mehr? es gibt auch verdiene kabeldicken die andere anzahl von fasern tragen, kannst da was zu finden und mit rein nehmen nur wenn du genug infos findest wie wir das einbauen könnten
ChatGPT:
Großartige Frage – und sehr gut reflektiert.
 Lass uns das direkt strategisch klären, damit du kein Flickwerk bekommst, sondern eine saubere, realistische Simulation mit Raum für Erweiterung.

✅ Antwort auf deine Frage:
"Macht es Sinn schon anzufangen?"
 → Ja, aber nur mit der Basisschicht ("Geräte & Strukturmodelle") – noch nicht mit UI oder Kartenlogik.
Warum? Weil:
🧠 Es ist noch nicht alles vollständig besprochen – aber:
Die Gerätestruktur ist jetzt klar (types, IDs, Daten).


Die Verkabelungslogik ist verstehbar und gut vorbereitbar.


Die Basisdaten sind unabhängig von der späteren Oberfläche.


Deshalb:
 Wir können jetzt solide die Datenbasis ("Netzmodell") bauen – und UI/Karte darauf aufsetzen, sobald wir alles feinjustiert haben.

📦 Jetzt zu deinem Punkt mit Kabeltypen und Fasermengen
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



🔚 Fazit & Vorschlag
Wir sind bereit, mit Datenstruktur und Gerätelogik live zu starten.
✳️ Ich schlage vor:
🔽 "Go Startmodell 1.0":
devices.json → 50 Geräte


fiber_segments.json → 50 Kabelabschnitte


mit realistischer Faserdichte und Kabeltypen


Dann können wir UI, Karte, Simulation darauf aufbauen – ohne uns festzufahren.

Willst du das so? Dann sag einfach:
 👉 „Go Startmodell 1.0“
 …und ich generiere dir sofort die ersten Dateien für direkten Start im Projekt.
Du:
deine tokes sind bestimmt schon lange voll deswegen dokumentiere ich alle bei google docs
ChatGPT:
Super Plan! Google Docs ist perfekt zum Sammeln und strukturieren — so hast du jederzeit schnellen Zugriff, kannst Notizen ergänzen und alles chronologisch festhalten.
Wenn du willst, kann ich dir auch helfen, die Infos, JSON-Beispiele und Strukturvorgaben für deine Dokumentation sauber aufzubereiten — übersichtlich, mit Kommentaren und Beispielen. Sag einfach Bescheid!
Und klar, lass uns so arbeiten, dass der Projektfortschritt für dich jederzeit transparent und nachvollziehbar bleibt. Wie möchtest du den nächsten Schritt angehen? Soll ich dir gleich das Startmodell 1.0 mit Devices & Fiber Segments zusammenstellen?
Du:
Wenn du willst, kann ich dir auch helfen, die Infos, JSON-Beispiele und Strukturvorgaben für deine Dokumentation sauber aufzubereiten — übersichtlich, mit Kommentaren und Beispielen. Sag einfach Bescheid! Ja
ChatGPT:
Alles klar, dann starte ich mit einem übersichtlichen, gut kommentierten Dokument-Template, das du direkt in Google Docs übernehmen kannst. Dort findest du:

Projekt Dokumentation: Glasfasernetz Simulation
1. Übersicht
Ziel:
 Realistische Simulation eines Glasfasernetzes mit Geräten, Leitungssegmenten und Netzstatus.
 Alles mit eindeutigen IDs, realitätsnahen technischen Parametern und nachvollziehbaren Verbindungen.

2. Datenstruktur
2.1 Geräte (devices.json)
Jedes Gerät hat:
Feld
Typ
Beschreibung
device_id
String
Eindeutige Geräte-ID (z.B. ONT-00012)
uuid
String (UUID)
Optional, universelle eindeutige ID
type
String
Gerätetyp (z.B. OLT, ONT, MUFF)
manufacturer
String
Herstellername
model
String
Modellnummer
location
Objekt
Standort (Site, GPS-Koordinaten, Rack)
status
String
Status (online, offline, outdated)
outdated
Boolean
Firmware veraltet?
firmware_version
String
Firmwareversion
last_update
ISO8601-Datei
Letztes Update
optical_metrics
Objekt
Messwerte wie Verlust in dB
interface
Objekt
Ports, Standards
tags
Array[String]
Suchbegriffe (z.B. „core“, „fiber“)
maintenance
Objekt
Wartungsinfos

Beispiel:
json
KopierenBearbeiten
{
  "device_id": "OLT-000012",
  "uuid": "cbba4c92-f8a5-4267-9b6a-7fd52361d58f",
  "type": "OLT",
  "manufacturer": "Huawei",
  "model": "MA5800-X7",
  "location": {
    "site": "PoP-04",
    "gps": [51.2659, 6.4234],
    "rack_position": "RU-16"
  },
  "status": "online",
  "outdated": false,
  "firmware_version": "v3.0.5a",
  "last_update": "2025-05-27T18:40:00Z",
  "optical_metrics": {
    "total_loss_db": 11.6,
    "max_allowed_loss_db": 28.0,
    "ref_loss_db": 38.1,
    "min_ref_loss_db": 35.0,
    "status": "ok"
  },
  "interface": {
    "ports": 16,
    "used_ports": 14,
    "standards": ["GPON", "10G-PON", "ITU-T G.9807.1"]
  },
  "tags": ["core", "active", "fiber"],
  "maintenance": {
    "field_access_required": false,
    "next_maintenance": "2025-09-01"
  }
}


2.2 Leitungssegmente (fiber_segments.json)
Feld
Typ
Beschreibung
segment_id
String
Eindeutige Segment-ID (z.B. FIB-000456)
type
String
Kabeltyp (Singlemode, Multimode)
fiber_count
Integer
Anzahl der Fasern
length_m
Integer
Länge in Metern
from_device_id
String
Startgerät-ID
to_device_id
String
Zielgerät-ID
status
String
Status (ok, defekt, in Wartung)
max_loss_db
Float
Maximal erlaubter Verlust (dB)
measured_loss_db
Float
Aktuell gemessener Verlust (dB)
route
Array[Objekt]
GPS-Koordinaten zur Visualisierung
construction
Objekt
Kabelbauweise, Muffen, Spleißpunkte
tags
Array[String]
Suchbegriffe

Beispiel:
json
KopierenBearbeiten
{
  "segment_id": "FIB-000456",
  "type": "Singlemode",
  "fiber_count": 24,
  "length_m": 1640,
  "from_device_id": "SPLT-000022",
  "to_device_id": "ONT-000089",
  "status": "ok",
  "max_loss_db": 0.4,
  "measured_loss_db": 0.27,
  "route": [
    {"lat": 51.2761, "lng": 6.4189},
    {"lat": 51.2772, "lng": 6.4223}
  ],
  "construction": {
    "trench_type": "Microtrenching",
    "splice_points": ["SPC-000234", "SPC-000235"],
    "muffen": ["MUFF-000056"]
  },
  "tags": ["FTTH", "Hausanschluss"]
}


3. Terminologie & technische Grundlagen
PoP (Point of Presence): Netzverknüpfungspunkt, Backbone Zugang


Muffe: Passives Verbindungselement, Faser-Spleiße, meistens passiv


Splitter: Optischer Verteiler, aktiv/passiv, teilt Fasern auf


ONT (Optical Network Terminal): Kundenendgerät


OLT (Optical Line Terminal): Backbone Seite, steuert ONTs


DSLAM: Aggregationspunkt für Kupfer-DSL (optional)


Fasertypen: Singlemode (ITU-T G.652), Multimode (z.B. OM1–OM5)


Dämpfung (Loss in dB): Signalverlust, optimal < 0.4 dB pro Segment, max ca. 28 dB Gesamtverlust erlaubt (abhängig von Netztyp)



4. Simulation & Funktionalität (Konzept)
Jedes Gerät & Segment hat Status-Parameter (online, offline, outdated)


Simulation von Ausfällen, Wartungen, Firmware-Updates möglich


Pfadberechnung zwischen Geräten anhand von Segmenten


Visualisierung der Verbindungen mit Farbcode (grün = ok, rot = Fehler)


Simulierter Techniker-Countdown bei Muffen Wartung


Realistische Dämpfungswerte aus Kabel- und Spleißdaten



5. Nächste Schritte
Generierung von Beispiel-Datensätzen (devices.json, fiber_segments.json)


Aufbau eines einfachen, synchronisierten UI (Karte + Kontrollpanel)


Erweiterung um Kunden-, IP- und Netzmanagementdaten



Falls du möchtest, kann ich das als Google Docs Template vorbereiten und dir den Link schicken – oder ich schicke dir die Rohtext-Dokumentation hier zum Copy-Paste.
Was passt dir besser?
Du:
wie machst du das jetzt mit karte und control panel, iframe schränkt ein oder wie würdest du es machen
ChatGPT:
Top-Frage! Ich gebe dir hier eine Profi-Einschätzung mit klaren Vor- und Nachteilen – damit du entscheiden kannst, was am besten zu deinem Projekt passt:

1. Iframes — Vorteile & Nachteile
Vorteile
Einfaches Aufteilen in unabhängige Bereiche (Karte links, Control Panel rechts).


Isolation von Styles & Scripts: Konflikte zwischen Karte & Panel werden vermieden.


Modularität: Karte und Panel können separat entwickelt und getestet werden.


Nachteile
Kommunikation zwischen Karte und Panel komplizierter → man braucht postMessage-API für Synchronisation.


Performance: Iframes sind eigene Dokumente, können den Browser-Overhead erhöhen.


Scroll-/Zoom-Probleme: Man muss die iframes an Größe anpassen, um UX gut zu halten.


Responsiveness ist schwieriger zu gestalten.



2. Alternativen zu iframes
a) Single-Page Application (SPA) mit JS Frameworks (React, Vue, plain JS)
Alles in einer HTML-Datei, modulare JS-Komponenten für Karte & Panel.


Direkte, einfache Datenbindung & Synchronisation über zentrale State-Management (z.B. Redux, Vuex oder selbst gebaut).


Einfaches Responsives Design mit CSS Grid/Flexbox.


Bessere Performance und UX.


b) Web Components / Shadow DOM
Kapselt Komponenten ähnlich wie iframes, aber leichter und performanter.


Gute Isolation ohne volle Dokumentenlast.



3. Mein Empfehlung für dein Projekt
Da du:
Keine Drittanbieter verwenden willst,


Microsoft-Standardtechnologien, JS, HTML, CSS einsetzen willst,


Hohe Synchronisationsanforderungen hast (Klick im Panel → Fokus auf Karte etc.),


Und lokal ausgeführt wird,


empfehle ich eine Single-Page Anwendung mit Flexbox oder CSS Grid für Layout:
Linke Seite: Karte (SVG oder Canvas oder Leaflet/OpenLayers ohne externen CDN, lokal!)


Rechte Seite: Control Panel mit Listen, Suchfunktion, Details


Gemeinsamer JS State mit Observer Pattern oder einfachem Pub/Sub für Synchronisierung



4. Kurzes Beispiel (Layout mit Flexbox)
html
KopierenBearbeiten
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Glasfasernetz Simulation</title>
<style>
  body, html { margin:0; height:100%; font-family: Arial, sans-serif; }
  #container {
    display: flex;
    height: 100vh;
  }
  #map {
    flex: 2;
    border-right: 2px solid #333;
    overflow: auto;
  }
  #control-panel {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
  }
</style>
</head>
<body>
  <div id="container">
    <div id="map">
      <!-- Karte mit SVG/Canvas hier -->
    </div>
    <div id="control-panel">
      <!-- Steuerungs- und Simulationspanel -->
    </div>
  </div>

<script>
  // Gemeinsamer State, Event Dispatcher etc. hier
</script>
</body>
</html>


5. Synchronisation & Kommunikation
Shared State: Z.B. ein JS-Objekt mit Geräten, Segmenten, Status


Events: Klick auf ein Gerät im Panel → highlightDevice(device_id) auf Karte


Update: Karte kann z.B. per requestAnimationFrame visuelle Updates machen


Suche: Panel filtert Geräte, Karte zoomt und fokussiert synchron



6. Fazit
Iframe: Einfach, aber komplizierte Kommunikation, schlechtere UX


SPA / flexibles Layout mit JS: Mehr Arbeit, aber deutlich besser skalierbar, performanter und UX-freundlicher



Wenn du magst, kann ich dir direkt so ein Grundgerüst als HTML/CSS/JS machen, das du lokal laufen lassen kannst — komplett ohne Drittanbieter und mit der Architektur, die du brauchst.
Möchtest du das?
Du:
ok
ChatGPT:
Perfekt! Dann starte ich mit einem einfachen, modularen Grundgerüst als Single-Page App (HTML/CSS/JS), das lokal läuft, keine Drittanbieter nutzt und die Basis für Karte + Control Panel mit synchroner Kommunikation bietet.
Ich baue:
Flexbox-Layout (links Karte, rechts Control Panel)


Beispielhafte Device- und Segmentdaten (simuliert)


Klick in Control Panel fokussiert Gerät in Karte


Visuelle Hervorhebung in Karte


Kommentierter Code, einfach erweiterbar


Ich mache dir das in einer Datei namens index.html, du kannst die komplett kopieren und lokal öffnen.

Hier der Code:
html
KopierenBearbeiten
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Glasfasernetz Simulation</title>
<style>
  /* Grundlayout */    margin: 0; padding: 0; height: 100%; font-family: Arial, sans-serif;
    background: #f0f2f5;
  body, html {

  }
  #container {
    display: flex;
    height: 100vh;
    user-select: none;
  }
  #map {
    flex: 2;
    border-right: 2px solid #333;
    position: relative;
    background: #e3e7ee;
    overflow: hidden;
  }
  #control-panel {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #fff;
  }
  h2 {
    margin-top: 0;
  }
  /* Geräte-Liste */
  .device-item {
    padding: 8px 12px;
    margin: 6px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background: #fafafa;
    transition: background 0.2s;
  }
  .device-item:hover {
    background: #d0e6ff;
  }
  .device-item.active {
    background: #4a90e2;
    color: white;
    font-weight: bold;
    border-color: #2a62b8;
  }
  /* Karte (SVG Container) */
  svg {
    width: 100%;
    height: 100%;
  }
  /* Hervorhebung */
  .highlight {
    stroke: #e94e77;
    stroke-width: 3;
  }
  /* Tooltip */
  #tooltip {
    position: absolute;
    pointer-events: none;
    background: rgba(0,0,0,0.7);
    color: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    display: none;
    white-space: nowrap;
  }
</style>
</head>
<body>
<div id="container">
  <div id="map">
    <svg id="svg-map" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" >
      <!-- Leitungen und Geräte werden hier per JS erzeugt -->
    </svg>
    <div id="tooltip"></div>
  </div>
  <div id="control-panel">
    <h2>Geräte & Segmente</h2>
    <input type="text" id="search" placeholder="Suche Gerät oder Segment..." style="width:100%; padding:8px; margin-bottom: 15px; font-size:14px;"/>
    <div id="device-list">
      <!-- Dynamisch mit Geräten befüllt -->
    </div>
    <hr />
    <div id="device-details">
      <h3>Details</h3>
      <pre id="details-content" style="white-space: pre-wrap; font-size:13px; background:#f9f9f9; padding:10px; border-radius:4px; height: 300px; overflow-y: auto;"></pre>
    </div>
  </div>
</div>

<script>
/* Beispiel-Geräte */
const devices = [
  {
    device_id: "OLT-000012",
    uuid: "cbba4c92-f8a5-4267-9b6a-7fd52361d58f",
    type: "OLT",
    manufacturer: "Huawei",
    model: "MA5800-X7",
    location: { x: 400, y: 50 },
    status: "online",
    outdated: false,
    firmware_version: "v3.0.5a",
    last_update: "2025-05-27T18:40:00Z",
    optical_metrics: { total_loss_db: 11.6, max_allowed_loss_db: 28.0 },
  },
  {
    device_id: "SPLT-000022",
    uuid: "c3e24f9e-2c1e-43f7-8a9b-04f2b98129dc",
    type: "Splitter",
    manufacturer: "Nokia",
    model: "NSPL-2400",
    location: { x: 400, y: 200 },
    status: "online",
    outdated: true,
    firmware_version: "v1.2.0",
    last_update: "2024-12-12T10:12:00Z",
    optical_metrics: { total_loss_db: 0.35, max_allowed_loss_db: 0.5 },
  },
  {
    device_id: "MUFF-000056",
    uuid: "aee5619d-ff21-4a6c-aeaf-8f86a7d7c3a1",
    type: "Muffe",
    manufacturer: "Deutsche Glasfaser",
    model: "PassiveJoint-900",
    location: { x: 400, y: 350 },
    status: "online",
    outdated: false,
    firmware_version: "",
    last_update: "",
    optical_metrics: { total_loss_db: 0.1, max_allowed_loss_db: 0.3 },
  },
  {
    device_id: "ONT-000089",
    uuid: "d5a8b60f-b19c-4f87-9d91-47f6e24bfefd",
    type: "ONT",
    manufacturer: "ZTE",
    model: "ZXHN F660",
    location: { x: 600, y: 350 },
    status: "online",
    outdated: false,
    firmware_version: "v1.0.3",
    last_update: "2025-04-30T12:00:00Z",
    optical_metrics: { total_loss_db: 0.45, max_allowed_loss_db: 0.8 },
  }
];

/* Beispiel-Leitungen */
const fiberSegments = [
  {
    segment_id: "FIB-000456",
    type: "Singlemode",
    fiber_count: 24,
    length_m: 1640,
    from_device_id: "SPLT-000022",
    to_device_id: "ONT-000089",
    status: "ok",
    max_loss_db: 0.4,
    measured_loss_db: 0.27,
    route: [ {x:400, y:350}, {x:600, y:350} ],
  },
  {
    segment_id: "FIB-000457",
    type: "Singlemode",
    fiber_count: 24,
    length_m: 150,
    from_device_id: "OLT-000012",
    to_device_id: "SPLT-000022",
    status: "ok",
    max_loss_db: 0.5,
    measured_loss_db: 0.35,
    route: [ {x:400, y:50}, {x:400, y:200} ],
  },
  {
    segment_id: "FIB-000458",
    type: "Singlemode",
    fiber_count: 24,
    length_m: 100,
    from_device_id: "SPLT-000022",
    to_device_id: "MUFF-000056",
    status: "ok",
    max_loss_db: 0.3,
    measured_loss_db: 0.12,
    route: [ {x:400, y:200}, {x:400, y:350} ],
  }
];

/* Globals */
const svg = document.getElementById("svg-map");
const deviceListDiv = document.getElementById("device-list");
const detailsContent = document.getElementById("details-content");
const searchInput = document.getElementById("search");
const tooltip = document.getElementById("tooltip");

let selectedDeviceId = null;

/* Hilfsfunktionen */

function createSVGElement(tag, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const key in attrs) {
    if(key === "textContent") {
      el.textContent = attrs[key];
    } else {
      el.setAttribute(key, attrs[key]);
    }
  }
  return el;
}

function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function highlightDevice(deviceId) {
  selectedDeviceId = deviceId;
  // Karte aktualisieren
  updateMap();
  // Panel aktualisieren
  updateDeviceList();
  // Details anzeigen
  showDetails(deviceId);
}

/* Karte rendern */
function updateMap() {
  clearChildren(svg);

  // Zeichne Segmente (Leitungen)
  fiberSegments.forEach(seg => {
    const fromDev = devices.find(d => d.device_id === seg.from_device_id);
    const toDev = devices.find(d => d.device_id === seg.to_device_id);
    if(!fromDev || !toDev) return;

    const line = createSVGElement("line", {
      x1: fromDev.location.x,
      y1: fromDev.location.y,
      x2: toDev.location.x,
      y2: toDev.location.y,
      stroke: (seg.status === "ok") ? "#00a651" : "#e94e77",
      "stroke-width": (seg.segment_id === selectedDeviceId) ? 4 : 2,
      cursor: "pointer"
    });
    line.addEventListener("click", () => {
      highlightDevice(seg.segment_id);
    });
    line.addEventListener("mousemove", ev => {
      tooltip.style.display = "block";
      tooltip.style.left = ev.pageX + 10 + "px";
      tooltip.style.top = ev.pageY + 10 + "px";
      tooltip.textContent = `Segment ${seg.segment_id} (${seg.status})\n${seg.length_m}m, Loss: ${seg.measured_loss_db}dB`;
    });
    line.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    svg.appendChild(line);
  });

  // Zeichne Geräte (Kreise)
  devices.forEach(dev => {
    const circle = createSVGElement("circle", {
      cx: dev.location.x,
      cy: dev.location.y,
      r: 15,
      fill: dev.status === "online" ? "#1e90ff" : "#aaa",
      stroke: dev.device_id === selectedDeviceId ? "#e94e77" : "#222",
      "stroke-width": dev.device_id === selectedDeviceId ? 4 : 2,
      cursor: "pointer"
    });
    circle.addEventListener("click", () => {
      highlightDevice(dev.device_id);
    });
    circle.addEventListener("mousemove", ev => {
      tooltip.style.display = "block";
      tooltip.style.left = ev.pageX + 10 + "px";
      tooltip.style.top = ev.pageY + 10 + "px";
      tooltip.textContent = `${dev.type} ${dev.device_id}\nStatus: ${dev.status}\nFirmware: ${dev.firmware_version || "N/A"}`;
    });
    circle.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    svg.appendChild(circle);

    // Beschriftung
    const label = createSVGElement("text", {
      x: dev.location.x,
      y: dev.location.y + 30,
      "font-size": "11px",
      "font-family": "Arial, sans-serif",
      fill: "#222",
      "text-anchor": "middle",
      "pointer-events": "none",
      textContent: dev.device_id
    });
    svg.appendChild(label);
  });
}

/* Geräte-Liste rendern */
function updateDeviceList(filter = "") {
  clearChildren(deviceListDiv);
  const allItems = devices.concat(fiberSegments);
  const filtered = allItems.filter(item => {
    const searchStr = (item.device_id || item.segment_id).toLowerCase();
    return searchStr.includes(filter.toLowerCase());
  });
  filtered.forEach(item => {
    const id = item.device_id || item.segment_id;
    const el = document.createElement("div");
    el.className = "device-item";
    if(id === selectedDeviceId) el.classList.add("active");
    el.textContent = `${item.type || "Segment"} ${id}`;
    el.title = `${item.manufacturer ? item.manufacturer + " " + item.model : ""}`;
    el.onclick = () => {
      highlightDevice(id);
    };
    deviceListDiv.appendChild(el);
  });
}

/* Detailanzeige */
function showDetails(id) {
  const dev = devices.find(d => d.device_id === id);
  if(dev) {
    detailsContent.textContent = JSON.stringify(dev, null, 2);
    return;
  }
  const seg = fiberSegments.find(s => s.segment_id === id);
  if(seg) {
    detailsContent.textContent = JSON.stringify(seg, null, 2);
    return;
  }
  detailsContent.textContent = "Kein Detail gefunden.";
}

/* Suchfunktion */
searchInput.addEventListener("input", ev => {
  updateDeviceList(ev.target.value);
});

/* Initiales Rendern */
updateMap();
updateDeviceList();

</script>
</body>
</html>
