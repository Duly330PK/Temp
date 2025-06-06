# Realistische IP-Adressierung der aktiven Geräte

Jedes aktive Gerät (z. B. OLT, Switch, Router, ONT, Heimrouter) erhält eine realistische Adressierung:

- **IPv4-Adressen** mit Subnetzmasken
- **IPv6-Adressen**
- **Portdefinitionen**

## Beispielhafte Geräteadressierung

| Gerät                  | IPv4-Adresse    | Subnetzmaske       | IPv6-Adresse              | Ports/Portbereiche                                      |
|------------------------|-----------------|--------------------|---------------------------|---------------------------------------------------------|
| **OLT (Nokia SR-7)**   | 192.168.10.1    | 255.255.255.0      | 2001:db8:10::1            | GPON-Ports 1/1 bis 1/8                                 |
| **Switch (Cisco)**     | 192.168.10.2    | 255.255.255.0      | 2001:db8:10::2            | 48 Ports: 1/0/1 bis 1/0/48                              |
| **Router (Cisco)**     | 192.168.20.1    | 255.255.254.0      | 2001:db8:20::1            | Mgmt: 22, 80, 443; Routing: 8080                        |
| **ONT (Endgerät)**     | 192.168.30.10   | 255.255.255.0      | 2001:db8:30::a            | LAN-Port 1                                              |
| **Heimrouter (Fritz!Box)** | 100.64.10.1 | 255.255.255.0      | 2001:db8:100:64::1         | WAN (dynamisch), LAN: 80, 443                          |

## Motivation & Nutzen

- Realistische Simulation für Debugging, Management, Forensik
- Eindeutige Adressierung und Portzuweisung
