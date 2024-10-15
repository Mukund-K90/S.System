const express = require('express');
const { authentication } = require('../middleware/auth.middleware');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller');
const attendanceValidator = require('../validator/attendance.validator');

//insert
router.post('/insert', authentication, attendanceValidator, attendanceController.insertAttendance);
//update
router.put('/update', authentication, attendanceController.updateAttendance);
//view
router.get('/view', authentication, attendanceController.viewAttendance);
//list
router.get('/list', authentication, attendanceController.listAttendance);
//delete
router.delete('/delete', authentication, attendanceController.deleteAttendance);


module.exports = router;