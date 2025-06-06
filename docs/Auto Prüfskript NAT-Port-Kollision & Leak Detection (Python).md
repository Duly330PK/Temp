Automatisiertes Prüfskript: NAT-Port-Kollision & Leak Detection (Python)
markdown
Copy
Edit
# Python-Skript zur Erkennung von CGNAT-Portkollisionen

## Beschreibung:
Dieses Skript prüft die Portvergabe auf mögliche Kollisionen oder überlappende NAT-Zuweisungen bei gleichzeitiger Session-Last.

```python
import random
from collections import defaultdict

# Simuliere 10.000 Sessions
SESSIONS = 10000
port_alloc = defaultdict(list)  # key = public IP, value = list of ports

PUBLIC_IP_POOL = ["85.144.110.61", "85.144.110.62"]
PORT_RANGE = (49152, 65535)  # Ephemeral port range

def simulate_sessions():
    collisions = 0
    for _ in range(SESSIONS):
        ip = random.choice(PUBLIC_IP_POOL)
        port = random.randint(*PORT_RANGE)
        if port in port_alloc[ip]:
            collisions += 1
        else:
            port_alloc[ip].append(port)
    print(f"Simulierte Sessions: {SESSIONS}")
    print(f"Port-Kollisionen: {collisions}")
    print(f"Kollisionsrate: {collisions / SESSIONS * 100:.2f}%")

if __name__ == "__main__":
    simulate_sessions()