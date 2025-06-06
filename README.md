# NetSim

**NetSim** ist eine modulare Netzwerksimulationsplattform, die es ermöglicht, komplexe Netzwerk-Infrastrukturen zu simulieren, zu analysieren und zu optimieren. Das Projekt besteht aus klar getrennten Modulen für das Node- und Link-Management, einer leistungsstarken Simulations-Engine sowie einer benutzerfreundlichen UI (Control Panel) und einem Dashboard. Die Kommunikation zwischen den Modulen erfolgt über einen zentralen EventBus.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Modulare Architektur](#modulare-architektur)
- [Tests](#tests)
- [Beitragen](#beitragen)
- [Lizenz](#lizenz)

## Überblick

NetSim erlaubt es, Netzwerk-Knoten und Verbindungen zu erstellen, Fehler (Failures) gezielt zu simulieren und das Verhalten des Systems in Echtzeit zu überwachen. Die Plattform unterstützt Szenarien wie Traffic-Simulation, Failover-Tests und Echtzeit-Feedback über das Dashboard.

## Features

- **Modularer Aufbau:**  
  - **Node Management:** Verwaltung und Statusüberwachung von Knoten.
  - **Link Management:** Erstellen und Überwachen von Verbindungen sowie Fehler-Injektion.
  - **Simulations-Engine:** Taktgesteuerte Simulation und Event-Verarbeitung.
  - **UI / Control Panel:** Interaktive Oberfläche zur Steuerung der Simulation.
  - **Dashboard:** Echtzeit-Visualisierung und Monitoring.
  - **Konfigurationsmanagement:** Dynamische Anpassung von Parametern via UI.

- **Einfache Erweiterbarkeit:** Durch den modularen Aufbau und die lose gekoppelte Kommunikation (über den EventBus) können neue Features leicht integriert werden.
- **Automatisiertes Testen und CI/CD:** Integrierte Unit- und Integrationstests sowie eine CI/CD-Pipeline (zum Beispiel mit GitHub Actions) sichern die Code-Qualität.

## Installation

1. **Repository klonen:**

   ```bash
   git clone https://your-repository-url.git
   cd your-repository-directory

2. Abhängigkeiten installieren:

3. bash
npm install
Verwendung
Lokale Ausführung der Tests:

4. bash
npm test
Entwicklung und Watch Mode:

5. bash
npm run test:watch
Start der Anwendung: (Hier je nach Konfiguration oder über das Start-Skript, z. B. npm run start)

Modulare Architektur
Das Projekt basiert auf mehreren, klar abgegrenzten Modulen:

Node Management Modul

Link Management Modul

Simulations-Engine

UI / Control Panel Modul

Dashboard Modul

Configuration Modul

EventBus (für modulübergreifende Kommunikation)

Ziel ist es, mit dieser Architektur einen hohen Grad an Flexibilität und Skalierbarkeit zu erreichen.

Tests
Das Testsystem basiert auf Jest. Die Tests gliedern sich in Unit-Tests (für einzelne Module) und Integrationstests (für das Zusammenspiel der Module). Die Anleitung zur Testausführung findest du im Abschnitt "Testausführung" im Wiki oder in unserer internen Dokumentation.

Beitragen
Beiträge zu NetSim sind willkommen! Bitte beachte vor dem Einreichen von Änderungen unsere Richtlinien in der [CONTRIBUTING.md].

Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe die LICENSE Datei für Details.

Hinweis: Dieser Text dient als Beispiel und kann nach Bedarf erweitert oder angepasst werden.
