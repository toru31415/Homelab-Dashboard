# nodeHelper.js
_Homelab-Dashboard/Frontend/src/Components/nodeHelper.js_

## Zusammenfassung
Die Datei ``nodeHelper.js`` ist eine Hilfsdatei für die Node-objects im Frontend. Sie hollt die Informationen ab und gestaltet diese um, dass diese verwendet werden kann. Eines ist das Anpassen der Sprache oder das Zusammenstellen von URLs oder der gleichen.

## Details
### Typ und Status Label/Mappings
| export | Zweck
| - | - 
| ``TYPE_LABELS`` | Umwandeln der Typenbezeichnung in die deutsche Bezeichnung.
| ``STATUS_ICON_NAME`` | Umwandeln vom Statusnamen in sein Icon-Bild.
| ``HARDWARE_TYPES`` / ``isHardware()`` | Klären, ob etwas Hardware ist.
| ``relationChildren()`` | finden der Veschachtelung, was bei VMs und Containern der Fall ist. 

### IP mode helpers
| export | Zweck
| - | - 
| ``ipModeLabel()`` / ``ipModeClass()`` | Text anzeigen basierend darauf, ob das Gerät eine IP statisch oder per DHCP erhält.

### Status logic
| export | Zweck
| - | - 
| ``effectiveStatus()`` | Wandelt den Status anhand vom IP Modus in Online (bei fixen IPs) oder DHCP (bei DHCP Geräte) um. 
| ``statusBadgeClass()``, ``statusIconName()``, ``statusLabel()`` | Umwandeln vom effektiven Status nach ``badge CSS class``, ``icon id``, ``display text``
| ``showPingMeta()`` | Anzeigen der Infos zum Ping, wenn das Gerät kein DHCP bezieht
| ``getPingTarget()`` | IP zum Ping retournieren