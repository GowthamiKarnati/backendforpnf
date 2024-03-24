const express = require('express');
const loanData = require('../middleware/CreateApplicationMiddleware');
const router = express()

router.route('/').post(loanData);

module.exports=router;