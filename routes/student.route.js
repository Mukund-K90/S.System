const express = require('express');
const studentController = require('../controller/student.controller');
const { studentValidate } = require('../middleware/validation.middleware');
const { authorization, authentication } = require('../middleware/auth.middleware');
const router = express.Router();

//user registration 
router.post('/registration', authentication, studentValidate, studentController.studentRegister);
router.put('/update/:id', authentication, studentController.studentUpdate);
router.post('/view/:id', authentication, studentController.studentView);
router.get('/list', authentication, studentController.studentList);
router.get('/search', authentication, studentController.studentSearch);
router.delete('/delete/:id', authentication, studentController.studentDelete);

module.exports = router;