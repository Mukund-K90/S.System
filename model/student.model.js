const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
        default: '+91'
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
    isDelete: {
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

studentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

studentSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});
const Student = mongoose.model('Students', studentSchema);

module.exports = Student;