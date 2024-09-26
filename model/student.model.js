const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    countryCode: {
        type: String,
        default: '91'
    },
    phone: {
        type: String,
    },
    campusId: {
        type: String,
        default: null
    },
    guardianDetails: {
        fatherName: {
            type: String,
        },
        fatherOccupation: {
            type: String
        },
        motherName: {
            type: String
        },
        motherOccupation: {
            type: String
        },
    },
    image: {
        type: String,
        default: null,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
    },
}, { timestamps: true });

const Student = mongoose.model('user', userSchema);

module.exports = Student;