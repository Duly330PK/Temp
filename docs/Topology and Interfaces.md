1. Topology & Interfaces
bash
Copy
Edit
# In den Configuration-Modus wechseln
configure router interface "1/1/1" create           # phys. Port anlegen
configure router interface "1/1/1" description "Uplink to POP"
configure port 1/1/1 ethernet mode sfp+ 10g         # als 10 Gigabit-Faser
configure port 1/1/1 ethernet speed 10g duplex full

# Loopback als virtuelles Gerät / ONT-Placeholder
configure router interface "lo0" create
configure router interface "lo0" address 10.0.0.1/32
2. MPLS-LSPs & Service-Pfad
bash
Copy
Edit
# LSP-Tunnels anlegen (Backbone → POP → ONT)
configure service id 100 customer 100 create         # Service-Context
configure service id 100 customer 100 ingroup "ingress" create
configure service id 100 customer 100 ingroup "ingress" attach-interface lo0

# PW/MPLS-Tunnel zwischen zwei Routern
configure msi-mpls lsp "LSP-Backbone" create
configure msi-mpls lsp "LSP-Backbone" primary 10.0.0.1 to 10.0.0.2
configure msi-mpls lsp "LSP-Backbone" backup 10.0.0.1 to 10.0.0.2
3. Ausfall-Simulation
Um z. B. einen Port-Ausfall zu simulieren:

bash
Copy
Edit
# Port administrativ down setzen
configure port 1/1/1 admin-state disable

# Oder direkt im Router-Interface
configure router interface "1/1/1" shutdown

# Nach einer Weile wieder hoch
configure port 1/1/1 admin-state enable
Für einen Modul-Ausfall kannst du im LAB-Emulator eine Karte “Absent” setzen oder per CLI:

bash
Copy
Edit
# Simuliere Slot 3 missing
configure card 3 admin-state disable
4. Monitoring & Debugging
bash
Copy
Edit
# Status aller Interfaces
show router interface

# MPLS-LSP-Status
show msi-mpls lsp

# Service-Detail (z. B. Path, OAM)
show service id 100 customer 100 detail

# Event-Log ansehen (z. B. Shutdown, Flapping)
show log event level informational
🚀 Automatisierung & Skripting
Mit pySROS oder NETCONF/RESTCONF kannst du all das in Python-Skripten oder YAML-Playbooks nach­stellen und automatisiert durchspielen (z. B. Loopback up/down, LSP neu­aufbau, Failover testen).