Markdown-Tabelle Events
markdown
Copy
Edit
| Event-ID    | Gerät-ID  | Event-Typ       | Beschreibung                  | Timestamp           | Status        |
|-------------|-----------|-----------------|------------------------------|---------------------|---------------|
| EVT-001     | OLT-001   | Firmware-Update | Update auf Version 3.2.1      | 2025-06-01 02:00:00 | erfolgreich   |
| EVT-002     | MUFF-01   | Ausfall         | Glasfaserbruch entdeckt       | 2025-06-05 15:45:30 | aktiv         |
| EVT-003     | ONT-005   | Session-Reset   | Verbindung neu aufgebaut      | 2025-06-06 07:00:00 | abgeschlossen |
| EVT-004     | SPL-02    | Wartung         | Segment offline für Wartung   | 2025-06-03 10:00:00 | abgeschlossen |
| EVT-005     | OLT-002   | Firmware-Update | Update auf Version 3.3.0      | 2025-06-04 23:30:00 | fehlgeschlagen|
🧾 JSON Events
json
Copy
Edit
[
  {
    "event_id": "EVT-001",
    "device_id": "OLT-001",
    "event_type": "Firmware-Update",
    "description": "Update auf Version 3.2.1",
    "timestamp": "2025-06-01T02:00:00",
    "status": "erfolgreich"
  },
  {
    "event_id": "EVT-002",
    "device_id": "MUFF-01",
    "event_type": "Ausfall",
    "description": "Glasfaserbruch entdeckt",
    "timestamp": "2025-06-05T15:45:30",
    "status": "aktiv"
  },
  {
    "event_id": "EVT-003",
    "device_id": "ONT-005",
    "event_type": "Session-Reset",
    "description": "Verbindung neu aufgebaut",
    "timestamp": "2025-06-06T07:00:00",
    "status": "abgeschlossen"
  },
  {
    "event_id": "EVT-004",
    "device_id": "SPL-02",
    "event_type": "Wartung",
    "description": "Segment offline für Wartung",
    "timestamp": "2025-06-03T10:00:00",
    "status": "abgeschlossen"
  },
  {
    "event_id": "EVT-005",
    "device_id": "OLT-002",
    "event_type": "Firmware-Update",
    "description": "Update auf Version 3.3.0",
    "timestamp": "2025-06-04T23:30:00",
    "status": "fehlgeschlagen"
  }
]