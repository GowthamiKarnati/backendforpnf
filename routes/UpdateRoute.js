const express = require('express');
const UpdateData = require('../middleware/UpdateMiddleware')

const router = express()

router.route('/').post(UpdateData);

module.exports=router;