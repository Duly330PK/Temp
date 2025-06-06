dB-Werte im Glasfasernetz
1. Dämpfung (Attenuation) – loss_db
Misst, wie stark das Signal pro Strecke/Element geschwächt wird


Einheit: dB


Wichtig bei: Spleißen, Steckern, Kabeln, Muffen


Komponente
Toleranzbereich
Alarmwert (ungefähr)
Spleißstelle
0.00 – 0.10 dB
> 0.30 dB
Steckverbinder
0.10 – 0.30 dB
> 0.50 dB
Patchkabel (3m)
< 0.10 dB
—
Gesamtverbindung
max. 28 dB
> 30 dB → tot


2. Rückflussdämpfung (Reflexion) – ref_loss_db
Misst ungewollte Reflexionen, die Modems stören können


Einheit: dB – je höher, desto besser!


Komponente
Gut
Warnung
Kritisch
Steckverbinder
> 40 dB
< 35 dB
< 30 dB
Spleißstelle
> 60 dB
< 55 dB
< 50 dB
OTDR-Messung gut
> 45 dB
—
—










🛠️ Wie wir das einbauen (in devices.json)
Bei jeder Muffe, ONT, OLT:
json
KopierenBearbeiten
"optical_metrics": {
  "total_loss_db": 17.9,
  "max_allowed_loss_db": 28.0,
  "worst_splice_loss_db": 0.45,
  "ref_loss_db": 32.1,
  "min_ref_loss_db": 35.0,
  "status": "warn"
}

Und im Terminal z. B.:
less
KopierenBearbeiten
> fiber test
→ Ergebnis:
Gesamtdämpfung: 17.9 dB (Grenze: 28.0 dB) ✅
Rückflussdämpfung: 32.1 dB (Min. erwünscht: 35.0 dB) ⚠️
Faser 5: Spleißverlust 0.45 dB → ZU HOCH ❌




















💡 Deine Vorteile in der Simulation:
Echte Grenzwerte pro Gerät


Dynamisch erzeugbare Fehlerberichte


Visualisierung: z. B. Gerät wird gelb bei Warnung, rot bei Überschreitung


Nutzer kann „Problemursache“ zurückverfolgen (Sherlock-Style)
