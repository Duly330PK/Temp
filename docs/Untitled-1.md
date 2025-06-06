# Beispiel: Öffentliche Adressierung eines Privatkundenanschlusses

Jeder Privatkunde erhält in unserem System folgende Parameter:

- **IPv4-Adresse:**  
  Direkt zugewiesen, z. B. aus einem öffentlichen Adresspool
- **Subnetzmaske:**  
  In der Regel im Format 255.255.255.252 (für Punkt-zu-Punkt-Verbindungen) oder eine andere realistische Netzmaske, die zum Adresspool passt.
- **Default Gateway:**  
  Die Gateway-Adresse innerhalb des IP-Pools, die an den Kundenanschluss angebunden ist.
- **IPv6-Adresse/Präfix:**  
  Ein dediziertes /64-Präfix aus dem globalen IPv6-Raum (z. B. basierend auf dem Dokumentationspräfix 2001:db8::).
- **Ports:**  
  Fest zugewiesene physische bzw. logische LAN-Ports.

## Beispielhafte Kundenanschluss-Daten

| Kunden-ID | IPv4-Adresse   | Subnetzmaske       | Default Gateway    | IPv6-Präfix/Adresse         | Wichtige Ports          |
|-----------|----------------|--------------------|--------------------|-----------------------------|-------------------------|
| 1         | 192.0.2.101    | 255.255.255.252    | 192.0.2.102        | 2001:db8:1:101::/64         | LAN Port 1, WAN Port 1  |
| 2         | 192.0.2.105    | 255.255.255.252    | 192.0.2.106        | 2001:db8:1:105::/64         | LAN Port 1, WAN Port 1  |

## Interaktive Darstellung im Dashboard

- IPv4-Adresse + Gateway
- IPv6-Präfix + Endgeräte-IP
- Ports/Schnittstellen (LAN/WAN)
- Laufende Statistiken, Logmeldungen, Session-IDs
