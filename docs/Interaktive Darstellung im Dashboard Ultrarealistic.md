Interaktive Darstellung im Dashboard (Kundenanschluss)
In unserer interaktiven Oberflächenumgebung (z. B. einem Web-Dashboard) kann ein Klick auf einen PoP oder Kundenanschluss ein Detailfenster öffnen. Dort werden alle relevanten Daten angezeigt:
Zuweisung der IPv4-Adresse und des zugehörigen Gateways


Angezeigte IPv6-Präfixe und konkrete IPv6-Adressen der Endgeräte


Darstellung der zugeordneten Ports der physischen bzw. logischen Schnittstellen


Laufende Statistiken, Logmeldungen, oder Forensik-Informationen (z. B. Session-IDs oder Portzuordnungen)


Dies ermöglicht eine ultrarealistische Darstellung und Analyse der Netzwerkinfrastruktur – vom Endkundenanschluss bis zum zentralen PoP, sodass im Fall einer Fehlersuche alle Parameter exakt abgebildet sind.

Realistische IP-Adressierung der aktiven Geräte
Im Rahmen der Simulation erhält jedes aktive Gerät (z. B. OLT, Switch, Router, ONT, Heimrouter) eine realistische Adressierung. Dies umfasst:
IPv4-Adressen inklusive korrekter Subnetzmasken,


IPv6-Adressen für End-to-End-Kommunikation,


Portdefinitionen für Dienste und Schnittstellen (wichtig, da sie die eindeutige Zuordnung und Kommunikation gewährleisten).


Beispielhafte Geräteadressierung
Gerät
IPv4-Adresse
Subnetzmaske
IPv6-Adresse
Ports/Portbereiche
OLT (Nokia SR-7)
192.168.10.1
255.255.255.0
2001:db8:10::1
GPON-Ports 1/1 bis 1/8
Switch (Cisco Catalyst 9300)
192.168.10.2
255.255.255.0
2001:db8:10::2
48 Ports: 1/0/1 bis 1/0/48
Router (Cisco ASR 1006-X)
192.168.20.1
255.255.254.0
2001:db8:20::1
Management: 22, 80, 443; weitere für Routing (z. B. 8080)
ONT (Endgerät)
192.168.30.10
255.255.255.0
2001:db8:30



