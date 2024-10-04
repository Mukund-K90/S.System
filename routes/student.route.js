const express = require('express');
const studentController = require('../controller/student.controller');
const { studentValidate } = require('../middleware/validation.middleware');
const { authorization, authentication } = require('../middleware/auth.middleware');
const router = express.Router();

//user registration 
router.post('/registration', authentication, studentValidate, studentController.insertStudent);
router.put('/update', authentication, studentController.updateStudent);
router.post('/view/:id', authentication, studentController.viewStudent);
router.get('/list', authentication, studentController.fetchStudents);
router.delete('/delete/:id', authentication, studentController.deleteStudent);

module.exports = router;