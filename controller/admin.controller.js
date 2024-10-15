const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require("../model/token.model");
const adminDao = require('../dao/adminauthDao');
const { errorResponse, successResponse } = require('../utils/apiResponse');

//check user
async function checkUser(req, res) {
    try {
        const { email } = req.body;
        const admin = await adminDao.findAdminByEmail(email);
        if (!admin) {
            return errorResponse(req, res, 401, "Invalid user. Please check & try again");
        }
        const data = {
            id: admin._id,
            email: admin.email,
        }
        return successResponse(req, res, 200, "valid user", data);
    } catch (error) {
        errorResponse(req, res, error.message)
    }
}

//login
async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await adminDao.findAdminByEmail(email);
        if (!admin) {
            return errorResponse(req, res, 401, "Invalid Admin. Please check & try again");
        }
        else {
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return successResponse(req, res, 400, "Password Authentication failed")
            }
            else {
                const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: "2 days" });
                const checkToken = await Token.findOne({ userId: admin._id });
                if (!checkToken) {
                    const savedToken = new Token({
                        userId: admin._id,
                        token: token,
                    });
                    savedToken.save();
                }
                else {
                    const updateToken = await Token.findOneAndUpdate({ userId: admin._id }, { token }, { new: true });
                    updateToken.save();
                }
                return successResponse(req, res, 200, "Successfully logedin", token);
            }
        }
    } catch (error) {
        errorResponse(req, res, error.message)
    }
}

//logout 
async function adminLogOut(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return errorResponse(req, res, 400, "Invalid token, Logout Failed");
        }
        const checkToken = await Token.findOneAndDelete({ token: token });
        if (!checkToken) {
            return errorResponse(req, res, 400, "logout failed! user not logged in anymore");
        }
        return successResponse(req, res, "Logout Successully!");
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
}

module.exports = {
    adminLogin,
    adminLogOut,
    checkUser
}