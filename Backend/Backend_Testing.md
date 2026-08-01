## Backend-Test
### Zuerst wurde das Backend mit folgendem Befehl gebaut
docker compose up -d --build backend

### Befehle für den Test
1. Health-Check (auch im Browser möglich)
curl -i http://localhost:5000/api/health 
-> Erwartet wird ein: "200 OK, {"ok":true}"

2. Admin-User anlegen
docker compose exec backend npm run seed

3. Login (Token erstellen lassen)
curl -X POST http://localhost:5000/api/auth/login \-H "Content-Type: application/json" \-d '{"username":"Admin","password":"Homelab123"}'
-> Erwartet wird ein: 200 OK mit JSON, das ein Feld token enthält.

4. Alle Nodes abrufen
curl -i http://localhost:5000/api/nodes \ -H "Authorization: Bearer <TOKEN>"
-> Erwartet wird ein: 200 OK mit JSON-Array aller Nodes ([], falls keine Nodes vorhanden).

5. Neuen Node anlegen
curl -i -X POST http://localhost:5000/api/nodes \ -H "Authorization: Bearer <TOKEN>" \ -H "Content-Type: application/json" \ -d '{"name":"Test-Server","type":"physical","ip":"192.168.1.50"}'
-> Erwartet wird ein: 201 Created mit dem neuen Node-Objekt inkl. _id. Diese _id wird für die folgenden Befehle für die <NODE_ID> gebraucht.

6. Node bearbeiten (PUT)
curl -i -X PUT http://localhost:5000/api/nodes/<NODE_ID> \ -H "Authorization: Bearer <TOKEN>" \ -H "Content-Type: application/json" \ -d '{"name":"Test-Server-Updated","type":"physical","ip":"192.168.1.51"}'
-> Erwartet wird ein: 200 OK mit aktualisiertem Node-Objekt.

7. Einzelnen Node anpingen
curl -i -X POST http://localhost:5000/api/nodes/<NODE_ID>/ping \ -H "Authorization: Bearer <TOKEN>"
-> Erwartet wird ein: 200 OK mit {"online":false,"latency":null,"status":"offline","lastCheck":"..."}.

8. Alle Nodes anpingen
curl -i -X POST http://localhost:5000/api/nodes/ping-all \ -H "Authorization: Bearer <TOKEN>"
Erwartet wird ein: 200 OK mit einem Objekt { "<NODE_ID>": { online, latency, status, lastCheck }, ... } für jeden Node mit IP.

9. Node löschen
curl -i -X DELETE http://localhost:5000/api/nodes/<NODE_ID> \ -H "Authorization: Bearer <TOKEN>"
Erwartet wird ein: "200 OK mit {"ok":true}"

10. Kontrolle: alle Nodes nochmal erneut abrufen
curl -i http://localhost:5000/api/nodes \ -H "Authorization: Bearer <TOKEN>"
-> Erwartet wird ein leeres Array: 200 OK mit []

Die Tests waren nach ein paar Bug-fixes alle erfolgreich.