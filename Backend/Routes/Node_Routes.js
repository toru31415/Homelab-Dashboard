const express = require('express');
const Node = require('../Models/Node');
const {pingHost} = require('../Utils/Ping');
const router = express.Router();

// Hilfsfunktion: fängt insbesondere ungültige ObjectId-Strings (z.B. "undefined")
// ab und wandelt sie in ein sauberes 404 statt in einen unbehandelten Fehler um,
// der den ganzen Server-Prozess crashen kann.
function handleNodeError(res, error) {
    if (error.name === 'CastError') {
        return res.status(404).json({error: 'Node nicht gefunden.'});
    }
    return res.status(400).json({error: error.message});
}

//GET /api/nodes (alle)
router.get('/', async (req, res) => {
    try {
        const nodes = await Node.find().sort({createdAt: 1});
        res.json(nodes);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//GET /api/nodes/:id (einzelne Nodes)
router.get('/:id', async (req, res) => {
    try {
        const node = await Node.findById(req.params.id);
        if (!node) return res.status(404).json({error: 'Node nicht gefunden.'});
        res.json(node);
    } catch (error) {
        handleNodeError(res, error);
    }
});

// POST /api/nodes/ (node anlegen)
router.post('/', async (req, res) => {
    try {
        const node = await Node.create(req.body);
        res.status(201).json(node);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const node = await Node.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!node) return res.status(404).json({error: 'Node nicht gefunden.'});
        res.json(node);
    } catch (error) {
        handleNodeError(res, error);
    }
});

// DELETE /api/nodes/:id (node löschen)
router.delete('/:id', async (req, res) => {
    try {
        const node = await Node.findByIdAndDelete(req.params.id);
        if (!node) return res.status(404).json({error: 'Node nicht gefunden.'});
        res.json({ok: true});
    } catch (error) {
        handleNodeError(res, error);
    }
});

//POST /api/nodes/:id/ping (Nodes anpingen)
router.post('/:id/ping', async (req, res) => {
    try {
        const node = await Node.findById(req.params.id);
        if (!node) return res.status(404).json({error: 'Node kann nicht gefunden werden.'});
        if (!node.ip) return res.status(400).json({error: 'Keine IP Konfiguriert'});

        const result = await pingHost(node.ip);
        node.status = result.online ? 'online' : 'offline';
        node.latency = result.latency;
        node.lastCheck = new Date();
        await node.save();
        res.json({...result, status: node.status, lastCheck: node.lastCheck});
    } catch (error) {
        handleNodeError(res, error);
    }
});

// POST /api/nodes/ping-all (alle nodes pingen)
router.post('/ping-all', async (req, res) => {
    try {
        const nodes = await Node.find({ip: {$ne: ''}});
        const results = {};

        await Promise.all(
            nodes.map(async (node) => {
                const n = await pingHost(node.ip);
                node.status = n.online ? 'online' : 'offline';
                node.latency = n.latency;
                node.lastCheck = new Date();
                await node.save();
                results[node._id] = {...n, status: node.status, lastCheck: node.lastCheck};
            })
        );
        res.json(results);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;