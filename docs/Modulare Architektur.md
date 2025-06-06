# Modulare Architektur

## Überblick
NetSim basiert auf einem modularen Aufbau, um die Erweiterbarkeit und Wartbarkeit der Anwendung zu gewährleisten. Jedes Modul hat eine klar definierte Aufgabe und kommuniziert über einen zentralen EventBus miteinander.

## Module im Detail

- **Node Management Modul:**  
  Verantwortlich für das Erstellen, Überwachen und Verwalten von Netzwerk-Knoten. Anpassungen an den Knotenstatus (online, offline, fehlerhaft) werden hier zentral gesteuert.

- **Link Management Modul:**  
  Steuert die Verbindungen zwischen den einzelnen Knoten, simuliert Latenzen, Bandbreitenbeschränkungen und Ausfälle und bildet so das Netzwerk-Topologie-Abbild ab.

- **UI / Control Panel Modul:**  
  Stellt die Benutzeroberfläche bereit, über die der Nutzer Simulationen starten, Knoten hinzufügen/entfernen und weitere Konfigurationen vornehmen kann.

- **Dashboard Modul:**  
  Bietet Echtzeit-Visualisierungen der Netzwerkmetriken, Logs und Performance-Daten. So erhält der Nutzer wertvolle Einblicke in die Systemperformance.

- **EventBus:**  
  Ermöglicht die entkoppelte Kommunikation zwischen den Modulen, sodass Änderungen in einem Modul automatisch in anderen reflektiert werden können.

## Vorteile dieser Architektur

- **Skalierbarkeit:**  
  Neue Module können problemlos hinzugefügt werden, ohne bestehende Funktionalitäten zu beeinträchtigen.
  
- **Wartbarkeit:**  
  Durch die klare Trennung der Verantwortlichkeiten lassen sich einzelne Module unabhängig voneinander weiterentwickeln oder debuggen.
  
- **Flexibilität:**  
  Verschiedene Einsatzszenarien (z. B. Testing, Production) können durch gezielte Anpassungen einzelner Module simuliert werden.
