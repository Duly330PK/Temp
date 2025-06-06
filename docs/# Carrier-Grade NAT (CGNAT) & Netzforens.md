# Carrier-Grade NAT (CGNAT) & Netzforensik  
*Technik, Herausforderungen und forensische Implikationen in IP-Netzen*

## 1. Einleitung
IPv4-Mangel → CGNAT als Übergang. IPv6 als Zukunft. Transparenz & Forensik erschwert.

## 2. Grundlagen CGNAT

- Privatgerät → Heimrouter (100.64.x.x) → CGNAT-Gateway (öffentliche IP)
- NAT auf zwei Ebenen (Heim + Provider)
- Portnummern & Session-IDs sind entscheidend

## 3. Logging

Beispiel-Log:
2025-05-28 14:12:39 CGNAT IP: 85.144.110.61 Port: 55672 Interne IP: 100.72.13.4 Kunden-ID: 2


Besonderheiten:
- Zeitgenauigkeit (sekundengenau)
- Session- & Port-Log notwendig
- Gesetzliche Aufbewahrungspflichten (z. B. TTDSG: 7 Tage)

## 4. Forensische Herausforderungen

- Identitätsverschleierung bei IP-Sharing
- Ohne Logs keine Rückverfolgung
- Interne Mapping-Systeme und Segmentierung (z. B. „2/85.144.110.61“)

## 5. Beispiel: „2/85.144.110.61“

- „2/“ = Tunnel-ID / Kundensegment
- Öffentliche IP: 85.144.110.61 (geteilt)
→ Schnelle forensische Suche

## 6. CGNAT-Hardware

| Hersteller      | Modell                    | Eigenschaften                                           |
|----------------|---------------------------|--------------------------------------------------------|
| Nokia          | 7750 SR-7s                | FP4-Chipsatz, bis 10 Mio. Sessions                    |
| Cisco          | ASR 1006-X / ASR 9000     | CGN-Modul, DPI, Redundanz                             |
| Huawei         | NE40E                     | NAT444, NetStream, CGN                                |
| Juniper        | MX10003                   | Session Smart, hochskalierbar                         |
| A10 Networks   | Thunder CGN               | GUI, Logging-API, DPI                                 |
| F5 Networks    | BIG-IP CGNAT              | Logging + Load Balancing                              |

## 7. IPv6 als Lösung

- Globale Adressen, keine NAT-Schicht
- End-to-End-Verbindungen & einfache Rückverfolgbarkeit
- Aber: Legacy-Dienste noch nicht vollständig IPv6-fähig

## 8. Tools & Ideen

| Toolname                  | Beschreibung                                                                                       |
|---------------------------|----------------------------------------------------------------------------------------------------|
| CGNAT Mapping Visualizer  | Visualisierung von IP→Kunde→Port Beziehungen                                                      |
| Reverse NAT Decoder       | Ausdruck: „2/85.144.110.61:55672“ → Kunde, Zeit, Ort                                              |
| IPv6 Readiness Analyzer   | Testet IPv6-Kompatibilität und Fallbacks                                                          |
| Forensik-Dashboard        | Echtzeit-Sessionanalyse, Export als JSON/CSV                                                      |

## 9. Fazit

CGNAT: Übergangslösung mit forensischen Problemen → Logging & Mapping sind Pflicht.  
IPv6 ist die Zukunft, aber CGNAT bleibt mittelfristig Realität.