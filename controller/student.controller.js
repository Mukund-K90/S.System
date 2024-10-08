const Student = require("../model/student.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function insertStudent(req, res) {
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (student && student.isDelete === false) {
            return res.status(400).send("Student already exists.");
        }
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
        if (student && student.isDelete === true) {
            const updatedStudent = await Student.findOneAndUpdate(
                { email: email },
                {
                    firstName,
                    lastName,
                    dob,
                    gender,
                    email,
                    countryCode: `+${countryCode}`,
                    phone,
                    guardianDetails: {
                        fatherName,
                        fatherOccupation,
                        motherName,
                        motherOccupation,
                    },
                    address,
                    isDelete: false,
                    updatedAt: Date.now(),
                },
                { new: true }
            );

            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student added successfully.",
                id: updatedStudent._id,
            });
        } else {
        
            const newStudent = new Student({
                firstName,
                lastName,
                dob,
                gender,
                email,
                countryCode: `+${countryCode}`,
                phone,
                guardianDetails: {
                    fatherName,
                    fatherOccupation,
                    motherName,
                    motherOccupation,
                },
                address,
            });

            await newStudent.save();
            return res.status(201).send({
                code: 201,
                success: true,
                message: "Student added successfully.",
                id: newStudent._id,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

//Update
async function updateStudent(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const id = req.body.id;
    const updateData = req.body;
    const student = await Student.findById(id);
    if (!student || student.isDelete === true) {
        return res.status(400).send(`student Not found. Please check and try again`);
    }
    else {
        try {
            const updatedStudent = await Student.findByIdAndUpdate(
                id,
                updateData,
                { new: true, select: 'updatedAt' }
            );
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student Updated Successfully",
                data: {
                    _id: updatedStudent._id,
                    updatedAt: updatedStudent.updatedAt,
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

//View
async function viewStudent(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student || student.isDelete === true) {
        return res.status(400).send(`student Not found. Please check and try again`);
    }

    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student Fetched Successfully",
                data: {
                    id: student._id,
                    name: `${student.firstName} ${student.lastName}`,
                    dob: student.dob,
                    gender: student.gender,
                    email: student.email,
                    mobile: `${student.countryCode}${student.phone}`,
                    address: student.address,
                    guardianDetails: student.guardianDetails
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

//Fecth Student
async function fetchStudents(req, res) {
    // const token = req.params.token;
    // const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await Student.findById(decodeToken.userId);
    // const { firstName, lastName, email, phone } = req.query;
    // const query = {};
    // if (firstName) {
    //     query.firstName = { $regex: firstName, $options: 'i' };
    // }
    // if (lastName) {
    //     query.lastName = { $regex: lastName, $options: 'i' };
    // }
    // if (email) {
    //     query.email = { $regex: email, $options: 'i' };
    // }
    // if (phone) {
    //     query.phone = { $regex: phone, $options: 'i' };
    // }
    // if (Object.keys(query).length === 0) {
    const student = await Student.find().sort({ createdAt: -1 }).where({ isDelete: false });
    if (!student || student.length === 0 || student.isDelete === true) {
        return res.status(400).send(`students Not found. Please check and try again`);
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
        return res.status(200).send({
            code: 200,
            success: true,
            message: `Student List fetched Successfully`,
            data: formattedStudents
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
    // }

    // else {
    //     const student = await Student.find(query).sort({ createdAt: -1 });
    //     if (!student || student.length === 0) {
    //         return res.status(400).send(`student Not found matching the criteria.`);
    //     }
    //     try {
    //         return res.status(200).send({
    //             code: 200,
    //             success: true,
    //             message: `Student Searched Successfully`,
    //             data: student
    //         })
    //     } catch (error) {
    //         res.status(500).send({
    //             success: false,
    //             message: error.message,
    //         });
    //     }

    // }

}

//Delete
async function deleteStudent(req, res) {
    const id = req.params.id;
    const student = await Student.findByIdAndUpdate(
        id,
        { isDelete: true },
        { new: true, select: 'updatedAt' }
    ); if (!student || student.isDelete === true) {
        return res.status(400).send(`student Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Student Deleted Successfully",
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
    insertStudent,
    updateStudent,
    viewStudent,
    fetchStudents,
    deleteStudent
}