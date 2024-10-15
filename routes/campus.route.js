const express = require('express');
const { authentication } = require('../middleware/auth.middleware');
const router = express.Router();
const campusController = require('../controller/campus.controller');
const campusValidator = require('../validator/campus.validator');

//insert
router.post('/registration', campusValidator, authentication, campusController.insertCampus);
//update
router.put('/update', authentication, campusController.updateCampus);
//view
router.post('/view', authentication, campusController.viewCampus);
//list
router.get('/list', authentication, campusController.fetchCampus);
//delete
router.delete('/delete', authentication, campusController.deleteCampus);



module.exports = router;