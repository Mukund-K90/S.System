const Student = require("../model/student.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Insert Student
async function studentRegister(req, res) {
    const student = await Student.findOne({ email: req.body.email });
    if (student) {
        return res.status(400).send("student already exists. Please sign in.");
    } else {
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

            const student = new Student({
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
            });

            await student.save();
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student Registration Successfully",
                data: student
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
async function studentUpdate(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
        return res.status(400).send(`student Not found. Please check and try again`);
    }
    else {
        try {
            const student = await Student.findOneAndUpdate({ _id: id }, req.body, { new: true });
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student Updated Successfully",
                data: student
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }

}

//View
async function studentView(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
        return res.status(400).send(`student Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student Fetched Successfully",
                data: student
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }

}

//Search Student
async function studentFetch(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const { firstName, lastName, email, phone } = req.query;
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
    if (phone) {
        query.phone = { $regex: phone, $options: 'i' };
    }
    if (Object.keys(query).length === 0) {
        const student = await Student.find().sort({ createdAt: -1 });
        if (!student || student.length === 0) {
            return res.status(400).send(`students Not found. Please check and try again`);
        }
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: `Student List fetched Successfully`,
                data: student
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    }

    else {
        const student = await Student.find(query).sort({ createdAt: -1 });
        if (!student || student.length === 0) {
            return res.status(400).send(`student Not found matching the criteria.`);
        }
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: `Student Searched Successfully`,
                data: student
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }

}

//Delete
async function studentDelete(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const id = req.params.id;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
        return res.status(400).send(`student Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student Deleted Successfully",
                data: student
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
    studentRegister,
    studentUpdate,
    studentView,
    studentFetch,
    studentDelete
}