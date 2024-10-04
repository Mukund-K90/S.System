const express = require('express');
const adminController = require('../controller/admin.controller');
const router = express.Router();
const { authorization, authentication } = require('../middleware/auth.middleware');


//user registration 
router.post('/login', adminController.adminLogin);
// router.post('/logout', authentication, adminController.adminLogOut);

router.get('/protected', authorization, (req, res) => {
    res.json({ message: "Authorization Complete" });
});

module.exports = router;