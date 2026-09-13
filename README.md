# Homelab Dashboard 
_mit dem MERN-Stack_

## Ziel
Mit Hilfe vom MERN Stack erstellen wir ein Homelab Dashboard, um per Ping Komponenten zu überwachen und visualisieren.

## Ordner und Dateien
Nachfolgend wird die Ordnerstruktur und Dateien darin beschrieben.

```md
mern/
├── backend/                ← Node.js-Server: verwaltet Daten, prüft Login, spricht mit MongoDB
├── frontend/               ← React-App: alles, was im Browser sichtbar/klickbar ist
└── docker-compose.yml      ← startet beide + Datenbank zusammen
```

### mern/
```md
docker-compose.yml:         ← startet MongoDB + Backend + Frontend als drei Container, die sich gegenseitig finden.
```
### mern/backend/
```md
server.js:                  ← Startpunkt: hängt alle Routen zusammen, startet den Server.
config/db.js:               ← Stellt die Verbindung zu MongoDB her.
models/:                    ← Mongoose-Schemas / truktur der Datenbank-Einträge (User.js fürs Login, Node.js für Hardware/VM/Container).
routes/:                    ← Die eigentlichen API-Endpunkte: authRoutes.js (Login/Passwort), nodeRoutes.js (Anlegen/Bearbeiten/Löschen/Pingen von Einträgen).
middleware/auth.js:         ← Prüft bei jedem geschützten Request das JWT-Token.
utils/ping.js:              ← Ruft den System-ping-Befehl auf.
seed.js:                    ← Skript, das einmalig den Admin-User anlegt.
.env / .env.example:        ← Geheimnisse und Konfiguration (DB-Adresse, JWT-Secret). .env wird nie committet, .env.example zeigt nur die Struktur.
Dockerfile:                 ← Bauanleitung fürs Backend-Docker-Image.
```

### mern/frontend/
```md
src/pages/:                 ← Ganze Seiten: Login.jsx, Dashboard.jsx.
src/components/:            ← Einzelne Bausteine: Tabs, Header, Toolbar, NodeCard (die Kachel), NodeModal (das Bearbeiten-Formular), PasswordModal, InfoModal, Icon, ProtectedRoute (blockt Zugriff ohne Login).
src/context/:               ← Globaler Zustand: AuthContext (bin ich eingeloggt?), ToastContext (Benachrichtigungen).
src/api.js:                 ← Zentraler HTTP-Client, hängt automatisch das Login-Token an jeden Request.
src/nodeHelpers.js:         ← Reine Hilfsfunktionen (Status-Text, URL-Aufbau usw.).
vite.config.js:             ← Entwicklungsserver-Einstellungen, leitet /api-Aufrufe ans Backend weiter.
nginx.conf / Dockerfile:    ← Für den Produktivbetrieb: baut die React-App und liefert sie über nginx aus, nginx reicht /api ans Backend weiter.
```

## Commit-Message-Konvention
| Typ | Beschreibung
| - | -
| feat: | neue Funktion
| fix: | Bugfix
| chore: | Konfiguration/Aufräumarbeiten
| docs: | Dokumentation

## Datenmodel


## API
[API.md](API.md)
- - -

## Verbindung aufbauen
Webserver-IP-Adresse: 192.168.2.18
Username: root
Passwort: Bekannt

1. Im VS-Code ``Remote-SSH`` extension installiern.
2. Im VS-Code ``Ctrl`` + ``Shift`` + ``P`` ausführen und ``Remote-SSH: Add New SSH Host...`` eingeben.
3. ``root@192.168.2.18`` eingeben und SSH-File wählen.
5. Im VS-Code ``Ctrl`` + ``Shift`` + ``P`` ausführen und ``Remote-SSH: Connect current Windows to Host`` eingeben.
6. ``192.168.2.18`` wählen und das Passwort eingeben.
7. ``Ordner öffnen`` anklicken und folgenden Pfad öffnen: ``/opt/webseite/Homelab-Dashboard/``


# Webseite starten
 1. JWT_SECRET, SEED_ADMIN_USER und SEED_ADMIN_PASSWORD in Backend/.env eintragen
 2. cp Backend/.env.example Backend/.env
 3. docker compose up -d --build
 4. docker compose exec backend npm run seed   # legt den Admin-User an (nur beim ersten Start nötig)

Danach ist das Dashboard unter `http://localhost` bzw. `http://192.168.2.18` erreichbar.

## Stoppen / Neustarten
docker compose down            # stoppen (Daten bleiben erhalten)
docker compose up -d --build   # neu bauen und starten (z. B. nach Code-Änderungen)