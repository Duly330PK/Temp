Markdown-Tabelle Kundenanschlüsse
markdown
Copy
Edit
| Kunden-ID   | Gerät (ONT)  | IP-Adresse       | Session-Status | Bandbreite (Mbps) | Letzter Login        |
|-------------|--------------|------------------|----------------|-------------------|---------------------|
| KDN-001     | ONT-001      | 192.168.10.15    | aktiv          | 100               | 2025-06-06 09:30:22 |
| KDN-002     | ONT-002      | 192.168.10.18    | inaktiv        | 0                 | 2025-06-05 17:12:45 |
| KDN-003     | ONT-003      | 192.168.10.20    | aktiv          | 250               | 2025-06-06 08:45:10 |
| KDN-004     | ONT-004      | 192.168.10.22    | aktiv          | 50                | 2025-06-06 07:59:30 |
| KDN-005     | ONT-005      | 192.168.10.25    | gestört        | 0                 | 2025-06-06 06:30:00 |
🧾 JSON Kundenanschlüsse
json
Copy
Edit
[
  {
    "customer_id": "KDN-001",
    "device_id": "ONT-001",
    "ip_address": "192.168.10.15",
    "session_status": "aktiv",
    "bandwidth_mbps": 100,
    "last_login": "2025-06-06T09:30:22"
  },
  {
    "customer_id": "KDN-002",
    "device_id": "ONT-002",
    "ip_address": "192.168.10.18",
    "session_status": "inaktiv",
    "bandwidth_mbps": 0,
    "last_login": "2025-06-05T17:12:45"
  },
  {
    "customer_id": "KDN-003",
    "device_id": "ONT-003",
    "ip_address": "192.168.10.20",
    "session_status": "aktiv",
    "bandwidth_mbps": 250,
    "last_login": "2025-06-06T08:45:10"
  },
  {
    "customer_id": "KDN-004",
    "device_id": "ONT-004",
    "ip_address": "192.168.10.22",
    "session_status": "aktiv",
    "bandwidth_mbps": 50,
    "last_login": "2025-06-06T07:59:30"
  },
  {
    "customer_id": "KDN-005",
    "device_id": "ONT-005",
    "ip_address": "192.168.10.25",
    "session_status": "gestört",
    "bandwidth_mbps": 0,
    "last_login": "2025-06-06T06:30:00"
  }
]