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
                password
            } = req.body;

            const { fatherName, fatherOccupation, motherName, motherOccupation } = guardianDetails;

            const hashedPassword = await bcrypt.hash(password, 10);
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
                password: hashedPassword
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

//List
async function studentList(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const student = await Student.find();
    if (!student) {
        return res.status(400).send(`student Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student List Fetched Successfully",
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
async function studentSearch(req, res) {
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
    if (Object.keys(query).length===0) {
        return res.status(400).send("At least one search parameter is required.");
    }
    const user = await Student.find(query);
    if (!user) {
        return res.status(400).send(`User Not found. Please check and try again`);
    }
    if (user.length === 0) {
        return res.status(404).send("No students found matching the criteria.");
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: `Student Searched Successfully`,
                data: user
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
    studentList,
    studentSearch,
    studentDelete
}