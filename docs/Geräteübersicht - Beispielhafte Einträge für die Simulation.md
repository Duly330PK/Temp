**Geräteübersicht – Beispielhafte Einträge für die Simulation**

Tabelle 1: Repräsentative Geräte mit IP-Adressierung und Portzuweisungen

| **Gerätetyp** | **Hersteller / Modell**          | **IPv4-Adresse** | **Subnetzmaske** | **Default Gateway** | **IPv6-Adresse/Präfix** | **Ports / Schnittstellen**                     | **Besonderheiten**                              |
| ------------- | -------------------------------- | ---------------- | ---------------- | ------------------- | ----------------------- | ---------------------------------------------- | ----------------------------------------------- |
| OLT           | Nokia 7750 SR-7s                 | 101.14.215.1     | 255.255.255.252  | 101.14.215.2        | 2001\:db8:10:1::/64     | GPON 1/1–1/8                                   | Zentrales FTTH-Gateway im PoP                   |
| Switch        | Cisco Catalyst 9300              | 101.14.215.5     | 255.255.255.0    | 101.14.215.254      | 2001\:db8:10:2::/64     | 48 Ports (1/0/1–1/0/48)                        | LAN-Segment, interne VLANs (PoP, Management)    |
| Router        | Cisco ASR 1006-X                 | 101.14.216.1     | 255.255.254.0    | 101.14.216.254      | 2001\:db8:20:1::/64     | Mgmt-Ports: 22, 80, 443; weitere Routing-Ports | Edge-Router mit dynamischem Routing und ACLs    |
| ONT           | Generic Optical Network Terminal | 101.14.217.10    | 255.255.255.252  | 101.14.217.9        | 2001\:db8:30:10::/64    | LAN-Ports 1–4                                  | Letzte Umwandlung im Hausanschluss (FTTH)       |
| Heimrouter    | Fritz!Box 7590                   | 101.14.214.142   | 255.255.255.252  | 101.14.214.141      | 2001\:db8:40:14::/64    | WAN-Port, LAN-Ports (80, 443 etc.)             | Öffentliche IPs für Privatkundenanschlüsse      |
| CGNAT Gateway | Cisco ASR 9000 (CGNAT-Modul)     | 101.14.220.1     | 255.255.255.240  | 101.14.220.14       | 2001\:db8:50:1::/64     | NAT-Modul-Ports, Session-Ports (virtuell)      | Zentrale Übersetzung öffentlicher IPv4-Adressen |

**Hinweise:**

* IPv4-Adressen wie 101.14.215.1 oder 101.14.214.142 orientieren sich an realistischen, öffentlichen Provider-Schemas.
* Punkt-zu-Punkt-Verbindungen nutzen /30-Subnetze (255.255.255.252). Breitere Masken (z. B. /24, /23) dienen größeren Segmenten.
* IPv6-Beispiele stammen aus dem Dokumentations-Präfix 2001\:db8::. In einer Live-Umgebung wäre ein global routbarer Bereich konfiguriert.
* Ports/Schnittstellen umfassen physische Ports und virtuelle Zuweisungen (Session-IDs, Services).

---

**Interaktive Darstellung im Dashboard**

1. **Dashboard-Ansicht**

   * Geräte und PoPs als Karten („Cards“).
   * Klick auf Karte öffnet ein Modal mit Detailinfos (IP-Adressen, Ports, Hersteller, Status).

2. **Live-Daten & Statistiken**

   * Dynamische Anzeige von Session-Zahlen, Log-Einträgen, CPU-/Memory-Nutzung.
   * Echtzeit-Monitoring und forensische Rückverfolgung.

3. **Navigation & Bedienbarkeit**

   * JavaScript-Frameworks (z. B. React, Angular) für interaktive Komponenten.
   * Datenabruf per REST- oder GraphQL-API.

---

**Zusammenfassung**

In diesem Simulationsmodell wird jeder Gerätetyp durch ein repräsentatives Gerät abgebildet. Die genaue IPv4/IPv6-Adressierung, Port-Zuweisungen und Parameter ermöglichen eine realitätsnahe Nachbildung des Netzbetriebs. Dadurch wird das Troubleshooting, Monitoring und die forensische Analyse im interaktiven Dashboard erheblich vereinfacht.

---

# Beispiel: Öffentliche Adressierung eines Privatkundenanschlusses

Jeder Privatkunde erhält in unserem System folgende Parameter:

* **IPv4-Adresse:**
  Direkt zugewiesen, z. B. aus einem öffentlichen Adresspool
