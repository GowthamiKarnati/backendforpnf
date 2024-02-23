const express = require('express');
const CustomerKycData = require('../middleware/CustomerKycMiddleware');

const router = express()

router.route('/').get(CustomerKycData);

module.exports=router;