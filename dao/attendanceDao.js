const Attendance = require("../model/attendance.model");

//add attendance
module.exports.insert = async (attendanceData) => {
    try {
        const attendance = new Attendance(attendanceData);
        await attendance.save();
        return attendance;
    } catch (error) {
        throw error;
    }
}

//update
module.exports.update = async (studentId, formattedDate, updateData) => {
    try {
        const attendanceRecord = await Attendance.findOneAndUpdate(
            { studentId: studentId, date: formattedDate },
            updateData,
            { new: true, select: 'updatedAt' }
        );
        return attendanceRecord;
    } catch (error) {
        throw error;
    }
}

//fetch all attendance
module.exports.allAttendance = async (studentId) => {
    try {
        return await Attendance.find({ studentId: studentId });
    } catch (error) {
        throw error;
    }
}

//attendance list
module.exports.attendanceList = async (date) => {
    try {
        return await Attendance.find({
            date: { $regex: regex },
            isDelete: false
        }).sort({ createdAt: 1 });
    } catch (error) {
        throw error;
    }
}

//delete
module.exports.delete = async (studentId, formattedDate, updateData) => {
    try {
        const attendanceRecord = await Attendance.findOneAndUpdate(
            { studentId: studentId, date: formattedDate },
            { isDelete: true },
            { new: true, select: 'updatedAt' }
        );
        return attendanceRecord;
    } catch (error) {
        throw error;
    }
}