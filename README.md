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
feat: – neue Funktion
fix: – Bugfix
chore: – Konfiguration/Aufräumarbeiten
docs: – Dokumentation

## Datenmodel


## API
### Get User by ID (Beispiel)

Retrieves a single user's profile information.

**Endpoint**
GET /api/v1/users/{id}
**Auth required:** Yes (Bearer token)

#### Path Parameters

| Name | Type   | Required | Description        |
|------|--------|----------|---------------------|
| id   | string | Yes      | Unique user ID      |

#### Query Parameters

| Name    | Type    | Required | Default | Description               |
|---------|---------|----------|---------|---------------------------|
| include | string  | No       | none    | Comma-separated relations to include (e.g. `orders,addresses`) |

#### Headers

| Name          | Value              | Required |
|---------------|--------------------|----------|
| Authorization | Bearer `<token>`   | Yes      |
| Content-Type  | application/json   | Yes      |

#### Request Example

```bash
curl -X GET "https://api.example.com/v1/users/123?include=orders" \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json"
```

#### Response

**200 OK**

```json
{
  "id": "123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "orders": []
}
```

**Error Responses**

| Status | Meaning       | Example body                          |
|--------|---------------|----------------------------------------|
| 401    | Unauthorized  | `{"error": "Invalid or missing token"}`|
| 404    | Not Found     | `{"error": "User not found"}`          |


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
