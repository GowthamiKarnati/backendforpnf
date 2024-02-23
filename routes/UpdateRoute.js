const express = require('express');
const UpdateData = require('../middleware/UpdateMiddleware')

const router = express()

router.route('/').get(UpdateData);

module.exports=router;