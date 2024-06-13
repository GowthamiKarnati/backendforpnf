const express =  require('express');
const PNFCustomerData = require('../middleware/PNFCustomerMiddleware')

const router = express()

router.route('/').get(PNFCustomerData);
module.exports = router;