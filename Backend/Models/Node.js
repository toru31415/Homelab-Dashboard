const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        name: {type: String, default: ''},
        status: {type: String, enum: ['up', 'down'], default: 'up'},
    },
    {_id: false}
);

const nodeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        ip: {type: String, default: ''},
        type: {type: String, enum: ['physical', 'vm', 'container', 'network', 'storage', 'other'], default: 'physical'},
        status: {type: String, enum: ['online', 'dhcp', 'offline', 'warning', 'unknown'], default: 'unknown'},
        desc: {type: String, default: ''},
        cpu: {type: String, default: ''},
        ram: {type: String, default: ''},
        disk: {type: String, default: ''},
        os: {type: String, default: ''},
        icon: {type: String, default: 'server'},
        services: {type: [serviceSchema], default: []},

        // Zugriff
        domain: {type: String, default: ''},
        port: {type: String, default: ''},
        path: {type: String, default: ''},
        protocol: {type: String,enum: ['http', 'https'], default: 'http'},
        linkEnabled: {type: Boolean, default: true},
        ipMode: {type: String, enum:['static', 'dhcp'], default: 'static'},

        // Verschachtelte Zuordnung im Hardware-Dashboard
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', default: null },
        showOnDashboard: {type: Boolean, default: false},
        
        // Ping-Status
        latency: {type: Number, default: null},
        lastCheck: {type: Date, default: null},

        // Ansicht, dass Admin den Node angelegt hat.
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Node', nodeSchema);