Cisco ASR 1006-X ist ein leistungsstarker Router aus der Aggregation Services Router (ASR) 1000-Serie von Cisco, der für Service-Provider, Rechenzentren und große Unternehmensnetzwerke entwickelt wurde. Hier sind die wichtigsten Informationen auf einen Blick:

🔧 Technische Eckdaten (Cisco ASR 1006-X)
Merkmal	Beschreibung
Formfaktor	6-RU-Chassis (Rack-Unit)
Kapazität (Durchsatz)	Bis zu 200 Gbps, je nach Lizenz und eingebauten Netzwerkkarten
Modularität	Unterstützt bis zu 6 SPA-Slots + 2 RP-Slots + 2 ESP-Slots
Routing-Prozessor (RP)	Unterstützt RP2 oder RP3 für Redundanz und Performance
Embedded Services Processor (ESP)	Für Weiterleitung, NAT, QoS, etc. — mehrere Modelle möglich (z. B. ESP100, ESP200)
Redundanz	Dual RP, Dual ESP, Dual Power Supplies (redundant möglich)
Software	Läuft mit Cisco IOS XE
Virtualisierung	Unterstützt Cisco Service Containers und VASI für Virtual Routing
Ports (je nach SPA)	GigabitEthernet, 10GE, 40GE, POS, ATM, etc. (je nach Modulen)

💡 Typische Einsatzszenarien
Edge Router bei Service Providern (z. B. IP/MPLS, BGP, NAT, CGNAT)

Aggregation Layer für Metro-Ethernet oder Backbone

High Availability VPN Hub (DMVPN, IPsec, SSL)

Carrier-Grade NAT, QoS & Traffic Engineering

📦 Modularer Aufbau
Du kannst den ASR 1006-X wie folgt konfigurieren:

Routing Processor (z. B. RP2, RP3)

ESP-Modul (z. B. ESP100, ESP200 für Datendurchsatz)

SPA-Einschübe (Shared Port Adapter, z. B. GE, 10GE, POS)

Fan Tray & Dual Power Supplies

🔍 Beispiel-Kommandos zur Analyse (CLI)
bash
Copy
Edit
show version
show platform
show interfaces summary
show redundancy status
show ip route
Wenn du diesen Router in deinem NOC-Simulationsprojekt einbauen möchtest, sag Bescheid – ich kann dir eine passende Gerätebeschreibung, Symbol (SVG), Simulationsdaten (Firmware, Ports, Durchsatz) oder sogar ein typisches Failover-Szenario entwerfen.

Möchtest du ihn visuell in die SVG-Karte integrieren oder nur logisch als Backbone-Komponente simulieren?







You said:
kein preis?


ChatGPT said:
Der Preis für das Cisco ASR 1006-X Chassis variiert je nach Anbieter, Zustand (neu oder generalüberholt) und Ausstattung erheblich. Hier ist eine Übersicht aktueller Angebote:

💰 Preisübersicht (Stand: Mai 2025)
Anbieter	Zustand	Preis (ca.)	Anmerkungen
ALLHDD	Neu	8.934 USD	Nur Chassis, ohne Module
Northland Systems	Neu	9.049,50 USD	3 Jahre Garantie
IT4TRADE	Neu	17.521,56 €	Inkl. MwSt., ohne Module
IT Devices Online	Neu	11.710,23 USD	Nur Chassis
TechForGood	Neu	21.918,17 AUD	~13.800 USD, inkl. GST
PriceBlaze	Refurbished	12.717,36 USD	Generalüberholt, Rabatt gegenüber Neupreis
DirectMacro	Refurbished	7.150 USD	Generalüberholt, nur Chassis
NETGenetics	Refurbished	ab 1.999 USD	Je nach Ausstattung (z. B. mit RP2, ESP etc.)

🧩 Wichtige Hinweise
Module nicht enthalten: Die genannten Preise beziehen sich meist nur auf das Chassis. Für einen vollständigen Betrieb sind zusätzliche Komponenten erforderlich:

Routing Processor (RP): z. B. RP2 oder RP3

Embedded Services Processor (ESP): z. B. ESP100 oder ESP200

Shared Port Adapter (SPA): für Netzwerkanschlüsse

Netzteile: Redundante Stromversorgung möglich

Lizenzkosten: Je nach gewünschter Funktionalität (z. B. NAT, VPN, QoS) können zusätzliche Lizenzgebühren anfallen.
it4trade.com

Zustand: Generalüberholte Geräte (refurbished) sind günstiger, bieten jedoch möglicherweise kürzere Garantien oder gebrauchte Komponenten.

🔍 Empfehlung für dein Projekt
Wenn du den ASR 1006-X in deinem NOCProfiTool simulieren möchtest, benötigst du keine physische Hardware. Für eine realistische Simulation kannst du jedoch folgende Parameter berücksichtigen:

Durchsatz: Bis zu 200 Gbps (je nach Ausstattung)

Anzahl Ports: Variabel, abhängig von den eingesetzten SPAs

Redundanz: Unterstützung für duale RPs und ESPs

Einsatzbereich: Edge-Routing, Aggregation, VPN-Hub
it4trade.com
networkgenetics.net

Möchtest du den ASR 1006-X visuell in deine SVG-Karte integrieren oder nur logisch als Backbone-Komponente simulieren? Ich kann dir gerne bei der Erstellung entsprechender SVG-Symbole oder Simulationsdaten helfen.