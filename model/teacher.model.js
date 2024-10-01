const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    countryCode: {
        type: String,
        default: '91',
    },
    phone: {
        type: String,
    },
    campusId: {
        type: String,
        default: null
    },
    qualification: {
        type: String,
    },
    specialization: {
        type: String,
    },
    dob: {
        type: String,
    },
    dateOfJoining: {
        type: String,
        default:Date.now()
    },
    image: {
        type: String,
        default: null,
    },
}, { timestamps: true });

const Teacher = mongoose.model('teacher', teacherSchema);

module.exports = Teacher;