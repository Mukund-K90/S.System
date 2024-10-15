const Admin = require("../model/admin.model")

module.exports.findAdminByEmail = async (email)=>{
    try {
        return await Admin.findOne({ email });
    } catch (error) {
        throw error;
    }
}