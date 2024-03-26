const express = require('express');
const UpdateAadharBack = require('../middleware/UpdateAadharBackMiddleware');

const router = express()

router.route('/').post(UpdateAadharBack);

module.exports=router;