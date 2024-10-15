const Student = require("../model/student.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require("../utils/apiResponse");
const studentDao = require("../dao/studentDao");


//insert
async function insertStudent(req, res) {
    try {
        const {
            firstName,
            lastName,
            dob,
            gender,
            email,
            countryCode,
            phone,
            guardianDetails,
            address,
        } = req.body;

        const { fatherName, fatherOccupation, motherName, motherOccupation } = guardianDetails;

        const student = await studentDao.findByEmail(email);

        if (student && !student.isDelete) {
            return successResponse(req, res, 409, "Student already exists.");
        }

        if (student && student.isDelete) {
            await studentDao.hardDelete({ email: email });
        }
        const userData = {
            firstName,
            lastName,
            dob,
            gender,
            email,
            countryCode,
            phone,
            guardianDetails: {
                fatherName,
                fatherOccupation,
                motherName,
                motherOccupation,
            },
            address,
        };
        const newStudent = await studentDao.insert(userData);
        if (!newStudent) {
            return errorResponse(req, res, 500, "student not inserted");
        }
        return successResponse(req, res, 200, "Student added successfully.");
    } catch (error) {
        console.error(error);
        return errorResponse(req, res, 500, error.message);
    }
}

//Update
async function updateStudent(req, res) {
    try {
        const { id, ...updatedData } = req.body;

        const student = await studentDao.findById(id);
        if (!student || student.isDelete) {
            return errorResponse(req, res, 401, "student Not found. Please check and try again");
        }
        const updatedStudent = await studentDao.update(id, updatedData);
        if (!updatedStudent) {
            return errorResponse(req, res, 500, "student not updated");
        }
        return successResponse(req, res, 200, "Student Updated Successfully");
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

//View
async function viewStudent(req, res) {
    try {
        const id = req.body.id;
        const student = await studentDao.findById(id);
        if (!student || student.isDelete) {
            return successResponse(req, res, 401, "student Not found. Please check and try again");
        }
        const data = {
            id: student._id,
            name: `${student.firstName} ${student.lastName}`,
            dob: student.dob,
            gender: student.gender,
            email: student.email,
            mobile: `${student.countryCode}${student.phone}`,
            address: student.address,
            guardianDetails: student.guardianDetails
        }
        return successResponse(req, res, 200, "Student Fetched Successfully", data);
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

//Fecth Student
async function fetchStudents(req, res) {
    const student = await studentDao.fetch();
    if (!student || student.length === 0 || student.isDelete) {
        return errorResponse(req, res, 401, "students Not found. Please check and try again");
    }
    const formattedStudents = student.map(s => ({
        id: s._id,
        name: `${s.firstName} ${s.lastName}`,
        dob: s.dob,
        gender: s.gender,
        email: s.email,
        mobile: `${s.countryCode}${s.phone}`,
        address: s.address,
    }));
    try {
        return successResponse(req, res, 200, "Student Fetched Successfully", formattedStudents);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

//Delete
async function deleteStudent(req, res) {
    try {
        const id = req.body.id;
        const student = await studentDao.findById(id);
        if (!student || student.isDelete) {
            return res.status(400).send(`student Not found. Please check and try again`);
        }
        const deletedStudent = await studentDao.delete(id);
        return successResponse(req, res, 200, "Student Deleted Successfully", deletedStudent);
    } catch (error) {
        errorResponse(req, res, error.message);
    }
}

module.exports = {
    insertStudent,
    updateStudent,
    viewStudent,
    fetchStudents,
    deleteStudent
}