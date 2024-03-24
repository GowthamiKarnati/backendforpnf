const express = require('express');
const loanApplicationData = require('../middleware/CreateLoanMiddleware');
const router = express()

router.route('/').post(loanApplicationData);

module.exports=router;
