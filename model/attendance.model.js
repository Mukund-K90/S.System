const mongoose = require('mongoose');
const { format } = require('date-fns');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teachers'
    },
    status: {
        type: String,
    },
    remarks: {
        type: String,
        default: 'Nothing'
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

attendanceSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


attendanceSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});


const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
