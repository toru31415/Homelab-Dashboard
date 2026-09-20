# Dashboard.jsx
_Homelab-Dashboard/Frontend/src/Pages/Dashboard.jsx_

## Zusammenfassung
Die Datei ``Dashboard.jsx`` ist die Hauptseite, wo alle Fäden zusammenlaufen.

## Details
| Aufgabe | Beschreibung |
| - | -
| Laden der Daten | Mithilfe von ``loadNodes()`` werden alle Objekte per API ``GET`` ``/nodes``. 
| Status | Enthält die Rohdaten der ``nodes`` list und den UI Stadien.
| Filter pipeline | ``base``: filtern der Nodes vom aktiven tab, zum Beispiel, ob es Hardware (``isHardware``) ist oder nicht. // ``list``: ``base`` nach weiteren Kriterien filtern wie ``name``, ``ip``, usw. //  ``countLabel``:  Erstellt die "X / Y Hardware - Z total" Zähler wlche in der Toolbar angezeigt wird.
| CRUD handlers | ``handleSave``: erstellen oder ändern einer node via ``POST``/``PUT`` mit toast, schliessen vom modal und neuladen // ``handleDelete``: Bestätigung via browser ``confirm()`` mit löschen und neuladen. // ``handlePing``: Pingen einer node und zeigt online/offline toast mit einem neuladen. // ``handlePingAll``: Pingen aller nodes und neuladen
| Rendering | Setzt ``Header``,``Tabs``,``Toolbar``, ``grid`` der ``NodeCard``s und den bedingten modals.