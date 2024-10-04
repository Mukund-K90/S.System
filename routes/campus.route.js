const express = require('express');
const { authentication } = require('../middleware/auth.middleware');
const router = express.Router();
const campusController = require('../controller/campus.controller');
const { campusValidate } = require('../middleware/validation.middleware');

//insert
router.post('/registration', campusValidate, authentication, campusController.insertCampus);
router.put('/update/:id', authentication, campusController.updateCampus);
router.post('/view/:id', authentication, campusController.viewCampus);
router.get('/list', authentication, campusController.fetchCampus);
router.delete('/delete/:id', authentication, campusController.deleteCampus);



module.exports = router;