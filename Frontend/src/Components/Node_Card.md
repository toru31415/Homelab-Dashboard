# Node_Card.jsx
_Homelab-Dashboard/Frontend/src/Components/Node_Card.jsx_

## Zusammenfassung
Die Datei ``Node_Card.jsx`` ist die Hauptanzeige für das anzeigen, einer Node im Dashboard. Diese Datei benötigt viele utils(``status``/``type labels``,...) aus dem nodeHelper.js.

## Details
| Name | Beschreibung |
| - | -
| ``NodeCard`` | Anzeigen eines Objektes mit folgenden Informationen. // Header: ``icon``, ``name``, ``URL`` // ``Beschreibung`` // SpecChips: ``CPU``,``RAM``,``Disk``,``OS``,``IP``/``Mode`` // Liste mit den Diensten // Status Bereich mit Icons
| ``ChildrenSection`` | Faltbaren Bereich, mit den Untergeordneten Objekten. Es kann aktiviert werden, ob dies im Dashboard angezeigt werden soll.
| ``ChildRow`` | Kompakte Reihe mit Unterobjekten, mit dem ``Icon``, ``Name``, ``URL`` und Symbol zum Typ. 
| ``SpecChips`` | Erstellt eine Kurzfassung mit der Konfig, IP Modus und Host, welches auf der ObjektKarte gezeigt wird, mit der verwendung vom ``ipModeClass``.
