const jwt = require('jsonwebtoken');

const createUserSession = async function (user) {
    const token = await generateJWT(user);
    const loginResponse = { sessionToken: token, user: user };
    return loginResponse;
}

const generateJWT = async function (value) {
    const payload = {
        email: value.email,
        mobile: value.mobile,
        name: value.name
    };
    return jwt.sign(payload, process.env.SECRET_KEY, { exiresIn: "1d" });
}

module.exports = {
    createUserSession,
}