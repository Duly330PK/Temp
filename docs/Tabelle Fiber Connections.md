Markdown-Tabelle: Verbindungen / Segmente (Fiber Segments)
markdown
Copy
Edit
| Segment-ID     | Startgerät  | Endgerät    | Faserart      | Länge (m) | Status   | Dämpfung (dB) | Besonderheiten               |
|----------------|-------------|-------------|---------------|-----------|----------|---------------|-----------------------------|
| SEG-001        | OLT-001     | SPL-01      | Singlemode    | 1500      | online   | 2.5           | Primärfaser                 |
| SEG-002        | SPL-01      | MUFF-01     | Singlemode    | 800       | online   | 1.3           | Verlegt in Erdtrasse        |
| SEG-003        | MUFF-01     | ONT-001     | Singlemode    | 300       | gestört  | 4.7           | Segment mit höherem Verlust |
| SEG-004        | OLT-002     | SPL-02      | Singlemode    | 1200      | offline  | -             | Wartung                     |
| SEG-005        | SPL-02      | MUFF-02     | Multimode     | 500       | online   | 1.1           | Multimode-Verbindung        |
🧾 JSON: Verbindungen / Segmente für data.js
json
Copy
Edit
[
  {
    "segment_id": "SEG-001",
    "start_device": "OLT-001",
    "end_device": "SPL-01",
    "fiber_type": "Singlemode",
    "length_m": 1500,
    "status": "online",
    "attenuation_db": 2.5,
    "notes": "Primärfaser"
  },
  {
    "segment_id": "SEG-002",
    "start_device": "SPL-01",
    "end_device": "MUFF-01",
    "fiber_type": "Singlemode",
    "length_m": 800,
    "status": "online",
    "attenuation_db": 1.3,
    "notes": "Verlegt in Erdtrasse"
  },
  {
    "segment_id": "SEG-003",
    "start_device": "MUFF-01",
    "end_device": "ONT-001",
    "fiber_type": "Singlemode",
    "length_m": 300,
    "status": "gestört",
    "attenuation_db": 4.7,
    "notes": "Segment mit höherem Verlust"
  },
  {
    "segment_id": "SEG-004",
    "start_device": "OLT-002",
    "end_device": "SPL-02",
    "fiber_type": "Singlemode",
    "length_m": 1200,
    "status": "offline",
    "attenuation_db": null,
    "notes": "Wartung"
  },
  {
    "segment_id": "SEG-005",
    "start_device": "SPL-02",
    "end_device": "MUFF-02",
    "fiber_type": "Multimode",
    "length_m": 500,
    "status": "online",
    "attenuation_db": 1.1,
    "notes": "Multimode-Verbindung"
  }
]