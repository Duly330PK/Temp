 Markdown-Tabelle: Geräteübersicht (OLT, Splitter, Muffe, ONT)
markdown
Copy
Edit
| Gerätetyp | Modell                 | Hersteller | Ports                  | Status   | Stromversorgung | Besonderheiten                    |
|-----------|------------------------|------------|-------------------------|----------|------------------|-----------------------------------|
| OLT       | Nokia 7360 ISAM FX     | Nokia      | 8× GPON, 2× 10G uplink  | online   | -48V DC          | Unterstützt XGS-PON              |
| OLT       | Huawei MA5800-X2       | Huawei     | 16× GPON, 2× 10G uplink | gestört  | 220V AC          | IPv6-fähig, hohe Portdichte      |
| Splitter  | Huawei FDB 1:32        | Huawei     | 1 IN / 32 OUT           | online   | passiv           | Keine Stromversorgung nötig      |
| Splitter  | Corning 1:16 Indoor    | Corning    | 1 IN / 16 OUT           | online   | passiv           | Wandmontage                      |
| Muffe     | ZTE GPJ09-9401         | ZTE        | bis 48 Fasern           | gestört  | passiv           | Erdverlegung, wasserdicht        |
| Muffe     | HellermannTyton FDN 512| HT         | bis 512 Fasern          | online   | passiv           | Großverteiler                    |
| ONT       | Nokia G-140W-C         | Nokia      | 1x GPON, 4x LAN, WLAN   | online   | 12V DC           | Endkundengerät mit WiFi          |
| ONT       | AVM Fritz!Box 5530     | AVM        | 1x GPON, 3x LAN, WLAN   | offline  | 230V AC          | Router mit integriertem ONT      |
🧾 JSON: Geräte für data.js
json
Copy
Edit
[
  {
    "device_id": "OLT-001",
    "type": "OLT",
    "model": "Nokia 7360 ISAM FX",
    "manufacturer": "Nokia",
    "ports": {
      "gpon": 8,
      "uplink_10g": 2
    },
    "status": "online",
    "power": "-48V DC"
  },
  {
    "device_id": "OLT-002",
    "type": "OLT",
    "model": "Huawei MA5800-X2",
    "manufacturer": "Huawei",
    "ports": {
      "gpon": 16,
      "uplink_10g": 2
    },
    "status": "gestört",
    "power": "220V AC"
  },
  {
    "device_id": "SPL-01",
    "type": "Splitter",
    "model": "Huawei FDB 1:32",
    "manufacturer": "Huawei",
    "ports": {
      "input": 1,
      "output": 32
    },
    "status": "online",
    "power": "passiv"
  },
  {
    "device_id": "MUFF-01",
    "type": "Muffe",
    "model": "ZTE GPJ09-9401",
    "manufacturer": "ZTE",
    "ports": {
      "fiber_capacity": 48
    },
    "status": "gestört",
    "power": "passiv"
  },
  {
    "device_id": "ONT-001",
    "type": "ONT",
    "model": "Nokia G-140W-C",
    "manufacturer": "Nokia",
    "ports": {
      "gpon": 1,
      "lan": 4,
      "wifi": true
    },
    "status": "online",
    "power": "12V DC"
  }
]