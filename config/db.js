const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

async function connectDb() {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database error", error);
    }
}

module.exports = {
    connectDb
}