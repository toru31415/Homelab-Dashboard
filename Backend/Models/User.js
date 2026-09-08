const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true, trim: true, lowercase: true},
        passwordHash: {type: String, required: true},
    },
    { timestamps: true }
);

//Passwortprüfung
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
};

// Hilfsmethode um ein User mit einem Klartext Passwort anzulegen
userSchema.statics.createWithPassword = async function (username, password) {
    const passwordHash = await bcrypt.hash(password, 12);
    return this.create({username: username.toLowerCase(), passwordHash});
};

module.exports = mongoose.model('User', userSchema);