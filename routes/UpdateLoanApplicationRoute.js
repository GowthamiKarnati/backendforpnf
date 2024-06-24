const express = require('express');
const UpdateLoanData = require('../middleware/UpdateLoanApplicationMiddleware')

const router = express()

router.route('/').post(UpdateLoanData);

module.exports=router;