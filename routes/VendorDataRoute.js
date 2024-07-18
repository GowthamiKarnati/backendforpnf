const express =  require('express');
const VendorData = require('../middleware/VendorDataMiddleware')

const router = express()

router.route('/').get(VendorData);
module.exports = router;