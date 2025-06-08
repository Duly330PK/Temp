# NOC Simulator Setup – Projekt Dokumentation

## Inhaltsverzeichnis

1. Einführung  
2. Projektübersicht  
3. Technologie-Stack  
4. Projektstruktur  
5. Datenbankdesign  
6. Backend Architektur  
7. Frontend Architektur  
8. API Endpunkte  
9. Authentifizierung & Autorisierung  
10. Entity-Definitionen  
11. Device Management  
12. User Management  
13. Routen im Backend  
14. Datenbankverbindung  
15. Server Setup  
16. Synchronisation & Migration  
17. Fehlerbehandlung  
18. Logging  
19. Security Maßnahmen  
20. Frontend Komponenten  
21. State Management  
22. API Kommunikation  
23. UI Layout  
24. Dashboard Seite  
25. Login Seite  
26. DeviceForm Komponente  
27. DeviceList Komponente  
28. Umgebungsvariablen  
29. Entwicklungsworkflow  
30. Tests & Debugging  
31. Deployment  
32. Weiterentwicklung  
33. FAQ  
34. Glossar  
35. Referenzen  

---

## 1. Einführung

Dieses Projekt simuliert ein Network Operation Center (NOC) zur Verwaltung von Netzwerkgeräten. Es ermöglicht das Anlegen, Anzeigen, Bearbeiten und Löschen von Geräten durch eine Web-Oberfläche und ein Backend mit REST-API.

---

## 2. Projektübersicht

Das System besteht aus einem Node.js-basierten Backend mit TypeORM und MySQL als Datenbank sowie einem React-basierten Frontend. Es unterstützt Authentifizierung per JWT und Device Management.

---

## 3. Technologie-Stack

- Backend: Node.js, Express, TypeORM, MySQL  
- Frontend: React, TypeScript, Vite  
- Authentifizierung: JWT  
- Sonstiges: dotenv, cors, body-parser, bcrypt

---

## 4. Projektstruktur

/
├── backend/
│ ├── entities/
│ ├── routes/
│ ├── src/
│ ├── package.json
│ └── .env
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
├── README.md
└── setup-noc-project.js

yaml
Copy
Edit

---

## 5. Datenbankdesign

Die MySQL-Datenbank enthält Tabellen wie `user`, `device`, `devices` (ältere?), `links`, `alarms`, `sessions`, `tickets`, etc.  
Die `device`-Tabelle hat Spalten: id, name, type, ip, location, status, stats.

---

## 6. Backend Architektur

Backend verwendet Express mit TypeORM für Datenbankzugriffe. Entities wie `User` und `Device` repräsentieren DB-Tabellen. Routen für Authentifizierung und Geräteverwaltung sind modular aufgebaut.

---

## 7. Frontend Architektur

Frontend ist React/TypeScript mit Komponenten für DeviceForm, DeviceList und Seiten wie Dashboard und Login. Die API Kommunikation erfolgt via fetch/axios gegen das Backend.

---

## 8. API Endpunkte

- `POST /api/auth/login` – Login mit Username/Passwort  
- `GET /api/devices` – Liste aller Geräte  
- `POST /api/devices` – Gerät anlegen  
- `PUT /api/devices/:id` – Gerät aktualisieren  
- `DELETE /api/devices/:id` – Gerät löschen

---

## 9. Authentifizierung & Autorisierung

Backend prüft JWT im Authorization Header. Bei gültigem Token wird Zugriff gewährt, sonst 401 Unauthorized. JWT Secret liegt in `.env`.

---

## 10. Entity-Definitionen

`Device` Entity hat Felder: id (PK), name, type, ip, location, status, stats.  
`User` Entity enthält id, username, passwordHash, role.

---

## 11. Device Management

Im Backend können Geräte CRUD Operationen via REST API durchgeführt werden. Frontend bietet Formulare zur Eingabe und Listenanzeige.

---

## 12. User Management

User werden in DB gespeichert mit Hash-Passwort. Admin-User können sich anmelden. Registrierung läuft aktuell nur über DB-Einträge.

---

## 13. Routen im Backend

Routen sind in `routes/auth.ts` und `routes/device.ts` getrennt. Auth Middleware überprüft JWT. Device Router behandelt Geräteoperationen.

---

## 14. Datenbankverbindung

Verbindung via TypeORM DataSource mit Einstellungen aus `.env`. Synchronize ist aus (keine automatische Schemaänderung). Logging ist aktiviert.

---

## 15. Server Setup

Express-Server läuft auf Port 8080, konfiguriert mit CORS, body-parser, und bindet Router ein.

---

## 16. Synchronisation & Migration

Schemaänderungen werden manuell oder via Migrationen eingespielt, Synchronisation automatisch ist deaktiviert.

---

## 17. Fehlerbehandlung

Backend sendet bei Fehlern JSON mit Fehlermeldung und passenden HTTP-Statuscodes (400, 401, 404).

---

## 18. Logging

SQL Queries und Fehler werden im Backend Console-Log angezeigt.

---

## 19. Security Maßnahmen

- Passwort-Hashing mit bcrypt  
- JWT für Sessions  
- CORS aktiv  
- Keine Synchronisation, um DB ungewollt zu verändern

---

## 20. Frontend Komponenten

- DeviceForm: Formular für Geräte anlegen/bearbeiten  
- DeviceList: Anzeige der Geräteliste mit CRUD Optionen

---

## 21. State Management

Verwendung von React State und Context API für Login Status und Device Daten.

---

## 22. API Kommunikation

Frontend ruft API mit Fetch oder Axios auf, sendet JWT im Header.

---

## 23. UI Layout

Einfaches Dashboard mit Navigation zu Login und Geräteliste.

---

## 24. Dashboard Seite

Zeigt Geräteliste, ermöglicht CRUD Aktionen.

---

## 25. Login Seite

Formular zur Eingabe von Username und Passwort, speichert Token lokal.

---

## 26. DeviceForm Komponente

Formular mit Feldern Name, Typ, IP, Location.

---

## 27. DeviceList Komponente

Tabellarische Darstellung aller Geräte mit Edit- und Delete-Buttons.

---

## 28. Umgebungsvariablen

Wichtige Variablen in `.env`:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=noc_simulator
JWT_SECRET=secretkey
PORT=8080

yaml
Copy
Edit

---

## 29. Entwicklungsworkflow

- Backend mit `npm run dev` starten (nodemon + ts-node)  
- Frontend mit `npm run dev` starten (Vite)  
- DB manuell vorbereiten und mit Seed Daten befüllen

---

## 30. Tests & Debugging

Logs zeigen SQL-Queries, Fehler werden über HTTP Statuscodes signalisiert. Nodemon erlaubt Live Reload.

---

## 31. Deployment

Backend und Frontend getrennt deployen, Umgebungsvariablen anpassen.

---

## 32. Weiterentwicklung

Erweiterung um mehr Device-Typen, Ticket-System, Alarme, Link-Verwaltung, UI-Verbesserungen.

---

## 33. FAQ

- Warum zwei Tabellen device/devices? → Legacy?  
- Wie User anlegen? → Manuell in DB mit Hash  
- Wie Token erhalten? → Login Endpoint

---

## 34. Glossar

- NOC: Network Operation Center  
- JWT: JSON Web Token  
- CRUD: Create, Read, Update, Delete  
- ORM: Object Relational Mapping

---

## 35. Referenzen

- TypeORM Docs  
- Express Docs  
- React Docs  
- MySQL Docs  

---

**Ende der Dokumentation**