# icons.js
_Homelab-Dashboard/Frontend/icons.js_

## Zusammenfassung
Die Datei ``icons.js`` ist ein Array,  welches die icon definition für das Homelab-Dashboard beinhaltet. Es zentralisiert UI Objekte an einem Ort, damit man diese via ``id`` ansteuern und verwenden kann.

## Details
Jeder Eintrag/Icon hat folgende Eigenschaften.
| Name | Beschreibung |
| - | -
| ``id`` | Kuzer Name vom Eintrag, dieser kann zum Beispiel ``switch``, ``server``, ``router``,... 
| ``title`` | Name, welcher für den Benutzer lesbar sein soll und in seiner Landessprache sein kann.
| ``svg`` | Markup für die SVGs, mit der css ``class`` -> ``net-svg-icon`` und ``switch-icon``. Dies erlaubt das zentrale editiren via css.

Die Icons werden noch in folgende funktionsgruppen aufgeteilt
| Icon Gruppierung | Beinhaltete Objekte |
| - | -
| Hardware/devices | server, switch, router, firewall, NAS, VM, laptop, PC, printer, scanner, IoT device, container
| Network Konzept | WLAN, cloud, internet, home/LAN, service
| Status | online, offline, DHCP, warning, unknown
| UI Objekte | edit, delete (trash), close, save, search, logout (power), password (key), ping (bolt), info