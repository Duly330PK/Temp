CGNAT Session Traffic Flow (Diagramm beschrieben)
markdown
Copy
Edit
# CGNAT-Session-Traffic-Flow (Textdiagramm)

+--------------------+
| Endgerät (z.B. PC)|
| IP: 192.168.1.34 |
+--------+-----------+
|
| Private LAN
v
+--------+------------+
| Heimrouter (NAT 1) |
| WAN: 100.72.13.4 |
+--------+------------+
|
| RFC6598 CGNAT-Bereich
v
+--------+------------+
| Provider NAT-Gateway|
| Öffentlich: 85.144.110.61 |
| Port-Mapping: z. B. TCP 50123 → 55341 |
+--------+------------+
|
| Internet (öffentlich)
v
+--------+------------+
| Zielserver (z. B. Web) |
| IP: 142.250.185.206 |
+------------------------+

Rückweg: Response an 85.144.110.61:55341 → CGNAT → 100.72.13.4:50123 → Heimrouter → PC

markdown
Copy
Edit

**Wichtig:**  
- Die eindeutige Session wird durch (öffentliche IP + Port + Zeit) identifiziert.
- Logging am CGNAT-Gateway ist der entscheidende Punkt.
