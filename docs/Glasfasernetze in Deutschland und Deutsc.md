Glasfasernetze in Deutschland und Deutsche Glasfaser
Glasfaserkabeltypen: In deutschen Weitverkehrs- und Verteilnetzen kommen fast ausschließlich Singlemode-Fasern (9/125 µm, ITU-T G.652.D bzw. biegeoptimierte G.657.A1/A2) zum Einsatz. Multimode-Fasern (50/125 µm, z.B. OM3/OM4) werden nur vereinzelt z.B. in Rechenzentren oder Kurzstrecken genutzt. Typische Kabel für FTTH/FTTB sind z.B. Zentralhohlader- und Bündelader-Kabel mit 12 bis 144 Fasern. Ein typisches metallfreies FTTH-Kabel (Nexans MINI) nutzt 12 oder 24 Fasern (Modulo 12–Aufbau) sowie zusätzliche Bündelader mit 48–144 Fasern
nexans.ch
nexans.ch
. Kleinere Verlegekabel (FTTH-Minikabel) enthalten oft 2–12 Fasern (OS2/G.657) für den Hausanschluss.
Kabeltyp	Fasern pro Kabel	Beschreibung
Zentralhohlader (FTTH)	12, 24 (bündelweise 48–144)
nexans.ch
Kompaktes Außenkabel für Ortsnetze (OS2-G652D-Fasern)
Gebäudeeinführung (Drop)	2 (zwei Fasern, OS2/G.657)	Hausanschlusskabel bis zum ONT
(Multimode-Option)	50/125 µm: z.B. 2–24 (OM3/OM4)	Nur für kurze Distanzen/Backbones in Rechenzentren (≈1 Gbit/s bei 850 nm)

Dämpfungswerte: Standard-OS2-Fasern haben sehr geringe Dämpfung: typ. <0,35 dB/km bei 1310 nm und <0,25 dB/km bei 1550 nm
samm.com
. Biegeoptimierte G.657-Fasern weisen ähnliche Werte auf. Multimode-OM3/OM4-Fasern dämpfen bei 850 nm etwa 2,5–3,0 dB/km (max. 3,5 dB/km) und bei 1300 nm rund 0,5–1,0 dB/km
thefoa.org
. Die Verluste steigen leicht mit der Temperatur und besonders bei zu kleinem Biegeradius. Typische Biegeverluste sind klein – z.B. verursachen 100 Umdrehungen um einen 50 mm-Dorn nur ≤0,05 dB Zusatzdämpfung
optokon.com
. Erst bei extremen Radien (<20 mm) steigt der Verlust deutlich. Steckverbinder fügen typ. ~0,2–0,3 dB pro Verbindung hinzu, Fusionsspleiße ~0,1–0,15 dB
thefoa.org
thefoa.org
. Die folgende Tabelle fasst typische Dämpfungskennwerte zusammen:
Fasertyp	1310 nm [dB/km]	1550 nm [dB/km]	Quelle
OS2 Singlemode (ITU-T G.652D)	≤0,35 (typ. 0,34)	≤0,25 (typ. 0,21)	
samm.com
OS2 (G.657 bend-insensitive)	≈0,34	≈0,22	
samm.com
 (≈G.652)
Multimode (OM3/OM4)	≈3,0 (850 nm, 3)	≈1,0 (1300 nm, 1)*	
thefoa.org

*Werte für Multimode: *“ca. 3,5 dB/km bei 850 nm und 1,5 dB/km bei 1300 nm” gemäß TIA-Standa­rdisierung
thefoa.org
 (typisch etwa 3,0/1,0).
