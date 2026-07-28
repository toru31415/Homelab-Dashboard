require('dotenv').config();
const connectDB = require('./Config/Datenbank');
const User = require('./Models/User');

async function run() {
    await connectDB();

    const adminUsername = process.env.SEED_ADMIN_USER || 'Admin'
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Homelab123'

    const existingAdmin = await User.findOne({username: adminUsername});
    if (!existingAdmin) {
        await User.createWithPassword(adminUsername, adminPassword);
        console.log(` Admin-User erstellt: ${adminUsername} / ${adminPassword}`);
        console.log(` Achtung: Bitte das Passwort nach dem ersten Login ändern!`);
    } else {
        console.log(` Admin-User ${adminUsername} existiert bereits. Es muss kein Admin-User angelegt werden.`);
    }
    process.exit(0);
}

run().catch((error) => {
    console.error('Seed ist fehlgeschlagen:', error);
    process.exit(1);
});