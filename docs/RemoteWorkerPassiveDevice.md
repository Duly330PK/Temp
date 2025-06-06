Was das für unsere Simulation bedeutet:
1. "Remote-Zugriff" auf Muffen = nicht verfügbar
Kein Live-Terminal wie bei aktiven Geräten


Stattdessen: Button „Außendienst anfordern“ / „Muffenprüfung starten“


Simulierter Countdown (z. B. 60 Sekunden bis Eintreffen)


Danach wird Simulationsdatenstand angezeigt:


Faserstatus


Verlustwerte


Sichtbare Schäden



🎬 Beispiel Ablauf in der UI:
🧱 Du klickst auf Muffe-03 in der Karte →
 📋 Rechts erscheint:
yaml
KopierenBearbeiten
Muffe-03 (Spleißmuffe S1000)
Zugriff: nur durch Außendienst möglich
Status: unbekannt

[🛠 Außendienst anfordern]

→ Zeit bis Eintreffen: 00:58...00:57...

Nach Ablauf:
yaml
KopierenBearbeiten
Ergebnis der Vor-Ort-Prüfung:
- Faser 5 (grün): 0.45 dB Verlust → DEFEKT
- Faser 6 (braun): leer
Norm: DIN EN 60794
Messung: OTDR 1310 nm



















🔧 Was ich dafür im JSON vorbereite:
Jede Muffe bekommt:
is_passive: true


field_access_required: true


last_checked: timestamp


field_check_duration: int (in Sekunden)


pending_check: false/true


Und natürlich den fiber_structure-Block mit Norm-Daten.


























🔜 Umsetzung
Wenn du sagst „Go mit passiven Muffen + Außendienstsimulation“, mache ich:
devices.json mit kompletter Muffenstruktur wie oben


passende Statusflags für Außendienstsimulation


im HTML später: Simulierter Countdown + Ergebnisanzeige



Optional für später: Du kannst sogar einplanen, dass nicht sofort ein Techniker verfügbar ist →
 Simuliere „Einsatzteam X ist noch in Arbeit“, ETA 2h etc. – ideal für Wartungspläne, Trainings oder Stress-Testszenarien.