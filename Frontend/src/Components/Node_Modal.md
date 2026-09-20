# Node_Modal.jsx
_Homelab-Dashboard/Frontend/src/Components/Node_Modal.jsx_

## Zusammenfassung
Die Datei ``Node_Modal.jsx`` erlaubt das hinzufügen und editieren einer Node (Objekt), mit Modal und passierend auf React.


## Details
| Name | Beschreibung |
| - | -
| **Form state** | Initialisiert eine leere Node mit den standard Einstellungen vom ``empty``

Mögliche Eigenschaften
| Bereich | Wert |
| - | -
| Identity | ``name``, ``domain``
| Endpoint | ``protocol`` (http/https), ``IP/hostname``, ``port``, ``path``
| IP mode | ``static`` \ ``DHCP`` (radio buttons)
| create direct link | checkbox (linkEnabled)
| Type | ``physical``,``vm``,``container``,``network``,``storage``,``other`` und ``manual status`` (``online``,``dhcp``,``offline``,``warning``,``unknown``)
| Übergeornetes Objekt | Nur bei ``vm`` und ``container`` möglich! Hinterlegen vom Host-Objekt, auf welcher die dieser Dienst läuft.
| Beschreibung | Freies Textfeld für Beschreibungen
| Hardware Infos | ``CPU``, ``RAM``, ``disk``, ``OS``
| Icon picker | Auswahl eines Icons für die Node
| Services list | Dynamische Liste von Diensten, welche man hinzufügen oder entfernen kann.