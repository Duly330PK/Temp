Geräteübersicht – Beispielhafte Einträge für die Simulation
Tabelle 1: Repräsentative Geräte mit IP-Adressierung und Portzuweisungen
Gerätetyp
Hersteller / Modell
IPv4-Adresse
Subnetzmaske
Default Gateway
IPv6-Adresse/Präfix
Ports / Schnittstellen
Besonderheiten
OLT
Nokia 7750 SR‑7s
101.14.215.1
255.255.255.252
101.14.215.2
2001:db8:10:1::/64
GPON 1/1–1/8
Zentrales FTTH‑Gateway im PoP
Switch
Cisco Catalyst 9300
101.14.215.5
255.255.255.0
101.14.215.254
2001:db8:10:2::/64
48 Ports (1/0/1–1/0/48)
LAN‑Segment, interne VLANs (PoP, Management)
Router
Cisco ASR 1006‑X
101.14.216.1
255.255.254.0
101.14.216.254
2001:db8:20:1::/64
Mgmt‑Ports: 22, 80, 443; weitere Routing‑Ports
Edge‑Router mit dynamischem Routing und ACLs
ONT
Generic Optical Network Terminal
101.14.217.10
255.255.255.252
101.14.217.9
2001:db8:30:10::/64
LAN-Ports 1–4
Letzte Umwandlung im Hausanschluss (FTTH)
Heimrouter
Fritz!Box 7590
101.14.214.142
255.255.255.252
101.14.214.141
2001:db8:40:14::/64
WAN‑Port, LAN‑Ports (80, 443 etc.)
Öffentliche IPs für Privatkundenanschlüsse
CGNAT Gateway
Cisco ASR 9000 (CGNAT‑Modul)
101.14.220.1
255.255.255.240
101.14.220.14
2001:db8:50:1::/64
NAT‑Modul‑Ports, Session‑Ports (virtuell)
Zentrale Übersetzung öffentlicher IPv4‑Adressen

Hinweise:
IPv4-Adressen wie 101.14.215.1 oder 101.14.214.142 orientieren sich an realistischen, öffentlichen Provider‑Schemas.


Punkt‑zu‑Punkt‑Verbindungen nutzen /30‑Subnetze (255.255.255.252). Breitere Masken (z. B. /24, /23) dienen größeren Segmenten.


IPv6‑Beispiele stammen aus dem Dokumentations‑Präfix 2001:db8::. In einer Live‑Umgebung wäre ein global routbarer Bereich konfiguriert.


Ports/Schnittstellen umfassen physische Ports und virtuelle Zuweisungen (Session‑IDs, Services).



Interaktive Darstellung im Dashboard
Dashboard-Ansicht


Geräte und PoPs als Karten („Cards“).


Klick auf Karte öffnet ein Modal mit Detailinfos (IP‑Adressen, Ports, Hersteller, Status).


Live-Daten & Statistiken


Dynamische Anzeige von Session‑Zahlen, Log‑Einträgen, CPU‑/Memory‑Nutzung.


Echtzeit‑Monitoring und forensische Rückverfolgung.


Navigation & Bedienbarkeit


JavaScript‑Frameworks (z. B. React, Angular) für interaktive Komponenten.


Datenabruf per REST- oder GraphQL‑API.



Zusammenfassung
In diesem Simulationsmodell wird jeder Gerätetyp durch ein repräsentatives Gerät abgebildet. Die genaue IPv4/IPv6‑Adressierung, Port‑Zuweisungen und Parameter ermöglichen eine realitätsnahe Nachbildung des Netzbetriebs. Dadurch wird das Troubleshooting, Monitoring und die forensische Analyse im interaktiven Dashboard erheblich vereinfacht.
Nächste Schritte:
Möchtest du weitere Gerätetypen (z. B. Firewalls, Load Balancer) ergänzen?


Soll ich dynamische Port‑Mappings oder VLAN‑Zuordnungen für interne Standorte hinzufügen?