Netzaufbau und Komponenten bei Deutsche Glasfaser
Deutsche Glasfaser errichtet pro Ausbaugebiet einen Glasfaser-Hauptverteiler, der an das Backbone angeschlossen wird. Dieses Straßen-Kabinett („Multifunktionsgehäuse MFG 24“) versorgt typischerweise ein Gebiet mit ≈15 km Radius
deutsche-glasfaser.de
. Von dort führen Kabel über Verteilerschränke bis in jede Straße und schließlich in die Haushalte (echter FTTH-Ansatz)
deutsche-glasfaser.de
. Aktive Komponenten verteilen die Anschlüsse: Im Backbone bzw. PoP (Point-of-Presence) steht zumeist ein Nokia ISAM OLT (z.B. 7360 FX mit GPON/XGS-PON-Karten)
deutsche-glasfaser.de
. Über Passiv-Splitter (üblicherweise 1:32 bei GPON
cisco.com
) wird das optische Signal auf die Endkunden-(ONT-)Portionen verteilt. Im Business-Bereich (DGB/DGH) setzt DG auch Punkt-zu-Punkt-Faser (Active Ethernet) ein: Dazu nutzt man z.B. ein Nokia 7210 SAS-K Routing/Switch-Modul (5/12 Ports) sowie Cisco-Router/Layer-2-Switche. In der Praxis kommen u.a. Cisco ME 1200 (EOL, neuerdings NCS 520) und Genexis-Fibertwist-Geräte zum Einsatz
deutsche-glasfaser.de
. Typische Netzwerkparameter: GPON-Systeme arbeiten im Wellenlängenbereich 1290–1330 nm (Upstream) und 1480–1500 nm (Downstream)
cisco.com
. Ein OLT-Port (z.B. 2,488 Gbit/s down, 1,244 Gbit/s up) kann bis zu 32 Endkunden bedienen (Split-Verhältnis 1:32
cisco.com
). Die POP-Topologie ist daher sternförmig: OLT – Splitter – ONT/ONT. Begleitend sind VLAN-Trennungen, Radius-/DHCP-Server etc. im Einsatz. Fußpunkte für Zugsicherung, Blitzschutz und Passive-ODF (Optical Distribution Frame) sind üblich.
Hersteller und Ausrüstung
Deutsche Glasfaser beschafft für dieses Netzwerk vorwiegend Nokia/Alcatel-Lucent (OLT, ONT) und Cisco (Switches, Router). Beispiele aus Spezifikationen: für Punkt-zu-Punkt-Dienste werden Nokia 7210 SAS-K (5/12 Port Ethernet-Module) eingesetzt
deutsche-glasfaser.de
; als PE/Access Router dienten lange Cisco ME 1200-Geräte (Klein-Router mit 4 SFP-Ports, später durch Cisco NCS 520 ersetzt)
deutsche-glasfaser.de
. Für reine Daten-Switche setzt man Cisco Catalyst bzw. Cisco Nexus ein. Passive Komponenten (Split­ter, ODF, Kupferschutz etc.) stammen u.a. von Spezialanbietern. Alle DG-FTTH-Teilstrecken sind kupferfrei (100 % Glasfaser
deutsche-glasfaser.de
).
Stromverbrauch typischer Komponenten
In POPs und Verteilerstellen müssen vor allem OLTs und Switches mit Strom versorgt werden. Typische Werte:
Gerät (Hersteller/Modell)	Funktion/Typ	Stromverbrauch (ca.)
Nokia FGUT-A (16‑fach GPON/XGS-PON-Karte)
xponshop.com
OLT-Linecard (2,5G GPON + 10G XGS-PON)	static ~48 W, max ~98 W (bei Volllast)
xponshop.com

≈6 W pro PON-Port (16 Ports)
Cisco Catalyst 9300-24P (Layer-3-Switch)	24×1G RJ45 (kein PoE)	~525–580 W bei Volllast
cisco.com
 (≈22–24 W/Port)
Cisco ME 1200-4S (4×1G SFP-Access-Router)
cisco.com
Point-to-Point Access-Router	~8,3 W (110 VAC) / ~8,8 W (220 VAC)
cisco.com

Weitere Beispiele: Ein ganzes Nokia-OLT-Chassis (z.B. 4‑Slots) samt Karten liegt insgesamt im niedrigen dreistelligen Watt-Bereich. Moderne Redundanz-PSUs und Lüfter moderieren den Gesamtverbrauch. Für Energieeffizienz gelten Code-of-Conduct-Grenzwerte, die etwa von Nokia eingehalten werden