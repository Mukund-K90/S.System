const express = require('express');
const adminController = require('../controller/admin.controller');
const router = express.Router();
const { authorization, authentication } = require('../middleware/auth.middleware');


//admin login 
router.post('/check-user', adminController.checkUser);
router.post('/login', adminController.adminLogin);
//admin logout
router.post('/logout', authentication, adminController.adminLogOut);

module.exports = router;