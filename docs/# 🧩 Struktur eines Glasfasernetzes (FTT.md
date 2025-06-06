# 🧩 Struktur eines Glasfasernetzes (FTTH/Backbone) – Allgemeine Übersicht

## 1. Backbone-Anbindung

**Ziel:** Anbindung eines regionalen Netzknotens an überregionale Glasfaser-Infrastruktur

- **Fasertyp:** G.652.D oder G.654.E (Long Haul)
- **Kapazität:** ≥ 96 Fasern, mindestens 2 redundante Trassen
- **Verlegung:** Entlang Autobahnen, Bahntrassen, Mitnutzung von Infrastruktur (z. B. DB Netz, Versorger)
- **Technik:** DWDM mit Coherent Optics (z. B. 400G ZR+), EDFA alle 80–100 km

### 🔧 Muffen im Backbone:
| Typ           | Funktion                     | Position                 |
|---------------|------------------------------|--------------------------|
| Inline-Muffe  | Spleißpunkt, Durchverbindung | Alle 500–1000 m Trasse   |
| Dome-Muffe    | Großes Spleiß- und Reservevolumen | Trassenknoten, Reservepunkt |

---

## 2. PoP (Point of Presence)

**Ziel:** Zentrale technische Anbindung für das Orts-/Stadtnetz

- **Standortwahl:** Nähe Gewerbegebiet, Umspannwerk, zentrales Grundstück
- **Bauform:** Containerlösung oder kleines Rechenzentrum
- **Ausstattung:**
  - DWDM-Termination
  - Core-Router / Aggregation-Router
  - OLT-System für GPON/XGS-PON
  - Patchfelder (ODF), Glasfaserracks

---

## 3. Verteilnetz (FTTH/FTTB)

**Architektur:**  
- FTTH: Point-to-Multipoint (z. B. XGS-PON)  
- Gewerbe: Teilweise Point-to-Point (P2P)

**Komponenten:**
- Straßenschränke (NVt) mit passiven 1:32 oder 1:64 Splittern
- Zubringerkabel: 12–24 Fasern, G.657.A1 (biegeunempfindlich)

### 🔧 Muffen im Verteilnetz:
| Typ            | Funktion                        | Position                       |
|----------------|----------------------------------|--------------------------------|
| Abzweigmuffe   | Verteilung auf Straßenschränke   | Vor/Neben NVt                  |
| Inline-Muffe   | Durchgehende Verbindung          | Zwischen PoP und NVt           |
| Dome-Muffe     | Mehrfaser-Verteilung, Reserve    | Hauptverteilpunkte, Trassenknoten |

---

## 4. Hausanschluss (Customer Premises)

**Typ:** FTTH mit Drop-Kabel, max. 30 m (z. B. durch Speedpipe indoor/outdoor)

**Komponenten:**
- Kabel: G.657.A2 (1–2 Fasern, sehr biegeunempfindlich)
- Abschlussdose: OTO (Optical Telecommunications Outlet)
- ONT: z. B. XGS-PON ONT + Endkundengerät (Router)

### 🔧 Muffen im Hausanschlussbereich:
| Typ             | Funktion                       | Position              |
|-----------------|---------------------------------|-----------------------|
| Mini-Muffe      | Abzweigung von 1–2 Fasern       | Gehweg, Grundstücksrand |
| Compact-Muffe   | Platzsparend für Einzelkunden   | Speedpipe-Verteiler    |

---

## 5. Kabelschema (Allgemein)

