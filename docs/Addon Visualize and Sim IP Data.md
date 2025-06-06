Erweiterung: Visualisierung und Simulation von IP-Datenwegen im Glasfasernetz
1. Was soll die Visualisierung können?
Backbone als Ursprungspunkt (z. B. Rechenzentrum oder Haupt-POP)


Verbindungsweg einer IP zu einem Kunden anzeigen (Trassen, Muffen, POPs, Edges)


Dynamische Zeitsteuerung (Wegverfolgung zu einem bestimmten Zeitpunkt)


Anzeige von Ausfällen / Störungen an Knoten (POPs) oder Trassen (Kabel/Muffen)


Automatische Neuberechnung alternativer Pfade bei Ausfall


Visualisierung von IP-Tunneling / NAT-Session-Flows auf dem Pfad


Detail-Infos bei Klick auf Netz-Element (z. B. Spleißmuffe: Faserkapazität, Auslastung)


Backbone als Ursprungspunkt (z. B. Rechenzentrum oder Haupt-POP)


Verbindungsweg einer IP zu einem Kunden anzeigen (Trassen, Muffen, POPs, Edges)


Dynamische Zeitsteuerung (Wegverfolgung zu einem bestimmten Zeitpunkt)


Anzeige von Ausfällen / Störungen an Knoten (POPs) oder Trassen (Kabel/Muffen)


Automatische Neuberechnung alternativer Pfade bei Ausfall


Visualisierung von IP-Tunneling / NAT-Session-Flows auf dem Pfad


Detail-Infos bei Klick auf Netz-Element (z. B. Spleißmuffe: Faserkapazität, Auslastung)


2. Architektur-Komponenten
Komponente
Funktion
Backbone Node
Startpunkt für Pfad-Visualisierung
POPs (Point of Presence)
Hauptknoten, Verbindungspunkte zum Backbone
Muffen (Spleißstellen)
Verbindungsknoten, ermöglichen Trassenverzweigungen
Kabeltrassen
Verbindungsleitungen (mit Faseranzahl, Ausfallwahrscheinlichkeit)
Kundenanschlüsse (Edges)
Endpunkte, mit IP-Session-Daten
NAT/CGNAT Layer
Darstellung der IP-Mappings (Port, Session)
Ausfall-Module
Markierung und Simulation von Knoten- oder Leitungsfehlern
Steuerungs-Panel
Zeitsteuerung, Pfad-Auswahl, Ausfall-Simulation, Suche


3. Technische Umsetzungsideen
Graph-Modell des Netzes
 → Netz aus Knoten (POPs, Muffen, Kunden) und Kanten (Kabeltrassen)
 → Pfadsuche via Dijkstra oder A*-Algorithmus (kürzester Weg, Verfügbarkeitsgewicht)


Zeitabhängige Pfad-Visualisierung
 → Simulation mit Zeitachsen-Slider, Pfad-Animation zeigt IP-Fluss


Ausfall-Simulation
 → Per Klick POP oder Kabel „deaktivieren“, Pfad neu berechnen
 → Visuelle Hervorhebung von Ausfällen (rot blinkend, durchgestrichen)


Session-/IP-Datenfluss
 → An jedem Knoten Anzeige, welche IP-Sessions gerade „durchgereicht“ werden
 → Simulierte NAT-Tabellen, Mappings und Port-Infos


Interaktivität
 → Klick auf Pfad zeigt Detailinfos (z. B. Faserkapazität, aktuelle Nutzung)
 → Hover-Tooltipps für schnelle Übersicht



4. Detaillierung der Komponenten
Element
Eigenschaften & Daten
Realismus-Fokus
POP
Standort (GPS), Kapazität, Ausfallwahrscheinlichkeit
Zentrale Knoten, z. B. Rechenzentrum
Muffe
Faseranzahl, Spleißplan, Schutzklassen
Physische Verzweigung, Datenrate
Kabel
Länge, Faseranzahl, Trassen-ID
Kabeltypen (LWL, Multi/Singlemode)
Kunde
IP-Adresse, Anschlusszeit, NAT-Port
Eindeutige IDs, IP-Mapping
NAT-Session
Mapping von interner zu öffentlicher IP, Port, Zeit
Logische Verbindung, Analysebasis


5. Beispiel-Simulation:
Use Case:
„Zeige mir den Weg der IP 85.144.110.61 um 14:12:39 am 28.05.2025, inklusive NAT-Session, über das Netz vom Backbone bis zum Kunden.“
Step 1: Backend-Node selektieren (Backbone)


Step 2: IP + Zeit eingeben (z. B. über Control Panel)


Step 3: System sucht Pfad (unter Berücksichtigung von Ausfällen)


Step 4: Pfad animiert von Backbone → POPs → Muffen → Kabel → Kunde


Step 5: NAT-Mapping an jedem Knoten visualisiert


Step 6: Bei Ausfall eines POPs zeigt System alternative Pfade an


Step 7: Detailinfos & Session-Status werden an jedem Punkt angezeigt



6. Bedenken & Herausforderungen
Datenmodell-Komplexität
 → Reales Glasfasernetz ist riesig, wir simulieren überschaubare Netzbereiche (10–100 Knoten)


Performance & Darstellung
 → Lokale Browser-Ausführung limitiert (Canvas + SVG-Optimierung nötig)


Synchronisierung Panel-Karte
 → Echtzeit-Events via JS, sauberer State-Management-Ansatz (evtl. Redux-ähnliches Pattern)


Realismus vs. Bedienbarkeit
 → Balance zwischen Detailtiefe und User-Erfahrung → Fokus auf intuitive Steuerung


Interne Provider-Notationen & Daten
 → Müssen sinnvoll abstrahiert und plausibel nachgebildet werden (z. B. NAT-Session-IDs)






🚀 Roadmap-Update (Phase 7-9)
Phase
Inhalt
Ergebnis
7
Graph-basierte Pfadberechnung & Anzeige
Dynamische Visualisierung von Netzwerkpfaden
8
Zeitabhängige Simulation mit NAT-Sessiondaten
IP-Fluss visualisiert mit Port- und Zeit-Infos
9
Ausfall-Simulation + alternative Pfadberechnung
Echtzeit-Neuberechnung & Visualisierung


