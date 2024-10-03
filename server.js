const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { connectDb } = require('./config/db');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
dotenv.config();
const cors = require('cors');

const { format } = require('date-fns');
morgan.token('date', () => {
    return format(new Date(), 'EEE, dd MMM yyyy hh:mm a OOOO');
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'LOGS', 'access.log'), {
    flags: 'a'
});

app.use(morgan(':remote-addr | :remote-user | :status :method :url | :date | :response-time ms ', { stream: accessLogStream }));


app.use(cors());
app.get('/', (req, res) => {
    return res.send("<h1>S.System</h1>");
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
connectDb();

//Admin Route
const adminRoute = require('./routes/admin.route');
app.use('/v1/admin', adminRoute);

//Student Route
const studentRoute = require('./routes/student.route');
app.use('/v1/student', studentRoute);

//Teacher Route
const teacherRoute = require('./routes/teacher.route');
app.use('/v1/teacher', teacherRoute);

//Server
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 5050;
app.listen(PORT, (req, res) => console.log(`Server is running on ${BASE_URL}${PORT}`)
)