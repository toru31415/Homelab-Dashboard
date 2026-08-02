## API

### Allgemeiner Status
Einfache Kontrolle, ob die API erreichbar ist.

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``GET``   | ``/api/health``  | Nein            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| Keine | Keine |       |


**Beispiel**
```json
{

}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Alles okay |  ``{ "ok": true }``

- - -

### Benutzer Login
Anmeldung für JSON Web Token. Das Resultat wird dann bei jeder nachfolgenden Anfrage mitgesendet, als Login.

**Allgemein**
- Tokens sind mit einem **JSON Web Token** (JWT) signiert und laufen in der regel nach 12 Stunden ab.
- Alle ``/api/nodes/*`` routes benötigen ein gültiges JWT, was global im ``server.js`` erzwungen wird.
- ``/api/auth/login`` ist öffentlich erreichbar.

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``POST``   | ``/api/auth/login``  | Nein            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| ``username`` | String | Yes      |
| ``password`` | String | Yes      |

**Beispiel**
```json
{
    "username": "admin",
    "password": "password"
}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Alles okay, **JSON Web Token** (JWT) wird retourniert |  ``{ "ok": true, "token": "<jwt>", "username": "admin" }``
| 400  | Bad Request  | Etwas mit der Anfrage ist vermutlich falsch     | 
| 401  | Unauthorized | Benutzername oder Kennwort ist falsch           | 


- - -

### Login Token kontrollieren
Kontrollieren, ob das JSON Web Token noch gültig ist.

**Endpoint**
| Method     | Path             | Auth nötig
| ---------- | ---------------- | ----------
| ``GET``   | ``/api/auth/me`` | Ja

**Parameter**
| Value    | Type   | Required
| -------- | ------ | --------
| Keine | Keine | 

**Beispiel**
```json
{

}
```

**Rückmeldung**
| Code | Message      | Beschreibung | Rückmeldung
| ---- | ------------ | ------------ | -
| 200  | OK           | Alles okay, **JSON Web Token** noch gültig | ``{ "ok": true, "username": "admin" }``
| 401  | Unauthorized | **JSON Web Token** NICHT gültig

- - -

### Kennwort ändern
Kennwort vom Benutzer ändern

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``POST``   | ``/api/auth/change-password``  | Ja            |

**Parameter**
| Value    | Type   | Required | Bemerkung
| -------- | ------ | -------- | -
| ``currentPassword`` | String | Yes      | Muss mit dem bestehenden Kennwort übereinstimmen
| ``newPassword`` | String | Yes      | Minimum 8 Zeichen lang

**Beispiel**
```json
{
    "currentPassword": "admin",
    "newPassword": "C#-macht-spass"
}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Kennwort wurde geändert |  ``{ "ok": true }``
| 400  | Bad Request  | Aktuelles Kennwort ist falsch oder das neue Kennwort zu kurz 

- - -

### Alle Endpunkte abholen
Retourniert die überwachten Endpunkte, mit dem ältisten als erster

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``GET``   | ``/api/nodes``  | Ja            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| Keine | Keine | 

**Beispiel**
```json
{

}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Retourniert ein Array mit Endpunkten | 

- - -

### Bestimmten Endpunkt abholen
Retourniert die einen bestimmten Endpunkt

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``GET``   | ``/api/nodes/:id``  | Ja            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| ``id`` | Mongo ObjectID | Ja

**Beispiel**
```json
{
    "id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Retourniert Node Object | 
| 404  | Not Found    | Kein Node Object gefunden | ``{ "error": "Node nicht gefunden." }``

- - -

### Endpunkt erstellen
Erstellt einen Endpunkt

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``POST``   | ``/api/nodes``  | Ja            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| ``name`` | String | Ja
| ``createdBy`` | String | Nein, es wird automatisch der aktuelle Benutzer verwendet

**Beispiel**
```json
{
    "name": "Synology NAS"
}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 201  | Created      | Node Objekt wurde erstellt | 
| 400  | Not Found    | Node Objekt wurde NICHT erstellt | ``{ "error": "<mongoose validation message>" }``

- - -

### Bestimmten Endpunkt anpassen
Anpassen von einem bestehenden Endpunkt

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``PUT``   | ``/api/nodes/:id``  | Ja            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| ``id`` | Mongo ObjectID | Ja
| Eigenschaft der Node | String

