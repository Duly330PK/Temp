SQL Server Startvorgang (Markdown)
md
Copy
Edit
# 📦 SQL Server starten – Übersicht

## 🖥️ Windows-Systeme

### ➤ Dienste über GUI starten
1. `Windows-Taste + R` drücken
2. `services.msc` eingeben → Enter
3. Dienst suchen: `SQL Server (MSSQLSERVER)` oder `SQL Server (INSTANZNAME)`
4. Rechtsklick → **Starten** oder **Neu starten**

### ➤ CMD (Eingabeaufforderung)

```cmd
net start MSSQLSERVER
Für benannte Instanzen:

cmd
Copy
Edit
net start "SQL Server (MEINEINSTANZ)"
➤ PowerShell
powershell
Copy
Edit
Start-Service -Name 'MSSQLSERVER'
Für benannte Instanzen:

powershell
Copy
Edit
Start-Service -Name 'SQL Server (MEINEINSTANZ)'
🐧 Linux-Systeme (z. B. Ubuntu mit Microsoft SQL Server)
➤ Starten
bash
Copy
Edit
sudo systemctl start mssql-server
➤ Status prüfen
bash
Copy
Edit
sudo systemctl status mssql-server
➤ Neu starten
bash
Copy
Edit
sudo systemctl restart mssql-server
🐳 Docker-Container
➤ Container starten
bash
Copy
Edit
docker start <container_name>
➤ Container neu starten
bash
Copy
Edit
docker restart <container_name>
🔍 Prüfung der Verbindung
Öffne SQL Server Management Studio (SSMS)

Oder via sqlcmd:

bash
Copy
Edit
sqlcmd -S localhost -U SA -P <deinPasswort>
yaml
Copy
Edit

---

## ✅ **ZTE ZXA10 C320 OLT Datenblatt (Markdown)**

Bereits zuvor geliefert, aber hier nochmal als Gesamtpaket:

```md
# 📦 Produktdatenblatt: ZTE ZXA10 C320 OLT – Kompaktes GPON-System

**Hersteller**: ZTE  
**Modell**: ZXA10 C320  
**Artikelnummer**: RMMHH  
**Kategorie**: Optical Line Terminal (OLT)  
**Geeignet für**: GPON, EPON, XG-PON1, Punkt-zu-Punkt (P2P)

---

## 🧰 Produktbeschreibung

Der **ZTE ZXA10 C320** ist ein platzsparender OLT mit einer **2U-Rackmontage**, ideal für FTTH-/FTTB-Netzwerke. Das System ist modular und unterstützt den Einsatz in Triple-Play-Szenarien (Daten, Sprache, Video). Dank **hoher Skalierbarkeit**, stabiler Leistung und einfacher Wartung eignet es sich hervorragend für Telekommunikationsunternehmen und ISPs.

---

## 🔧 Technische Spezifikationen

| Eigenschaft                  | Wert                                       |
|-----------------------------|--------------------------------------------|
| **Gehäusegröße**            | 2U, für 19-Zoll-Rack                       |
| **Abmessungen**             | 86,1 mm (H) × 482,6 mm (B) × 270 mm (T)    |
| **Gewicht**                 | max. 6,5 kg (voll bestückt)                |
| **Stromversorgung**         | -48 V DC (±20 %)                           |
| **Servicekarten-Slots**     | 2                                          |
| **Kontrollkarten**          | 2 × SMXA/3                                 |
| **Max. Benutzer**           | Bis zu 4096 ONT (GPON)                     |
| **Split-Verhältnis**        | Bis zu 1:128                               |
| **Max. Reichweite**         | Bis zu 60 km                               |
| **Backplane-Kapazität**     | 420 Gbit/s                                 |
| **Switching-Kapazität**     | 84 Gbit/s                                  |
| **Betriebstemperatur**      | -5 °C bis +45 °C (kurzzeitig bis -25/55 °C)|
| **Luftfeuchtigkeit**        | 5 % – 95 %, nicht kondensierend            |

---

## 🌐 Netzwerk & Protokolle

- **Unterstützte Protokolle**: EPON, GPON, P2P, XG-PON1
- **Layer 2/3-Funktionen**: VLAN, QoS, STP/MSTP, Multicast IPTV, L3-Routing
- **Sicherheit**: MAC/IP-Filterung, ACLs, DoS-Schutz, DHCP Option 82

---

## ⚙️ Management & Steuerung

- CLI (Command Line Interface)
- Telnet / SSH
- SNMP (Simple Network Management Protocol)
- Web-GUI
- Remote-Upgrade & Monitoring
- Alarmmeldungen & Umgebungsüberwachung

---

## 📦 Lieferumfang

- 1 × ZTE ZXA10 C320 OLT Gehäuse (2U)
- 2 × SMXA/3 Kontroll-/Stromversorgungskarten
- 1 × Lüftereinheit
- Konsolenkabel
- 2 × DC-Stromkabel
- Erdungskabel
- Schraubenset

---

## 💰 Preisübersicht (Stand: Mai 2025)

| Anbieter     | Preis              |
|--------------|--------------------|
| **Batna24**  | ca. **1.950,00 €** |

> *Hinweis: Preise können sich je nach Verfügbarkeit und Konfiguration ändern.*

---

## 🖼 Produktbilder

### 🔹 Vorderansicht

![ZTE C320 Vorderansicht](https://static.batna24.com/images/products/87010_main.jpg)

### 🔹 Rückansicht

![ZTE C320 Rückansicht](https://static.batna24.com/images/products/87010_2.jpg)

> *Bilder © Batna24.com*

---

## 🔗 Weitere Informationen

- [ZTE ZXA10 C320 bei Batna24](https://www.batna24.com/de/p/zte-c320-olt-rmmhh)