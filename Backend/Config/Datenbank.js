const mongoose = require('mongoose');

async function connectDB() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/homelab';

    try {
        await mongoose.connect(uri);
        console.log(` MongoDB verbunden: ${uri}`);
    } catch (error) {
        console.error(` MongoDB-Verbindung fehlgeschlagen:`, error.message);
        process.exit(1);
    }
}

module.exports = connectDB

