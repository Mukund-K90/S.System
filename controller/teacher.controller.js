const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../model/teacher.model');
const { errorResponse, successResponse } = require('../utils/apiResponse');
const teacherDao = require('../dao/teacherDaos');

//Insert Student
async function insertTeacher(req, res) {
    try {
        const {
            firstName,
            lastName,
            email,
            countryCode,
            phone,
            campusId,
            qualification,
            specialization,
            dob,
            dateOfJoining,
        } = req.body;
        const teacher = await teacherDao.findByEmail(email);
        if (teacher && !teacher.isDelete) {
            return errorResponse(req, res, 400, "Teacher already exists.");
        }
        if (teacher && teacher.isDelete) {
            await teacherDao.hardDelete(email);
        }
        const teacherData = {
            firstName,
            lastName,
            email,
            countryCode: `+${countryCode}`,
            phone,
            campusId,
            qualification,
            specialization,
            dob,
            dateOfJoining,
        };
        const newTeacher = await teacherDao.insert(teacherData);
        if (!newTeacher) {
            return errorResponse(req, res, 500, "teacher not inserted");
        }
        return successResponse(req, res, 200, "Teacher added successfully.");
    } catch (error) {
        return errorResponse(req, res, 500, error.message);
    }
}

//Update
async function updateTeacher(req, res) {
    try {
        const { id, ...updatedData } = req.body;
        const teacher = await Teacher.findById(id);
        if (!teacher || teacher.isDelete) {
            return res.status(400).send(`Teacher Not found. Please check and try again`);
        }
        const updatedTeacher = await teacherDao.update(id, updatedData);
        if (!updatedTeacher) {
            return errorResponse(req, res, 500, "Teacher not updated");
        }
        return successResponse(req, res, 200, "Teacher Updated Successfully");
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// //View
async function viewTeacher(req, res) {
    try {
        const id = req.body.id;
        const teacher = await teacherDao.findById(id);
        if (!teacher || teacher.isDelete) {
            return errorResponse(req, res, 401, "teacher Not found. Please check and try again");
        }
        const data = {
            id: teacher._id,
            name: `${teacher.firstName} ${teacher.lastName}`,
            dob: teacher.dob,
            email: teacher.email,
            mobile: `${teacher.countryCode}${teacher.phone}`,
            qualification: teacher.qualification,
            specialization: teacher.specialization,
            address: teacher.address,
            dateOfJoining: teacher.dateOfJoining,
        }
        return successResponse(req, res, 200, "Teacher Fetched Successfully", data);
    } catch (error) {
        errorResponse(req, res, error.message);
    }
}

// //List Teacher
async function fetchTeachers(req, res) {
    try {
        const teachers = await teacherDao.fetch();
        if (!teachers || teachers.length === 0) {
            return errorResponse(req, res, 401, "No teachers found !");
        }
        const formattedTeachers = teachers.map(teacher => ({
            id: teacher._id,
            name: `${teacher.firstName} ${teacher.lastName}`,
            dob: teacher.dob,
            email: teacher.email,
            mobile: `${teacher.countryCode}${teacher.phone}`,
            qualification: teacher.qualification,
            specialization: teacher.specialization,
            address: teacher.address,
        }));
        return successResponse(req, res, 200, "Teacher list Fetched successfully.", formattedTeachers);
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

// //Delete
async function deleteTeacher(req, res) {
    try {
        const id = req.body.id;
        const teacher = await teacherDao.findById(id);
        if (!teacher || teacher.isDelete) {
            return errorResponse(req, res, 401, "teacher Not found. Please check and try again");
        }
        const deletedTeacher = await teacherDao.delete(id);
        return successResponse(req, res, 200, "Teacher Deleted Successfully", deletedTeacher);
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

module.exports = {
    insertTeacher,
    updateTeacher,
    viewTeacher,
    fetchTeachers,
    deleteTeacher
}