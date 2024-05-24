const express =  require('express');
const EmployeesData = require('../middleware/EmployeesMiddleware');

const router = express()

router.route('/').get(EmployeesData);
module.exports = router;