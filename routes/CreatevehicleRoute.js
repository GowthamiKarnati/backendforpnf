const express = require('express');
const createVehicle = require('../middleware/CreatevehicleMiddleware');
const router = express()

router.route('/').post(createVehicle);

module.exports=router;