**Beispiel**
```json
{
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "Eigenschaft der Node": "10.10.10.10"
}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Anpassung vom Node Objekt erfolgt | 
| 400  | Bad Request  | Fehler bei der Eingabe oder Validierung |
| 404  | Not Found    | Kein Node Object gefunden | ``{ "error": "Node nicht gefunden." }``

- - -

### Bestimmten Endpunkt löschen
Löschen von einem bestehenden Endpunkt

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``DELETE``   | ``/api/nodes/:id``  | Ja            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| ``id`` | Mongo ObjectID | Ja

**Beispiel**
```json
{
    "id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Löschung vom Node Objekt erfolgt | ``{ "ok": true }``
| 404  | Not Found    | Kein Node Object gefunden | ``{ "error": "Node nicht gefunden." }``

- - -

### Bestimmten Endpunkt pingen
Anpingen von einem bestehenden Endpunkt

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``POST``   | ``/api/nodes/:id/ping``  | Ja            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| ``id`` | Mongo ObjectID | Ja

**Beispiel**
```json
{
    "id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Ping vom Node Objekt hat funktioniert | ``{ "online": true, "latency": 12.4, "status": "online", "lastCheck": "2026-07-28T10:15:00.000Z" }``
| 404  | Not Found    | Kein Node Object gefunden | ``{ "error": "Node nicht gefunden." }``
| 400  | Bad Request  | Keine IP beim Node konfiguriert | { "error": "Keine IP konfiguriert." }

**Ping vom Node Objekt hat funktioniert **
```JSON
{
    "online": true,
    "latency": 12.4,
    "status": "online",
    "lastCheck": "2026-07-28T10:15:00.000Z"
  }
```

- - -

### Alle Endpunkt pingen
Anpingen von einem bestehenden Endpunkt

**Endpoint**
| Method | Path             | Auth nötig |
| ------ | ---------------- | --------------- |
| ``POST``   | ``/api/nodes/ping-all``  | Ja            |

**Parameter**
| Value    | Type   | Required |
| -------- | ------ | -------- |
| Keine | Keine | 

**Beispiel**
```json
{

}
```

**Rückmeldung**
| Code | Message      | Beschreibung                                    | Rückmeldung
| ---- | ------------ | ----------------------------------------------- | -
| 200  | OK           | Ping vom Node Objekt hat funktioniert | ``{ "64f0c2...": { "online": true, "latency": 8.1, "status": "online", "lastCheck": "2026-07-28T10:15:00.000Z" }, "64f0c3...": { "online": false, "latency": null, "status": "offline", "lastCheck": "2026-07-28T10:15:00.000Z" } }``

**Ping vom Node Objekt hat funktioniert**
```JSON
{
  "64f0c2...": {
    "online": true,
    "latency": 8.1,
    "status": "online",
    "lastCheck": "2026-07-28T10:15:00.000Z"
  },
  "64f0c3...": {
    "online": false,
    "latency": null,
    "status": "offline",
    "lastCheck": "2026-07-28T10:15:00.000Z"
  }
}
```

- - -

### Data Models
#### Endpunkt

| Field | Type | Default | Notes |
|---|---|---|---|
| `_id` | ObjectId | — | Definiert von der MongoDB |
| `name` | string | — | **Notwendig** |
| `ip` | string | `""` | |
| `type` | enum | `"physical"` | `physical`, `vm`, `container`, `network`, `storage`, `other` |
| `status` | enum | `"unknown"` | `online`, `dhcp`, `offline`, `warn`, `unknown` |
| `desc` | string | `""` | |
| `cpu` | string | `""` | |
| `ram` | string | `""` | |
| `disk` | string | `""` | |
| `os` | string | `""` | |
| `icon` | string | `"server"` | |
| `services` | array of [Service](#service) | `[]` | |
| `domain` | string | `""` | Reverse-proxy domain |
| `port` | string | `""` | Reverse-proxy port |
| `path` | string | `""` | Reverse-proxy path |
| `protocol` | enum | `"http"` | `http`, `https` |
| `linkEnabled` | boolean | `true` | |
| `ipMode` | enum | `"static"` | `static`, `dhcp` |
| `parentId` | ObjectId \| null | `null` | Refrenzieren eines übergesetzen Endgerätes, fürs Verschachteln von VMs unter einem Host |
| `showOnDashboard` | boolean | `false` | |
| `latency` | number \| null | `null` | Gesetzt vom ping des Endgerätes |
| `lastCheck` | date \| null | `null` | Gesetzt vom ping des Endgerätes |
| `createdBy` | ObjectId | — | Info, welcher Benutzer das Endgerät erstellt hat |
| `createdAt` / `updatedAt` | date | — | Mongoose timestamps |
 
#### Service
Dienst welcher auf dem Endgerät läuft. 
Zugehörig zu `Node.services` und hat keine eigene ID
 
| Field | Type | Default |
|---|---|---|
| `name` | string | `""` |
| `status` | enum (`up`, `down`) | `"up"` |
 
#### User
Nur indirekt aufgeschlüsselt in der auth Rückmeldung.
Kennwörter sind mit bcrypt gehashed und werden niemals von der API retourniert.
