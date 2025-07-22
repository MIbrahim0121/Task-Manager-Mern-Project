const express = require('express');
const {abt} = require('../controllers/abtController');
const router = express.Router();

router.get('/', abt )

module.exports=router;