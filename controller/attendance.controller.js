const Attendance = require("../model/attendance.model");
const Student = require("../model/student.model");
const Teacher = require("../model/Teacher.model");
const { format, parse, isBefore } = require('date-fns');
const moment = require('moment')

const date = format(new Date(), 'dd-MMM-yyyy hh:mm a')


//insert
async function insertAttendance(req, res) {
    const { studentId,
        teacherId,
        status,
        remarks
    } = req.body;
    try {
        const student = await Student.findById(studentId);
        const teacher = await Teacher.findById(teacherId);
        if (!student || student.isDelete === true) {
            return res.status(400).send(`student Not found. Please check and try again`);
        }
        if (!teacher || teacher.isDelete === true) {
            return res.status(400).send(`teacher Not found. Please check and try again`);
        }
        const attendance = new Attendance({
            studentId,
            teacherId,
            status,
            remarks,
            date: date
        });
        await attendance.save();
        return res.status(201).send({
            success: true,
            message: 'Attendance record insrted successfully.',
            data: {
                id: attendance._id,
                studentId: studentId,
                teacherId: teacherId
            },
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Insert Attendance record failed.',
            error: error.message,
        });
    }
}

//update
async function updateAttendance(req, res) {
    const { studentId, date, status, remarks } = req.body;

    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
        return res.status(404).send("Student not found.");
    }
    const providedDate = parse(date, 'dd-MMM-yyyy hh:mm a', new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    if (isBefore(providedDate, today)) {
        return res.status(400).send("Date cannot be in the future.");
    }
    try {
        const updateData = {
            status,
            remarks: remarks || undefined,
            updatedAt: Date.now()
        };
        const formattedDate = format(providedDate, 'dd-MMM-yyyy hh:mm a');
        const attendanceRecord = await Attendance.findOneAndUpdate(
            { studentId: studentId, date: formattedDate },
            updateData,
            { new: true }
        );
        if (!attendanceRecord) {
            return res.status(404).send("Attendance record not found for the provided date.");
        }
        return res.status(200).send({
            code: 200,
            success: true,
            message: "Attendance updated successfully.",
            data: attendanceRecord
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

//view
async function viewAttendance(req, res) {
    const studentId = req.body.studentId;
    try {
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(401).send({ message: "student not found ! check and try again" });
        }
        const allAttendance = await Attendance.find({ studentId: studentId });
        if (!allAttendance) {
            return res.status(401).send({ message: "no attendance found for this student" });
        }
        else {
            const formattedattendance = allAttendance.map(attendance => ({
                id: attendance._id,
                teacherId: attendance.teacherId,
                status: attendance.status,
                remarks: attendance.remarks,
                date: attendance.date
            }));
            return res.status(201).send({
                success: true,
                message: 'Attendance record',
                data: formattedattendance
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message,
        });
    }

}

//list
async function listAttendance(req, res) {
    const date = req.body.date;
    try {
        const regex = new RegExp(date);
        const allAttendance = await Attendance.find({
            date: { $regex: regex },
            isDelete: false
        }).sort({ createdAt: 1 });

        if (!allAttendance || allAttendance.length === 0) {
            return res.status(401).send({ message: "no attendance found! check and try again" });
        }
        else {
            const formattedattendance = allAttendance.map(attendance => ({
                id: attendance._id,
                studentId: attendance.studentId,
                teacherId: attendance.teacherId,
                status: attendance.status,
                remarks: attendance.remarks,
                date: attendance.date
            }));
            return res.status(201).send({
                success: true,
                message: `Attendance record for ${date}`,
                data: formattedattendance
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message,
        });
    }
}

//delete
async function deleteAttendance(req, res) {
    const { studentId, date } = req.body;
    try {
        const studentExists = await Student.findById(studentId);
        if (!studentExists) {
            return res.status(404).send("Student not found.");
        }
        const regex = new RegExp(date);
        const attendanceRecord = await Attendance.findOneAndDelete(
            { studentId: studentId, date: { $regex: regex } },
        );
        if (!attendanceRecord) {
            return res.status(404).send("Attendance record not found for the provided date.");
        }
        else {
            return res.status(201).send({
                success: true,
                message: 'Attendance record',
                data: attendanceRecord
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            error: error.message,
        });
    }

}
module.exports = {
    insertAttendance,
    updateAttendance,
    viewAttendance,
    listAttendance,
    deleteAttendance
}