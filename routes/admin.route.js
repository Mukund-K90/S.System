const express = require('express');
const adminController = require('../controller/admin.controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');


//user registration 
router.post('/login', adminController.adminLogin);
router.post('/logout',authMiddleware, adminController.adminLogOut);


module.exports = router;