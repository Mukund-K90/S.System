const Campus = require("../model/campus.model");

//findBy Email
module.exports.findByEmail = async (email) => {
    try {
        return await Campus.findOne({ email });
    } catch (error) {
        throw error;
    }
}

//findBy Id
module.exports.findById = async (id) => {
    try {
        return await Campus.findById(id);
    } catch (error) {
        throw error;
    }
}

//insert Campus
module.exports.insert = async (campusData) => {
    try {
        const campus = new Campus(campusData);
        const savedCampus = await campus.save();
        return savedCampus;
    } catch (error) {
        throw error;
    }
}

//update campus
module.exports.update = async (id, updateData) => {
    try {
        const updatedCampus = await Campus.findByIdAndUpdate(id, updateData, { new: true, select: 'updatedAt' });
        updatedCampus.save();
        return updatedCampus;
    } catch (error) {
        throw error;
    }
}

//fetch all 
module.exports.fetch = async () => {
    try {
        return await Campus.find().sort({ createdAt: -1 }).where({ isDelete: false });;
    } catch (error) {
        throw error;
    }
}

//findBy Id
module.exports.delete = async (id) => {
    try {
        const deletedCampus = await Campus.findByIdAndUpdate(
            id,
            { isDelete: true },
            { new: true, select: 'updatedAt' }
        );
        return deletedCampus;
    } catch (error) {
        throw error;
    }
}

//hard delete
module.exports.hardDelete = async (email) => {
    try {
        return await Campus.findOneAndDelete({ email });
    } catch (error) {
        throw error;
    }
}