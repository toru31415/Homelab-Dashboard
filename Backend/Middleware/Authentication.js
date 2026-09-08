const jwt = require('jsonwebtoken');

function requireAuth(req, res, next){
    const header = req.get('Authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;

    if (!token){
        return res.status(401).json({error: 'Nicht angemeldet.'});
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.sub;
        req.username = payload.username;
        next();
    } catch {
        return res.status(401).json({error: 'Ungültiger oder abgelaufener Token.'});
    }
}

module.exports = requireAuth