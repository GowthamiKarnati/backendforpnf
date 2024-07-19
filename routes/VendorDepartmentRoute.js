const express =  require('express');
const VendorDept = require('../middleware/VendorDepartmentMiddleware')
const router = express()

router.route('/').get(VendorDept);
module.exports = router;