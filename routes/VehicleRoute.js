const express =  require('express');
const VehicleData = require('../middleware/VehicleMiddleware')

const router = express()

router.route('/').get(VehicleData);
module.exports = router;