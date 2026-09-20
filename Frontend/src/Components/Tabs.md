# Tabs.jsx
_Homelab-Dashboard/Frontend/src/Components/Tabs.jsx_

## Zusammenfassung
Die Datei ``Tabs.jsx`` ist die Tab-Bar für das Wechseln, zwischen den drei Kategorien.
Basierend auf ``React UI components``

## Details

| Wert | Zweck
| - | - 
| ``tabs`` | lists-Objekt mit ``hardware``, ``vm`` und ``container``
| ``Tabs`` | Erstellt per ``tab`` einen Knopf, mit seinem Icon unter Verwendung der Shared Icons
| ``active`` | CSS-Klasse ``active`` für aktuellen Tab setzen
| Tab anklicken | Auführen von ``onChange(t.id)``