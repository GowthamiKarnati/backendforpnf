const express = require('express');
const UpdateHouseImages = require('../middleware/UpdateHouseImagesMiddleware')

const router = express()

router.route('/').post(UpdateHouseImages);

module.exports=router;