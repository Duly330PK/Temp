Projekt: Glasfasernetz-Simulator mit IP-Wegverfolgung, Ausfallsimulation & Echtzeit-Overlay
🧠 Ziel des Projekts
Ein lokal ausführbares, interaktives Tool, das ein Glasfasernetz (Layer 1–2) realistisch darstellt, inklusive:

Backbone → POPs → Splitter → Muffen → ONTs (CPE)

Routingpfade (von IPs zu Kunden)

Visualisierung der Datenwege

Live-Status, z. B. Ports, Bandbreite, Sessions

Ausfallanalysen mit sofortiger Wirkung auf die Karte

🗺️ Architekturüberblick
1. Interaktive SVG-Karte
Zeichnet Geräte, Trassen, Muffen etc. als SVG-Objekte

Geräte sind klickbar, mit Statusfarben

Linien (Trassen) verbinden Nodes

Tooltip-Infos + Click-Events

2. Control Panel (UI rechts)
HTML/JS (optional mit Tailwind lokal eingebunden)

Bereiche:

🔍 IP/Kundensuche

📶 Sessiondetails

🧭 "Zeig mir diesen Pfad"

📉 NAT-Tabelle / Ports

🛠 Statusanzeigen (Live)

3. Synchronisierung Map <-> Panel
Panel-Klicks → Karte fokussiert, hebt hervor

Karte-Klicks → Panel zeigt Details

Keine iframes, sondern direkt via JS-Event-Handling

🧰 Technikstack
Aspekt	Umsetzung
Plattform	Reines HTML / CSS / JS
Kartenlogik	SVG direkt (kein Leaflet/Mapbox)
Datenquelle	JS-Objekte / JSON-Datei (loka)
Frameworks	Optional: Tailwind lokal eingebettet
DB-Schema	Siehe noc_db aus deiner SQL-Datei
Server	Keine, rein lokal aufrufbar

🔄 Wegverfolgung / Pfadanalyse
Wenn du z. B. IP 85.144.110.61 suchst:

Script sucht zugehörige device_id

Berechnet Pfad rückwärts:

ONT → Splitter → Muffe → POP → Backbone

Zeigt Pfad als animierten SVG-Highlight (evtl. mit Zeitverlauf)

Bei Ausfall eines Elements:

Live-Pfadänderung, alternative Route

Farbliche Veränderung (z. B. Rot bei Ausfall)

🧪 Simulation & Analyse-Funktionen
Funktion	Beschreibung
IP → Pfad anzeigen	Live-Weg mit Animation
POP-Ausfall	Simuliere Totalausfall, reroute Pfade
Bandbreitenanzeige	Balken o. Farbe pro Leitung
NAT-Tabelle	Mapping der Sessions
Ports anzeigen	Verfügbare/aktive Ports pro OLT
Dämpfungsverluste berechnen	Mittracing entlang Segmenten
Sessiondauer / Uhrzeit	Analyse über Zeitfenster (optional Phase 5)