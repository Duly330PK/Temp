devices.json
Jeder Eintrag wird etwa so aussehen (kommentiert):
json
KopierenBearbeiten
{
  "device_id": "OLT-000012",
  "uuid": "cbba4c92-f8a5-4267-9b6a-7fd52361d58f",  // optional zusätzlich: UUIDv4
  "type": "OLT",
  "manufacturer": "Huawei",
  "model": "MA5800-X7",
  "location": {
    "site": "PoP-04",
    "gps": [51.2659, 6.4234],
    "rack_position": "RU-16"
  },
  "status": "online",
  "outdated": false,
  "firmware_version": "v3.0.5a",
  "last_update": "2025-05-27T18:40:00Z",
  "optical_metrics": {
    "total_loss_db": 11.6,
    "max_allowed_loss_db": 28.0,
    "ref_loss_db": 38.1,
    "min_ref_loss_db": 35.0,
    "status": "ok"
  },
  "interface": {
    "ports": 16,
    "used_ports": 14,
    "standards": ["GPON", "10G-PON", "ITU-T G.9807.1"]
  },
  "tags": ["core", "active", "fiber"],
  "maintenance": {
    "field_access_required": false,
    "next_maintenance": "2025-09-01"
  }
}


🔍 Im Suchmenü dann z. B. möglich:
Suchfeld
Beispiel
Ergebnis
device_id
ONT-000043
springt zur Karte & Panel
type
OLT
filtert alle OLT-Geräte
model
HG8010H
zeigt nur Huawei ONTs
status
outdated
listet Firmware-Altgeräte
location.site
PoP-03
alle Geräte in dem PoP


🧠 Bonus: Indexierbarkeit
Die IDs sind so aufgebaut:
TYPE-######


TYPE = ONT / OLT / MUF / SPL / DSLAM / etc.


6-stellige Zahl → bis zu 999.999 pro Typ


Du kannst dir also jederzeit ein Gerät mit MUFF-000123 ausdenken – und es ist klar, was es ist.
