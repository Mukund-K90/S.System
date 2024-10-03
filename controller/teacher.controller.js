const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../model/Teacher.model');

//Insert Student
async function teacherRegister(req, res) {
    const teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher && teacher.isDelete === false) {
        return res.status(400).send("teacher already exists. Please sign in.");
    } else {
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

            const teacher = new Teacher({
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
            });

            await teacher.save();
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher Registration Successfully",
                data: teacher
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    }
}

//Update
async function teacherUpdate(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Teacher.findById(decodeToken.userId);
    const id = req.params.id;
    const updateData = req.body;
    const teacher = await Teacher.findById(id);
    if (!teacher || teacher.isDelete === true) {
        return res.status(400).send(`Teacher Not found. Please check and try again`);
    }
    else {
        try {
            const updatedTeacher = await Teacher.findByIdAndUpdate(
                id,
                updateData,
                { new: true, select: 'updatedAt' }
            );
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher Updated Successfully",
                data: {
                    _id: updatedTeacher._id,
                    updatedAt: updatedTeacher.updatedAt,
                }
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }
}

// //View
async function teacherView(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const id = req.params.id;
    const teacher = await Teacher.findById(id);
    if (!teacher || teacher.isDelete === true) {
        return res.status(400).send(`teacher Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher Fetched Successfully",
                data: {
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
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }

}

// //List Teacher
async function teachersFetch(req, res) {

    try {
        const teachers = await Teacher.find().sort({ createdAt: -1 }).where({ isDelete: false });
        if (!teachers || teachers.length === 0) {
            return res.status(404).send("No teachers found !");
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
        return res.status(200).send({
            code: 200,
            success: true,
            message: "Teacher Fetched successfully.",
            data: formattedTeachers
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }

}

// //Delete
async function teacherDelete(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const id = req.params.id;
    const teacher = await Teacher.findByIdAndUpdate(
        id,
        { isDelete: true },
        { new: true, select: 'updatedAt' }
    ); if (!teacher || teacher.isDelete === true) {
        return res.status(400).send(`teacher Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher Deleted Successfully",
                data: {
                    id: id
                }
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }

}

module.exports = {
    teacherRegister,
    teacherUpdate,
    teacherView,
    teachersFetch,
    teacherDelete
}