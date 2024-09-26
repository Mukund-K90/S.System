const express = require('express');
const studentController = require('../controller/student.controller');
const { studentValidate } = require('../middleware/validation.middleware');
const router = express.Router();

//user registration 
router.post('/registration',studentValidate, studentController.studentRegister);
router.put('/update/:id', studentController.studentUpdate);
router.post('/view/:id', studentController.studentView);
router.get('/all-student-view', studentController.studentList);
router.get('/search', studentController.studentSearch);
router.delete('/delete/:id', studentController.studentDelete);


module.exports = router;