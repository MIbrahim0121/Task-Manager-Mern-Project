const express = require('express');
const { usersController, loginController } = require('../controllers/userController');
const router = express.Router();


// for registeration
router.post('/register', usersController);

// for login
router.post('/login', loginController)



module.exports = router;