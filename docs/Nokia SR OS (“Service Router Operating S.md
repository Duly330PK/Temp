Nokia SR OS (“Service Router Operating System”) ist das proprietäre NOS, das auf Nokia 7750 SR, 7950 XRS und weiteren Carrier-Grade Routern läuft. Hier die wichtigsten Eckpunkte:

1. Architektur & Aufbau
Proprietäres Kernel-Basissystem
Anders als SR Linux, das auf einem Mainline Linux-Kernel aufsetzt, basiert SR OS auf einem schlanken, eigenentwickelten Kernel, optimiert für extrem hohe Verfügbarkeit und deterministische Performance in Service-Provider-Umgebungen 
Roger Perkin
.

Modularer Funktions-Stack
Protokoll-Engines (z. B. IS-IS, BGP, MPLS) und Services (QoS, VPN, PBB-EVPN) sind als modulare Prozesse implementiert und kommunizieren über interne APIs, was Updates und Erweiterungen im Feld erlaubt 
al-enterprise.com
.

2. Hauptfunktionen & Features
IP/MPLS & Segment Routing
Vollständige MPLS-Funktionalität inkl. Traffic-Engineering, Segment Routing (SR-MPLS, SRv6)

Service-Virtualisierung
VRF, VPRN, L3-VPN, BNG-CUPS (Control-User Plane Separation)

Carrier-Grade QoS & Traffic Management
DiffServ, hierarchical queuing, policing, shaping

Security
MACsec, uRPF, ACL-Filter, IPsec Offload

Pay-as-You-Grow Lizenzierung
Dynamisches Freischalten von Durchsatz- und Port-Kapazitäten im Feld durch In-Service-RTU-Keys

3. Administration & CLI
Classic CLI & MD-CLI
Gewohnte, hierarchische CLI („classic CLI“) plus modernes, modellgetriebenes CLI (MD-CLI) basierend auf YANG-Modellen, komplett skriptbar via NETCONF/RESTCONF 
documentation.nokia.com
.

Network Interface Shell (NISH)
Separates Shell-Subsystem für tiefergehende System- und Hardware-Konfigurationen sowie Troubleshooting 
documentation.nokia.com
.

API-Zugriff
pySROS-Bibliothek für Python-Skripte, gNMI/gRPC und REST-Schnittstellen für Automatisierung und Telemetrie.

4. High Availability & Resilienz
In-Service Software Upgrades (ISSU)
Software-Updates ohne Downtime, mit Rollback-Mechanismen

Redundante Control-Plane
Active/Standby Routing-Prozessoren (RP), Hot-Swap-Fähigkeit für Netzteile und Lüfter

Stateful Failover
Sitzungs- und Forwarding-State werden zwischen RPs synchron gehalten

5. Dokumentation & Community
SR OS Documentation Suite
Umfasst Basic System Configuration, Interface Guides, Services Guides (EVPN, VPRN), MPLS, Security Hardening, Troubleshooting und CLI References 
documentation.nokia.com
.

Training & Support
Offizielle Nokia-Trainings, Online-Kurse, DevNet-Labs und ein aktives Partner-Ökosystem.

Wenn du tiefer in konkrete Konfigurationsbeispiele, CLI-Befehle oder Automatisierungs-Skripte (pySROS, MD-CLI) einsteigen möchtest, gib Bescheid!











Sources

