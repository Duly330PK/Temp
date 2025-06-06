 1. Projektübersicht
markdown
Copy
Edit
# 🌐 Virtuelles Netzwerkprojekt: [Name]

## 📅 Datum:
`2025-05-29`

## 👤 Autor:
Max Mustermann

## 🧭 Ziel:
- Simulation eines IPv4/IPv6-Netzwerks mit CGNAT, Firewall, DNS und Routing
- Forensische Analyse testen

## ⚙️ Plattform:
- [ ] GNS3
- [ ] EVE-NG
- [ ] Cisco Packet Tracer
- [ ] VirtualBox / VMware
🖥️ 2. Topologieübersicht
markdown
Copy
Edit
## 🗺️ Netzwerk-Topologie

```mermaid
graph TD
    A[PC1] --> R1
    B[PC2] --> R1
    R1 -->|NAT| CGN[CGNAT Gateway]
    CGN --> ISP[(Internet)]
    ISP --> S1[Zielserver]
Hinweis: Du kannst mermaid.js in GitHub, Obsidian oder MkDocs anzeigen lassen.

🛠️ 3. Geräteübersicht
markdown
Copy
Edit
## 📦 Geräte & IP-Adressen

| Gerät       | Typ            | OS / Image       | Interface | IP-Adresse       | Funktion             |
|-------------|----------------|------------------|-----------|------------------|----------------------|
| PC1         | Virtuelle VM   | Ubuntu 22.04     | eth0      | 192.168.1.10     | Client               |
| R1          | Router (Cisco) | IOSv 15.7        | Gi0/0     | 192.168.1.1      | Default Gateway      |
| CGN         | NAT-Gateway    | A10 Thunder VM   | Gi0/1     | 100.64.0.1       | CGNAT                |
| ISP         | Cloud-Node     | Dummy            | Gi0/2     | 85.144.110.61    | WAN                  |
| Zielserver  | Webserver      | Debian           | eth0      | 142.250.185.206  | Testserver (google)  |
🧾 4. Konfigurationsnotizen (z. B. Cisco)
markdown
Copy
Edit
## 📄 Router-Konfiguration (R1)

```bash
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown

ip route 0.0.0.0 0.0.0.0 100.64.0.1
yaml
Copy
Edit

---

## 🔐 **5. CGNAT Session Beispiel**

```markdown
## 🔍 CGNAT Logbeispiel

```log
Timestamp:      2025-05-29 13:42:58
Internal IP:    100.64.12.5
Port:           54231
External IP:    85.144.110.61
Mapped Port:    44321
Tunnel ID:      2
Customer ID:    DE-Berlin-Cluster3
yaml
Copy
Edit

---

## 🎯 **6. Testfälle & Simulationen**

```markdown
## ✅ Testfälle

| ID | Beschreibung                                | Erwartung           | Ergebnis |
|----|---------------------------------------------|----------------------|----------|
| T1 | PC1 pingt Zielserver (google.com)           | ICMP reply erhalten  | ✅       |
| T2 | PC2 versucht Zugriff ohne NAT               | Verbindung schlägt fehl | ✅    |
| T3 | CGNAT Mapping überprüft Portlog korrekt     | Log enthält Eintrag  | ✅       |
📈 7. Performance- und Monitoring-Daten
markdown
Copy
Edit
## 📊 Monitoring (CGNAT-Gateway)

- Aktive Sessions: 12.430
- Durchschnittliche Session-Dauer: 3,2 Min.
- Peak Throughput: 1.2 Gbps
- CPU Load: 73%
- Log Storage: 6 von 10 GB verwendet
📎 8. Nützliche Links / Tools
markdown
Copy
Edit
## 🔗 Tools & Dokus

- [Cisco NAT Config Guide](https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/)
- [Mermaid JS Diagram Generator](https://mermaid.live)
- [PyShark (Forensik mit Wireshark in Python)](https://github.com/KimiNewt/pyshark)
- [IP-Range Rechner](https://www.ipaddressguide.com/cidr)
🧠 9. Erkenntnisse & Probleme
markdown
Copy
Edit
## 🧩 Erkenntnisse

- CGNAT erschwert forensische Rückverfolgung → Portnummer erforderlich
- VPNs können NAT-Table überschreiben → Logging-Anpassung nötig

## 🛑 Probleme

- NAT-Tabelle war bei 20k Sessions voll → Timeout verkürzt
- Wireshark zeigte nur äußere IPs → Spiegelport nötig für Deep Inspection