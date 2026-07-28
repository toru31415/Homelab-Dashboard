const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const requireAuth = require('../Middleware/Authentication');

const router = express.Router();

function signToken(user) {
    return jwt.sign(
        {sub: user._id.toString(), username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '12h'}
    );
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({error: 'Benutzername und Passwort sind erforderlich'});
    }

    const user = await User.findOne({username: String(username).toLowerCase()});
    if (!user || !(await user.verifyPassword(password))) {
        return res.status(401).json({error: 'Benutzername oder Passwort ist falsch'})
    }

    const token = signToken(user);
    res.json({ok: true, token, username: user.username});
});

//GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
    res.json({ok: true, username: req.username});
});

//POST /api/auth/change-password
router.post('/change-password', requireAuth, async (req, res) => {
    const {currentPassword, newPassword} = req.body;
    const user = await User.findById(req.userId);

    if(!user || !(await user.verifyPassword(currentPassword))) {
        return res.status(400).json({error: 'Das aktuelle Passwort ist falsch.'});
    }
    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({error: 'Das neue Passwort muss mindestens 8 Zeichen haben'});
    }

    const bcrypt = require('bcryptjs');
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ok: true});
});

module.exports = router;