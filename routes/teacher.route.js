const express = require('express');
const teacherController = require('../controller/teacher.controller');
const { teacherValidate } = require('../middleware/validation.middleware');
const { authentication } = require('../middleware/auth.middleware');
const router = express.Router();

//user registration 
router.post('/registration', authentication, teacherValidate, teacherController.insertTeacher);
router.put('/update/:id', authentication, teacherController.updateTeacher);
router.post('/view/:id', authentication, teacherController.viewTeacher);
router.get('/list', authentication, teacherController.fetchTeachers);
router.delete('/delete/:id', authentication, teacherController.deleteTeacher);

module.exports = router;