# Homelab Dashboard mit dem MERN-Stack

## Ziel
Wir möchten ein Dashboard bauen welches die mögichleit bietet die kompnnenten inkl. dreen IP-ADresse und Informationen übersichtlich darzustellen.

## Aufbau und welches File ist für was
### Aufbaue der Struktur:
mern/
├── backend/    ← Node.js-Server: verwaltet Daten, prüft Login, spricht mit MongoDB
├── frontend/   ← React-App: alles, was im Browser sichtbar/klickbar ist
└── docker-compose.yml   ← startet beide + Datenbank zusammen

### Welches File ist wofür da:
docker-compose.yml:         startet MongoDB + Backend + Frontend als drei Container, die sich gegenseitig finden.

#### backend Ordner
server.js:                  Startpunkt: hängt alle Routen zusammen, startet den Server.
config/db.js:               tellt die Verbindung zu MongoDB her.
models/:                    Mongoose-Schemas / truktur der Datenbank-Einträge (User.js fürs Login, Node.js für Hardware/VM/Container).
routes/:                    die eigentlichen API-Endpunkte: authRoutes.js (Login/Passwort), nodeRoutes.js (Anlegen/Bearbeiten/Löschen/Pingen von Einträgen).
middleware/auth.js:         prüft bei jedem geschützten Request das JWT-Token.
utils/ping.js:              ruft den System-ping-Befehl auf.
seed.js:                    Skript, das einmalig den Admin-User anlegt.
.env / .env.example:        Geheimnisse und Konfiguration (DB-Adresse, JWT-Secret). .env wird nie committet, .env.example zeigt nur die Struktur.
Dockerfile:                 Bauanleitung fürs Backend-Docker-Image.

#### frontend/

src/pages/:                 ganze Seiten: Login.jsx, Dashboard.jsx.
src/components/:            einzelne Bausteine: Tabs, Header, Toolbar, NodeCard (die Kachel), NodeModal (das Bearbeiten-Formular), PasswordModal, InfoModal, Icon, ProtectedRoute (blockt Zugriff ohne Login).
src/context/:               globaler Zustand: AuthContext (bin ich eingeloggt?), ToastContext (Benachrichtigungen).
src/api.js:                 zentraler HTTP-Client, hängt automatisch das Login-Token an jeden Request.
src/nodeHelpers.js:         reine Hilfsfunktionen (Status-Text, URL-Aufbau usw.).
vite.config.js:             Entwicklungsserver-Einstellungen, leitet /api-Aufrufe ans Backend weiter.
nginx.conf / Dockerfile:    für den Produktivbetrieb: baut die React-App und liefert sie über nginx aus, nginx reicht /api ans Backend weiter.


### Verbindung aufbauen
Webserver-IP-Adresse: 192.168.2.18
Username: root
Passwort: Bekannt

1. Im VS-Code "Remote-SSH" extension installiern.
2. Im VS-Code "Ctrl + Shift + P" ausführen und "Remote-SSH: Add New SSH Host..." eingeben.
3. "root@192.168.2.18" eingeben und SSH-File wählen.
5. Im VS-Code "Ctrl + Shift + P" ausführen und "Remote-SSH: Connect current Windows to Host" eingeben.
6. "192.168.2.18" wählen und das Passwort eingeben.
7. "Ordner öffnen" anklicken und folgenden Pfad öffnen: /opt/webseite/Homelab-Dashboard/