* **Subnetzmaske:**
  In der Regel im Format 255.255.255.252 (für Punkt-zu-Punkt-Verbindungen) oder eine andere realistische Netzmaske, die zum Adresspool passt.
* **Default Gateway:**
  Die Gateway-Adresse innerhalb des IP-Pools, die an den Kundenanschluss angebunden ist.
* **IPv6-Adresse/Präfix:**
  Ein dediziertes /64-Präfix aus dem globalen IPv6-Raum (zum Beispiel basierend auf dem Dokumentationspräfix 2001\:db8::, in der Realität ein global routbarer Bereich).
* **Ports:**
  Fest zugeordnete physische bzw. logische LAN-Ports (und ggf. spezielle Service-Ports), die der eindeutigen Zuordnung von Datenströmen dienen.

## Beispielhafte Kundenanschluss-Daten

| **Kunden-ID** | **IPv4-Adresse** | **Subnetzmaske** | **Default Gateway** | **IPv6-Präfix/Adresse** | **Wichtige Ports**     |
| ------------- | ---------------- | ---------------- | ------------------- | ----------------------- | ---------------------- |
| 1             | 192.0.2.101      | 255.255.255.252  | 192.0.2.102         | 2001\:db8:1:101::/64    | LAN Port 1, WAN Port 1 |
| 2             | 192.0.2.105      | 255.255.255.252  | 192.0.2.106         | 2001\:db8:1:105::/64    | LAN Port 1, WAN Port 1 |

*Hinweis:*

* Die IPv4-Adressen werden aus einem öffentlichen Adresspool vergeben, der realitätsnah die eigene, vom Provider zugewiesene IP-Bereitstellung widerspiegelt.
* Das IPv6-Präfix wird so gewählt, dass nach außen hin eine eindeutige, globale Erreichbarkeit gewährleistet ist.
* Die Portzuweisungen (z. B. LAN oder spezielle Service-Ports) sind entscheidend, um beispielsweise bei forensischen Analysen die Verbindungen exakt nachvollziehen zu können.

---

## Interaktive Darstellung im Dashboard (Kundenanschluss)

In unserer interaktiven Oberflächenumgebung (z. B. einem Web-Dashboard) kann ein Klick auf einen PoP oder Kundenanschluss ein Detailfenster öffnen. Dort werden alle relevanten Daten angezeigt:

* Zuweisung der IPv4-Adresse und des zugehörigen Gateways
* Angezeigte IPv6-Präfixe und konkrete IPv6-Adressen der Endgeräte
* Darstellung der zugeordneten Ports der physischen bzw. logischen Schnittstellen
* Laufende Statistiken, Logmeldungen, oder Forensik-Informationen (z. B. Session-IDs oder Portzuordnungen)

Dies ermöglicht eine ultrarealistische Darstellung und Analyse der Netzwerkinfrastruktur – vom Endkundenanschluss bis zum zentralen PoP, sodass im Fall einer Fehlersuche alle Parameter exakt abgebildet sind.

---

# Realistische IP-Adressierung der aktiven Geräte

Im Rahmen der Simulation erhält jedes aktive Gerät (z. B. OLT, Switch, Router, ONT, Heimrouter) eine realistische Adressierung. Dies umfasst:

* **IPv4-Adressen** inklusive korrekter Subnetzmasken,
* **IPv6-Adressen** für End-to-End-Kommunikation,
* **Portdefinitionen** für Dienste und Schnittstellen (wichtig, da sie die eindeutige Zuordnung und Kommunikation gewährleisten).

## Beispielhafte Geräteadressierung

| **Gerät**                    | **IPv4-Adresse** | **Subnetzmaske** | **IPv6-Adresse** | **Ports/Portbereiche**                                    |
| ---------------------------- | ---------------- | ---------------- | ---------------- | --------------------------------------------------------- |
| OLT (Nokia SR-7)             | 192.168.10.1     | 255.255.255.0    | 2001\:db8:10::1  | GPON-Ports 1/1 bis 1/8                                    |
| Switch (Cisco Catalyst 9300) | 192.168.10.2     | 255.255.255.0    | 2001\:db8:10::2  | 48 Ports: 1/0/1 bis 1/0/48                                |
| Router (Cisco ASR 1006-X)    | 192.168.20.1     | 255.255.254.0    | 2001\:db8:20::1  | Management: 22, 80, 443; weitere für Routing (z. B. 8080) |
| ONT (Endgerät)               | 192.168.30.10    | 255.255.255.0    | 2001\:db8:30     |                                                           |
