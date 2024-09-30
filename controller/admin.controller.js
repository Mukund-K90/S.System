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
                admin.token = token;
                admin.save();
                const savedToken = new Token({
                    userId: admin._id,
                    token: token,
                });
                savedToken.save();
                // console.log(res.status(200).send({
                //     code: 200,
                //     success: true,
                //     message: "Login in successfully",
                //     data: admin,
                //     token: token
                // }));
                return res.cookie("admin_access", token, {
                    httpOnly: true,
                }).status(200)
                    .json({ message: "Logged in successfully", token: token });
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
        const token = req.cookies.admin_access;
        if (!token) {
            return res.status(400).json({ message: "Invalid token, Logout Failed" });
        }
        res.clearCookie("admin_access")
            .status(200)
            .json({ message: "Successfully logged out" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred during logout" });
    }
}


module.exports = {
    adminLogin,
    adminLogOut
}