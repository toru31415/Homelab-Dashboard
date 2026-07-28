require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/Datenbank');
const requireAuth = require('./Middleware/Authentication');

const authRoutes = require('./Routes/Authentication_Routes');
//const nodeRoutes = require('./Routes/Node_Routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// öffentliches Login
app.use('/api/auth', authRoutes);

//JWT-Token erforderlich
//app.use('/api/nodes', requireAuth, nodeRoutes);
app.get('/api/health', (req, res) => res.json({ok: true}));

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`\n Homelab Dashboard API`);
        console.log(` ---------------------------`);
        console.log(` Port: ${PORT}`);
        console.log(` Health: http://localhost:${PORT}/api/health\n`)
    });
});