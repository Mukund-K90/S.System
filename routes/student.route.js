const express = require('express');
const studentController = require('../controller/student.controller');
const studentValidator = require('../validator/student.validator');
const { authentication } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/schemaValidate.middleware');
const router = express.Router();

//user registration 
router.post('/registration', authentication, validate(studentValidator.addStudent.body), studentController.insertStudent);
router.put('/update', authentication, studentController.updateStudent);
router.post('/view', authentication, studentController.viewStudent);
router.get('/list', authentication, studentController.fetchStudents);
router.delete('/delete', authentication, studentController.deleteStudent);

module.exports = router;