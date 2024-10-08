const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;