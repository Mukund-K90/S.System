const Attendance = require("../model/attendance.model.js");
const Student = require("../model/student.model");
const Teacher = require("../model/teacher.model");
const { format, parse, isBefore } = require('date-fns');
const studentDao = require('../dao/studentDao.js');
const teacherDao = require('../dao/teacherDao.js');
const attendanceDao = require('../dao/attendanceDao.js');
const { successResponse, errorResponse } = require("../utils/apiResponse.js");


//insert
async function insertAttendance(req, res) {
    try {
        const { studentId,
            teacherId,
            status,
            remarks
        } = req.body;
        const student = await studentDao.findById(studentId);
        const teacher = await teacherDao.findById(teacherId);
        if (!student || student.isDelete) {
            return res.status(400).send(`student Not found. Please check and try again`);
        }
        if (!teacher || teacher.isDelete) {
            return res.status(400).send(`teacher Not found. Please check and try again`);
        }
        const date = format(new Date(), 'dd-MMM-yyyy hh:mm a')
        const attendance = {
            studentId,
            teacherId,
            status,
            remarks,
            date: date
        };
        const attendanceInsert = await attendanceDao.insert(attendance);

        if (!attendanceInsert) {
            return errorResponse(req, res, 500, "attendance not inserted");
        }
        const data = {
            id: attendanceInsert._id,
            studentId: studentId,
            teacherId: teacherId
        };

        return successResponse(req, res, 200, "Attendance record insrted successfully.", data);
    } catch (error) {
        return errorResponse(req, res, 500, error.message);
    }
}

//update
async function updateAttendance(req, res) {
    const { studentId, date, status, remarks } = req.body;

    const studentExists = await studentDao.findById(studentId);
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
        const attendanceRecord = await attendanceDao.update(studentId, formattedDate, updateData);
        if (!attendanceRecord) {
            return res.status(404).send("Attendance record not found for the provided date.");
        }
        return successResponse(req, res, 200, "Attendance updated successfully.", attendanceRecord);
    } catch (error) {
        return errorResponse(req, res, 500, error.message);
    }
}

//view
async function viewAttendance(req, res) {
    try {
        const studentId = req.body.studentId;

        const student = await studentDao.findById(studentId);

        if (!student) {
            return res.status(401).send({ message: "student not found ! check and try again" });
        }
        const allAttendance = await attendanceDao.allAttendance(studentId);
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
            return successResponse(req, res, 200, "all attendance record view successfully", formattedattendance);
        }
    } catch (error) {
        return errorResponse(req, res, 500, error.message);
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
            return successResponse(req, res, 200, `Attendance record for ${date}`, formattedattendance);
        }
    } catch (error) {
        return errorResponse(req, res, 500, error.message);
    }
}

//delete
async function deleteAttendance(req, res) {
    const { studentId, date } = req.body;
    try {
        const studentExists = await studentDao.findById(studentId);
        if (!studentExists) {
            return res.status(404).send("Student not found.");
        }
        const regex = new RegExp(date);
        const attendanceRecord = await attendanceDao.delete(studentId, date);
        if (!attendanceRecord || attendanceRecord.isDelete === true) {
            return res.status(404).send("Attendance record not found for the provided date.");
        }
        else {
            return res.status(201).send({
                success: true,
                message: 'Attendance record deleted',
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