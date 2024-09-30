const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../model/Teacher.model');

//Insert Student
async function teacherRegister(req, res) {
    const teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
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
                password
            } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);
            const teacher = new Teacher({
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
                password: hashedPassword
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
    const teacher = await Teacher.findById(id);
    if (!teacher) {
        return res.status(400).send(`teacher Not found. Please check and try again`);
    }
    else {
        try {
            const teacher = await Teacher.findOneAndUpdate({ _id: id }, req.body, { new: true });
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher Updated Successfully",
                data: teacher
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
    if (!teacher) {
        return res.status(400).send(`teacher Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher Fetched Successfully",
                data: teacher
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }

}

// //List
async function teacherList(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const teacher = await Teacher.find().sort({ createdAt: -1 });
    if (!teacher) {
        return res.status(400).send(`teacher Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher List Fetched Successfully",
                data: teacher
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }

}

// //Search Teacher
async function teacherSearch(req, res) {
    const { firstName, lastName, email, specialization } = req.query;
    const query = {};
    if (firstName) {
        query.firstName = { $regex: firstName, $options: 'i' };
    }
    if (lastName) {
        query.lastName = { $regex: lastName, $options: 'i' };
    }
    if (email) {
        query.email = { $regex: email, $options: 'i' };
    }
    if (specialization) {
        query.specialization = { $regex: specialization, $options: 'i' };
    }

    if (Object.keys(query).length === 0) {
        return res.status(400).send("At least one search parameter is required.");
    }

    try {
        const teachers = await Teacher.find(query).sort({ createdAt: -1 });

        if (teachers.length === 0) {
            return res.status(404).send("No teachers found matching the criteria.");
        }

        return res.status(200).send({
            code: 200,
            success: true,
            message: "Teacher searched successfully.",
            data: teachers
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
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
        return res.status(400).send(`teacher Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Teacher Deleted Successfully",
                data: teacher
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
    teacherList,
    teacherSearch,
    teacherDelete
}