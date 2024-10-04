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
        principalName: {
            type: String
        },
        number: {
            type: String
        },
        principalEmail: {
            type: String
        }
    },
    affiliation: {
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
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

campusSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const Campus = mongoose.model('Campus', campusSchema);

module.exports = Campus;
