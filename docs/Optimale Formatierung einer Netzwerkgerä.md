Optimale Formatierung einer Netzwerkgeräte-Tabelle für Google Docs

Tabelleneinstellungen und Layout in Google Docs
Für eine Netzwerk-Gerätetabelle empfiehlt sich eine klare, gut lesbare Formatierung. Wählen Sie eine serifenlose Schrift (z.B. Arial oder Roboto) in 10–12 pt für den Fließtext, um eine gute Lesbarkeit zu gewährleisten. Legen Sie in den Tabellen-Eigenschaften feste Spaltenbreiten fest: breite Spalten für IPv4/IPv6-Adressen und lange Produktbezeichnungen, schmalere für kurze Felder. Ziehen Sie Spaltengrenzen oder verwenden Sie „Tabelleneigenschaften → Spalte“ zur exakten Breitenanpassung. Achten Sie auf angemessene Zeilenhöhe (z.B. 1,2-facher Zeilenabstand oder mind. 1–2 Leerzeilen Puffer), damit Text nicht abgeschnitten wird.
Zeilenumbruch in Zellen: Längerer Text (z.B. mehrere Ports oder Merkmale) kann innerhalb einer Zelle umbrochen werden. Nutzen Sie Strg+Enter (Windows) bzw. Cmd+Enter (Mac) zur manuellen Zeilenumbruch-Eingabe
support.google.com
. Alternativ aktivieren Sie „Text umbrechen“ in den Zellen-Eigenschaften, damit Inhalte automatisch auf mehrere Zeilen gehen
support.google.com
.
Hintergrundfarbe und Reihenabstände: Für eine bessere Übersicht können Sie abwechselnde Zeilenfarben verwenden. In Google Docs wählen Sie dazu für die Zellen-Füllfarbe „Abwechselnde Farben“
support.google.com
 oder setzen manuell helle Grautöne für jede zweite Zeile. Das hebt Zeilen optisch ab und erleichtert das Querablesen. Ebenso können Sie dünne Rahmenlinien oder abgesetzte Zellränder verwenden (Tabelleneigenschaften → Rahmenstärke/-farbe)
