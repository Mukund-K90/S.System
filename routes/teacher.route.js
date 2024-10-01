const express = require('express');
const teacherController = require('../controller/teacher.controller');
const { teacherValidate } = require('../middleware/validation.middleware');
const { authentication } = require('../middleware/auth.middleware');
const router = express.Router();

//user registration 
router.post('/registration', authentication, teacherValidate, teacherController.teacherRegister);
router.put('/update/:id', authentication, teacherController.teacherUpdate);
router.post('/view/:id', authentication, teacherController.teacherView);
router.get('/list', authentication, teacherController.teachersFetch);
router.delete('/delete/:id', authentication, teacherController.teacherDelete);

module.exports = router;