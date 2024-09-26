const express = require('express');
const teacherController = require('../controller/teacher.controller');
const { teacherValidate } = require('../middleware/validation.middleware');
const router = express.Router();

//user registration 
router.post('/registration',teacherValidate, teacherController.teacherRegister);
router.put('/update/:id', teacherController.teacherUpdate);
router.post('/view/:id', teacherController.teacherView);
router.get('/all-teacher-view', teacherController.teacherList);
router.get('/search', teacherController.teacherSearch);
router.delete('/delete/:id', teacherController.teacherDelete);


module.exports = router;