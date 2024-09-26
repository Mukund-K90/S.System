const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodeToken.userId };
        next();
    } catch (error) {
        return res.status(500).json({ message: "Authentication Failed", error: error.message });
    }
}