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
    },
    image: {
        type: String,
        default: null,
    },
    isDelete:{
        type: Boolean,
        default: false, 
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

teacherSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

teacherSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const Teacher = mongoose.model('Teachers', teacherSchema);

module.exports = Teacher;