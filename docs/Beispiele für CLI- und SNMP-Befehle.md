Beispiele für CLI- und SNMP-Befehle
Nokia ISAM OLT: Die CLI ähnelt generischen Router/Switch-Oberflächen. Beispielbefehle (ISAM 7300/7360-Serie)
networkcommands.net
networkcommands.net
:
show equipment slot – listet eingebaute Karten/Module (Slot-Tabelle)
networkcommands.net
.
show equipment transceiver-inventory – zeigt installierte optische Module (Typ, Wellenlängen)
networkcommands.net
.
show vlan name – listet konfigurierte VLANs
networkcommands.net
.
show qos statistics lt-cos current-15min lt:1/1/4 – QoS-Kennzahlen pro Queue
networkcommands.net
.
Beispiel (fiktiv):
css
Copy
Edit
OLT# show equipment slot
Slot  Card Type    Status
1     CACC-K       OK
2     FANT-F       OK
3     NELT-B       OK
4     FGUT-A       OK
...
Dieser Befehl gibt z.B. aus, welche OLT-Karten (GPON, XGS-PON, Uplink-Module) aktiv sind. Cisco Switch (IOS): Typische Befehle sind u.a. show interface status (Port-Status/VLAN), show vlan brief, show running-config, show cdp neighbors, show snmp etc. Beispielsweise zeigt show interface status alle Ports und deren Status:
arduino
Copy
Edit
Switch# show interface status
Port      Name   Status       Vlan  Duplex  Speed Type
Gi1/0/1           connected    10    a-full  a-1000 10/100/1000BaseTX
Gi1/0/2           notconnect   1     auto    auto   10/100/1000BaseTX
...
(Solche Ausgaben sind in Cisco-Dokumenten illustriert
cisco.com
.) SNMP-Abfragen: Über SNMP lassen sich Geräteparameter auslesen. Beispielsweise liefert
cpp
Copy
Edit
snmpget -v2c -c public 192.0.2.1 SNMPv2-MIB::sysDescr.0
die Systembeschreibung. Typische OIDs sind z.B. IF-MIB::ifDescr für Schnittstellennamen oder SNMPv2-MIB::sysUpTime.0. Die Ausgabe könnte lauten:
php
Copy
Edit
SNMPv2-MIB::sysDescr.0 = STRING: "Nokia ISAM 7360 FX Chassis OS Version ..."
SNMPv2-MIB::sysUpTime.0 = Timeticks: (12345678) 1 day, 10:17:36.78