const express = require('express');
const DealerCustomers = require('../middleware/DealerCustomerMiddleware')

const router = express()

router.route('/').get(DealerCustomers);

module.exports=router;