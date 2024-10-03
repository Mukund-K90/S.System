const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    countryCode: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    principalDetails: {
        name: {
            type: String
        },
        number: {
            type: String
        },
        email: {
            type: String
        }
    },
    affiliation: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

campusSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Campus = mongoose.model('Campus', campusSchema);

module.exports = Campus;
