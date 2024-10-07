const Admin = require("../model/admin.model")
const bcrypt = require('bcrypt');
const { cookie } = require("express/lib/response");
const jwt = require('jsonwebtoken');
const Token = require("../model/token.model");
const blacklist = new Set();


async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(400).send({ message: "Invalid Admin. Please check & try again" });
        }
        else {
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Password Authentication failed" });
            }
            else {
                const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
                const checkToken = await Token.findOne({ userId: admin._id });
                if (!checkToken) {
                    const savedToken = new Token({
                        userId: admin._id,
                        token: token,
                    });
                    savedToken.save();
                }
                else {
                    const updateToken = await Token.findOneAndUpdate({ userId: admin._id }, { token: token }, { new: true });
                    updateToken.save();
                }
                res.status(200).send({
                    code: 200,
                    success: true,
                    message: "Login successfully",
                    token: token
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

//logout by add token in blacklist
async function adminLogOut(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Invalid token, Logout Failed" });
        }
        const checkToken = await Token.findOneAndDelete({ token: token });
        if (!checkToken) {
            return res.status(401).send({ message: "logout failed! user not logged in anymore" });
        }
        res.status(200).send({ message: "Logout Successully!" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


module.exports = {
    adminLogin,
    adminLogOut
}