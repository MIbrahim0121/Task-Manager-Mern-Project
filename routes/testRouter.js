const express = require('express');
const { testingcontroller } = require('../controllers/testController');
const router = express.Router();

// routes
router.get('/', testingcontroller)


// export
module.exports= router;