support.google.com
, um die Tabelle klarer zu gliedern.
Zellen verbinden: Wenn Sie mehrere Geräte gleichen Typs listen, nutzen Sie „Zellen verbinden“ für die Gerätetyp-Spalte. Beispiel: Bei zwei Cisco-Routern werden beide Zeilen unter „Router“ zusammengeführt
support.google.com
. Das verringert Wiederholungen und gruppiert zusammengehörige Geräte visuell. Klicken Sie dazu die gewünschten Zellen an und wählen Sie im Kontextmenü „Zellen verbinden“
support.google.com
.
Ausrichtung: Richten Sie Beschriftungen zentriert aus (insbesondere Spaltenüberschriften) und den Zelleninhalt je nach Datentyp (Text linksbündig, Zahlen/Adressen eher zentriert oder rechtsbündig). In den Tabelleneigenschaften können Sie horizontale und vertikale Ausrichtung pro Zelle festlegen
support.google.com
. Beispielsweise kann die Gerätebezeichnung linksbündig und die IP-Adressen rechtsbündig stehen, um Dezimalpunkte auszurichten.
Kopfzeile: Legen Sie die erste Zeile als Tabellenkopf fest und formatieren Sie sie fett. Google Docs wiederholt Kopfzeilen nicht automatisch auf Folgeseiten, daher sollten Sie die Überschriften bei größeren Tabellen manuell ggf. auf jede neue Seite kopieren oder die Tabelle in logische Abschnitte aufteilen.
IPv4-/IPv6-Adressen formatieren
IP-Adressen sollten als Text behandelt werden, damit keine automatische Umformatierung stattfindet (z.B. zu Datumsangaben). Wählen Sie in Google Docs für diese Zellen den Formattyp Text: Markieren Sie die Zelle(n), gehen Sie zu Format → Zahl und setzen Sie den Eintrag auf „Text“
support.google.com
. Dadurch interpretiert Docs etwa „01.02.2023“ nicht als Datum. Tragen Sie IPv6-Adressen am besten in Kompaktform (mit :: für Nullen) plus Präfixlänge ein (z.B. fd00:2cde:1::1/64). Stellen Sie sicher, dass die IPv6-Spalte breit genug ist; bei Bedarf kann hier eine Monospaced-Schriftart (z.B. Courier New) helfen, die Feldausrichtung zu verbessern.
Präfix/Ausdruck: IPv6-Netzpräfixe notieren Sie mit Schrägstrich (CIDR-Notation), z.B. 2001:db8::/32. IPv4-Subnetzmaske kann alternativ als Präfix (z.B. /24) oder als klassische Maske (255.255.255.0) stehen.
Vermeidung von Autokorrektur: Da Google Docs keine vollständige Zellformatierung wie Sheets kennt, führen Sie die o.g. Schritte aus. Kontrollen wie „Nur Zahlen“ deaktivieren helfen, falls Docs fälschlich einen Eintrag umwandelt. Bei Problemen kann ein vorangestelltes Apostroph (z.B. '192.168.1.1) in Tabellen-Editoren den Textmodus erzwingen.
Eingabehilfen: Für konsistente Eingabe könnte man Platzhalter oder kurze Instruktionen voranstellen (z.B. IPv4: <Eingabe>). Es gibt auch Add-ons, die IPv4-/IPv6-Korrektheit prüfen, falls die Tabelle umfangreich ist.
Zusätzliche Erläuterungen (Fußnoten, Kommentare)
Für detaillierte Hinweise oder Erläuterungen zu einzelnen Einträgen bieten sich Fußnoten und Kommentare an:
Fußnoten: Mit Einfügen → Fußnote kann man ergänzende Informationen fußnotenartig unterhalb der Tabelle unterbringen
support.google.com
. Setzen Sie dazu im Zelltext einen kleinen Verweis (z.B. „¹“), und fügen Sie am Tabellenende oder auf der Seite unten die Erklärung ein. Fußnoten sind in der PDF-Ausgabe sichtbar und gelten als dauerhafte Erläuterung. Einfügen geht schnell über den Shortcut Strg+Alt+F oder über das Menü
support.google.com
support.google.com
.
Kommentare: Wenn die Tabelle in Zusammenarbeit entstanden ist oder später überarbeitet wird, können Sie Kommentare hinzufügen. Markieren Sie eine Zelle oder einen Text, dann Rechtsklick → Kommentar (oder Strg+Alt+M
support.google.com
) und schreiben Sie Ihre Anmerkung. Kommentare sind jedoch nicht in der finalen PDF sichtbar; sie dienen der internen Abstimmung (z.B. Rückfragen, To-Dos).
Zusatzspalten/-zeilen: Eine weitere Möglichkeit ist, innerhalb der Tabelle eine „Bemerkungen“-Spalte oder -Zeile einzufügen. So lassen sich z.B. in der letzten Spalte kurze Stichpunkte zur Konfiguration oder eingesetzten Technologien direkt darstellen. Achten Sie dabei auf genügend Zeilenhöhe und gegebenenfalls kleinere Schrift, damit die Tabelle kompakt bleibt.
Gerätegruppen und Wiederholungstypen
Um die Übersicht zu wahren, gruppieren Sie Geräte desselben Typs zusammen:
Zellverbund: Fassen Sie für eine Gerätegruppe (etwa alle „Switches“) die Zellen in der Spalte Gerätetyp zusammen. Die zusammengeführten Zellen zeigen den Typ nur einmal an, während sich in den Folgezellen IP und andere Daten fortsetzen
support.google.com
. Das reduziert Redundanz in der Tabelle.
Alternierende Zeilenfarben: Zusätzlich können Sie bei Gruppenwechseln (z.B. von Routern zu Switches) Zeilenfarben wechseln, um visuell zu trennen.
Sortierung: Ordnen Sie die Tabelle in einer logischen Reihenfolge (z.B. physikalische Standorte oder Funktionen). Innerhalb jedes Typs sollten Geräte mit ähnlichen Konfigurationen hintereinander stehen, damit ein Auge die Zeilen leichter verfolgt.
Formatierung für Export/PDF und Dashboard
Für den Export oder Einbettung in ein Dashboard sollten Sie an Layout und Seiteneinrichtung denken:
Ausrichtung: Verwenden Sie Querformat (“Datei → Seiteneinrichtung → Ausrichtung Querformat”
support.google.com
), wenn die Tabelle viele Spalten hat. Google Docs erlaubt pro Abschnitt unterschiedliche Ausrichtungen
support.google.com
, was hilfreich sein kann, wenn manche Teile hochformat und andere querformatig sein sollen.
Seitenränder: Reduzieren Sie gegebenenfalls die Seitenränder (über Datei → Seiteneinrichtung), um Platz für Breite zu gewinnen. Achten Sie, dass keine Spalte abgeschnitten wird, wenn Sie das Dokument als PDF speichern.
Kopfzeile wiederholen: Google Docs wiederholt Kopfzeilen bei mehrseitigen Tabellen nicht automatisch. Bei langen Tabellen empfiehlt es sich daher, die Spaltenüberschriften manuell am Seitenanfang zu duplizieren oder die Tabelle so aufzuteilen, dass auf jeder neuen Seite eine Überschrift-Zeile steht.
Export-/Embed-Qualität: Beim Export als PDF werden Formatierungen (Schrift, Farben, Fußnoten) beibehalten. Wenn Sie die Tabelle in ein Dashboard (z.B. ein Wiki oder ein Web-Portal) einbinden wollen, können Sie alternativ das Google Docs-Dokument publizieren und verlinken oder als PDF/PNG-Bild einbetten. Achten Sie darauf, dass die Schriftarten eingebettet oder allgemein verfügbar sind, damit beim Import keine Formatabweichungen auftreten.