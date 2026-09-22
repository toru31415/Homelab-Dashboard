FROM node:20-alpine

# Ist für den Ping befehl (iputils).
RUN apk add --no-cache iputils
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

EXPOSE 5000
CMD [ "node","server.js" ]
