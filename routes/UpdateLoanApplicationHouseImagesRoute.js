const express = require('express');
const LoanHouseImagesData = require('../middleware/UpdateLoanApplicationHouseImagesMiddleware')

const router = express()

router.route('/').post(LoanHouseImagesData);

module.exports=router;