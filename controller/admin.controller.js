const Admin = require("../model/admin.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                console.log(res.status(200).send({
                    code: 200,
                    success: true,
                    message: "Login in successfully",
                    data: admin,
                    token: token
                }));
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
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            blacklist.add(token);
        }
        res.json({ message: 'Logout successful.' });
    } catch (error) {
        res.status(400).send({ message: "Invalid token " });
    }
}

module.exports = {
    adminLogin,
    adminLogOut
}