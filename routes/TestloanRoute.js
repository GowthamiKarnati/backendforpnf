const express =  require('express');
const TestLoans = require('../middleware/TestloanMiddleware')

const router = express()

router.route('/').get(TestLoans);
module.exports = router;