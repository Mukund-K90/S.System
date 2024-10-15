const Teacher = require("../model/Teacher.model");

//findBy Email
module.exports.findByEmail = async (email) => {
    try {
        return await Teacher.findOne({ email });
    } catch (error) {
        throw error;
    }
}

//findBy Id
module.exports.findById = async (id) => {
    try {
        return await Teacher.findById(id);
    } catch (error) {
        throw error;
    }
}

//insert Teacher
module.exports.insert = async (teacherData) => {
    try {
        const savedTeacher = new Teacher(teacherData);
        await savedTeacher.save();
        return savedTeacher;
    } catch (error) {
        throw error;
    }
}

//update student
module.exports.update = async (id, updateData) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true, select: 'updatedAt' });
        updatedTeacher.save();
        return updatedTeacher;
    } catch (error) {
        throw error;
    }
}

//fetch all 
module.exports.fetch = async () => {
    try {
        return await Teacher.find().sort({ createdAt: -1 }).where({ isDelete: false });;
    } catch (error) {
        throw error;
    }
}

//findBy Id
module.exports.delete = async (id) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndUpdate(
            id,
            { isDelete: true },
            { new: true, select: 'updatedAt' }
        );
        return deletedTeacher;
    } catch (error) {
        throw error;
    }
}

//hard delete
module.exports.hardDelete = async (email) => {
    try {
        return await Teacher.findOneAndDelete({ email });
    } catch (error) {
        throw error;
    }
}