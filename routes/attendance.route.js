const express = require('express');
const { authentication } = require('../middleware/auth.middleware');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller');
const attendanceValidator = require('../validator/attendance.validator');

//insert
router.post('/insert', authentication, attendanceValidator, attendanceController.insertAttendance);
router.put('/update', authentication, attendanceController.updateAttendance);
router.get('/view', authentication, attendanceController.viewAttendance);
router.get('/list', authentication, attendanceController.listAttendance);
router.delete('/delete', authentication, attendanceController.deleteAttendance);


module.exports = router;