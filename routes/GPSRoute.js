const express =  require('express');
const GPSData = require('../middleware/GpsMiddleware')

const router = express()

router.route('/').get(GPSData);
module.exports = router;