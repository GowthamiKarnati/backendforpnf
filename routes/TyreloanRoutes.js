const express = require('express');
const TestloanData = require('../middleware/TyreLoanMiddleware');
const router = express()
router.route('/').get(TestloanData);

module.exports=router;