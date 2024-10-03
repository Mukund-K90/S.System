const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Token = require('../model/token.model');
dotenv.config();
const authentication = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication Failed" });
    }
    const checkToken = await Token.findOne({ token: token });
    if (!checkToken) {
        return res.status(401).json({ message: "Authentication Failed !" });
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodeToken.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication Failed", error: error.message });
    }
};

const authorization = (req, res, next) => {
    const token = req.cookies.admin_access;

    if (!token) {
        return res.status(403).send({ message: `Authorization Failed ${token}` });
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodeToken.userId };
        next();
    } catch {
        return res.status(403).send({ message: `Authorization Failed` });
    }
};


module.exports = {
    authorization,
    authentication
}