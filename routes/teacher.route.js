const express = require('express');
const teacherController = require('../controller/teacher.controller');
const teacherValidator = require('../validator/teacher.validator');
const { authentication } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/schemaValidate.middleware');
const router = express.Router();

//user registration 
router.post('/registration', authentication, validate(teacherValidator.addTeacher.body), teacherController.insertTeacher);
router.put('/update', authentication, teacherController.updateTeacher);
router.post('/view', authentication, teacherController.viewTeacher);
router.get('/list', authentication, teacherController.fetchTeachers);
router.delete('/delete', authentication, teacherController.deleteTeacher);

module.exports = router;