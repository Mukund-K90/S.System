const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { connectDb } = require('./config/db');
dotenv.config();

app.get('/', (req, res) => {
    return res.send("<h1>S.System</h1>");
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
connectDb();

//Admin Route
const adminRoute=require('./routes/admin.route');
app.use('/v1/admin',adminRoute);

//Student Route
const studentRoute=require('./routes/student.route');
app.use('/v1/student',studentRoute);

//Teacher Route
const teacherRoute=require('./routes/teacher.route');
app.use('/v1/teacher',teacherRoute);

//Server
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 5050;
app.listen(PORT, (req, res) => console.log(`Server is running on ${BASE_URL}${PORT}`)
)