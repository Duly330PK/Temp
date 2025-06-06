# CGNAT Mapping-Datenbankdesign

## Ziel:
Eindeutige Zuordnung interner Sessions zu öffentlichen IP/Port-Paaren zwecks forensischer Rückverfolgbarkeit.

## Tabellenschema: `cgnat_session_map`

| Feldname           | Typ              | Beschreibung                                  |
|--------------------|------------------|-----------------------------------------------|
| `session_id`       | BIGINT PRIMARY   | Eindeutige ID pro Session                     |
| `timestamp`        | TIMESTAMP        | Startzeitpunkt der Session                    |
| `duration`         | INTEGER          | Dauer in Sekunden                             |
| `customer_id`      | INTEGER          | Interne Kundenkennung                         |
| `internal_ip`      | VARCHAR(15)      | z. B. 100.64.12.34                             |
| `internal_port`    | INTEGER          | z. B. 50123                                    |
| `external_ip`      | VARCHAR(15)      | Öffentliche CGNAT-IP z. B. 85.144.110.61       |
| `external_port`    | INTEGER          | Vom NAT zugewiesener Port z. B. 55341         |
| `protocol`         | VARCHAR(4)       | z. B. TCP oder UDP                            |
| `segment`          | VARCHAR(10)      | Optionales Feld zur geografischen Zuweisung   |

## Beispiel:

| session_id | timestamp           | duration | customer_id | internal_ip  | internal_port | external_ip     | external_port | protocol | segment |
|------------|---------------------|----------|-------------|---------------|----------------|------------------|----------------|----------|---------|
| 9912081    | 2025-06-06 15:42:12 | 360      | 1007        | 100.72.13.4   | 50123          | 85.144.110.61    | 55341         | TCP      | 2       |

## Empfehlungen:
- Index auf (`external_ip`, `external_port`, `timestamp`) für forensische Suche.
- TTL für Datenhaltung (z. B. 7 Tage), optional als Rolling Window via Partitionierung.
