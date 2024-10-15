const Student = require("../model/student.model");

//findBy Email
module.exports.findByEmail = async (email) => {
    try {
        return await Student.findOne({ email });
    } catch (error) {
        throw error;
    }
}

//findBy Id
module.exports.findById = async (id) => {
    try {
        return await Student.findById(id);
    } catch (error) {
        throw error;
    }
}

//insert Student
module.exports.insert = async (studentData) => {
    try {
        const student = new Student(studentData);
        const savedStudent = await student.save();
        return savedStudent;
    } catch (error) {
        throw error;
    }
}

//update student
module.exports.update = async (id, updateData) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true, select: 'updatedAt' });
        updatedStudent.save();
        return updatedStudent;
    } catch (error) {
        throw error;
    }
}

//fetch all 
module.exports.fetch = async () => {
    try {
        return await Student.find().sort({ createdAt: -1 }).where({ isDelete: false });;
    } catch (error) {
        throw error;
    }
}

//delete By Id
module.exports.delete = async (id) => {
    try {
        const deletedStudent = await Student.findByIdAndUpdate(
            id,
            { isDelete: true },
            { new: true, select: 'updatedAt' }
        );
        return deletedStudent;
    } catch (error) {
        throw error;
    }
}

//hard delete
module.exports.hardDelete = async (email) => {
    try {
        return await Student.findOneAndDelete({ email });
    } catch (error) {
        throw error;
    }
}